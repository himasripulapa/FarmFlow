const User = require('../models/User');

// GET /api/v1/users (admin only)
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort('-createdAt');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/users/:userId/role (admin only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const validRoles = ['farmer', 'collectionCenter', 'distributor', 'retailer', 'consumer', 'admin'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: `Invalid role. Allowed roles: ${validRoles.join(', ')}` });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// PATCH /api/v1/users/:userId/active (admin only)
exports.updateUserActive = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { active } = req.body;

    if (typeof active !== 'boolean') {
      return res.status(400).json({ message: 'Active must be a boolean' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.active = active;
    await user.save();
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/users/:userId (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
