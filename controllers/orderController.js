const db = require('../models');
console.log("order: "+db);

module.exports = {
  // สร้างคำสั่งซื้อหรือขาย
  createOrder: async (req, res) => {
    try {
      const { type, coin_symbol, price_per_unit, quantity, status, userId } = req.body;

      const newOrder = await db.Order.create({
        type,
        coin_symbol,
        price_per_unit,
        quantity,
        status,
        UserId: userId, 
      });

      res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
      console.error('Create Order Error:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  },

  // แสดงคำสั่งซื้อตาม user id
  getOrdersByUser: async (req, res) => {
    try {
      const userId = req.params.userId;

      const userOrders = await db.Order.findAll({
        where: { UserId: userId },
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(userOrders);
    } catch (error) {
      console.error('Get Orders Error:', error);
      res.status(500).json({ error: 'Failed to fetch user orders' });
    }
  },
};
