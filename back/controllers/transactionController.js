const Transaction = require('../models/Transaction');

// GET /api/v1/transactions
exports.getTransactions = async (req, res, next) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status && status !== 'All') {
      filter.status = status;
    }
    const transactions = await Transaction.find(filter).sort('-createdAt');
    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

// POST /api/v1/transactions
exports.createTransaction = async (req, res, next) => {
  try {
    const { batchId, cropName, fromUser, toUser, quantity, unit, totalAmount, status, paymentMethod } = req.body;

    if (!batchId || !totalAmount) {
      return res.status(400).json({ message: 'batchId and totalAmount are required' });
    }

    const transaction = await Transaction.create({
      batchId,
      cropName: cropName || 'Produce',
      fromUser: fromUser || 'Farmer',
      toUser: toUser || 'Buyer',
      quantity: quantity || 0,
      unit: unit || 'kg',
      totalAmount: Number(totalAmount),
      status: status || 'Paid',
      paymentMethod: paymentMethod || 'UPI',
      date: new Date().toISOString().split('T')[0]
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/transactions/:id (admin)
exports.deleteTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    next(error);
  }
};
