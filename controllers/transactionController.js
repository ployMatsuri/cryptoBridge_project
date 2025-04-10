const db = require('../models');
const { Transaction, User } = db;

module.exports = {
  
  createTransaction: async (req, res) => {
    const { amount, transaction_type, user_id, status } = req.body;

    try {
      if (!amount || !transaction_type || !user_id || !status) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const transaction = await Transaction.create({
        amount,
        transaction_type,
        status,
        UserId: user_id, 
      });

      return res.status(201).json({
        message: 'Transaction created successfully',
        transaction: transaction,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  async getAllTransactions(req, res) {
      try {
        const transactions = await Transaction.findAll();  
        res.json(transactions);
      } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    },

  getTransactionsByUser: async (req, res) => {
    const userId = req.params.userId;

    try {
      const transactions = await Transaction.findAll({
        where: { UserId: userId },
        order: [['createdAt', 'DESC']], 
      });

      if (transactions.length === 0) {
        return res.status(404).json({ message: "No transactions found for this user." });
      }

      return res.status(200).json({ transactions });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },

  updateTransactionStatus: async (req, res) => {
    const { transaction_id, status } = req.body;

    try {
      if (!['PENDING', 'COMPLETED', 'FAILED'].includes(status)) {
        return res.status(400).json({ message: "Invalid status." });
      }
      const transaction = await Transaction.findByPk(transaction_id);
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found." });
      }

      transaction.status = status;
      await transaction.save();

      return res.status(200).json({
        message: 'Transaction status updated successfully',
        transaction,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  },
};
