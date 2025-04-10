const db = require('../models');

module.exports = {
  // Create a new trade
  createTrade: async (req, res) => {
    const { coin_symbol, quantity, price_per_unit, total_amount, OrderId, type, buyer_id, seller_id } = req.body;

    try {
      const trade = await db.Trade.create({
        coin_symbol,
        quantity,
        price_per_unit,
        total_amount,
        OrderId,
        type,
        buyer_id,
        seller_id,
      });

      res.status(201).json(trade);
    } catch (error) {
      res.status(500).json({ message: 'Error creating trade', error: error.message });
    }
  },

  getTradesByUser: async (req, res) => {
    const { user_id } = req.params;

    try {
      const trades = await db.Trade.findAll({
        where: {
          [db.Sequelize.Op.or]: [
            { buyer_id: user_id },
            { seller_id: user_id },
          ]
        },
        include: [
          { model: db.User, as: 'buyer' },
          { model: db.User, as: 'seller' },
          { model: db.Order },
        ]
      });

      if (!trades.length) {
        return res.status(404).json({ message: 'No trades found for this user' });
      }

      res.status(200).json(trades);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving trades', error: error.message });
    }
  },

  getTradeByOrderId: async (req, res) => {
    const { order_id } = req.params;

    try {
      const trade = await db.Trade.findOne({
        where: { OrderId: order_id },
        include: [
          { model: db.User, as: 'buyer' },
          { model: db.User, as: 'seller' },
          { model: db.Order },
        ]
      });

      if (!trade) {
        return res.status(404).json({ message: 'Trade not found for this order' });
      }

      res.status(200).json(trade);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving trade', error: error.message });
    }
  },

};
