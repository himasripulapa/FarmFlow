const Buyer = require('../models/Buyer');

// GET /api/v1/buyers
exports.getBuyers = async (req, res, next) => {
  try {
    const buyers = await Buyer.find().sort('-createdAt');
    res.json(buyers);
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/buyers
exports.createBuyer = async (req, res, next) => {
  try {
    const { name, type, phone, email, city, state } = req.body;
    if (!name || !type || !phone || !email || !city || !state) {
      return res.status(400).json({ message: 'All buyer details (name, type, phone, email, city, state) are required' });
    }

    const buyer = await Buyer.create({
      name: name.trim(),
      type,
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      city: city.trim(),
      state: state.trim(),
      owner: req.session.userId,
      totalPurchases: req.body.totalPurchases || 0,
      totalAmountSpent: req.body.totalAmountSpent || 0,
      rating: req.body.rating || 5.0
    });

    res.status(201).json(buyer);
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/buyers/:id
exports.updateBuyer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buyer = await Buyer.findById(id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    const isAdmin = req.session.role === 'admin';
    const isOwner = buyer.owner && buyer.owner.toString() === req.session.userId;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Not authorized to update this buyer' });
    }

    Object.assign(buyer, req.body);
    await buyer.save();
    res.json(buyer);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/buyers/:id (owner or admin only)
exports.deleteBuyer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const buyer = await Buyer.findById(id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    const isAdmin = req.session.role === 'admin';
    const isOwner = buyer.owner && buyer.owner.toString() === req.session.userId;
    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'Not authorized to delete this buyer' });
    }

    await Buyer.deleteOne({ _id: buyer._id });
    res.status(200).json({ message: 'Buyer deleted successfully' });
  } catch (error) {
    next(error);
  }
};
