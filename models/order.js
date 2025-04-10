module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      type: DataTypes.ENUM('BUY', 'SELL'),
      coin_symbol: DataTypes.STRING,
      price_per_unit: DataTypes.FLOAT,
      quantity: DataTypes.FLOAT,
      status: DataTypes.ENUM('OPEN', 'MATCHED', 'CANCELLED'),
    });
  
    Order.associate = models => {
      Order.belongsTo(models.User);
      Order.hasMany(models.Trade, { foreignKey: 'OrderId' });  
    };
  
    return Order;
  };
  