module.exports = (sequelize, DataTypes) => {
  const Trade = sequelize.define('Trade', {
    coin_symbol: DataTypes.STRING,
    quantity: DataTypes.FLOAT,
    price_per_unit: DataTypes.FLOAT,
    total_amount: DataTypes.FLOAT,
    OrderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Orders', 
        key: 'id', 
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,  // บังคับให้ระบุประเภทการทำธุรกรรม
      validate: {
        isIn: [['BUY', 'SELL']],  // เฉพาะ BUY หรือ SELL เท่านั้น
      },
    },
  });

  Trade.associate = models => {
    Trade.belongsTo(models.User, { as: 'buyer', foreignKey: 'buyer_id' });
    Trade.belongsTo(models.User, { as: 'seller', foreignKey: 'seller_id' });
    Trade.belongsTo(models.Order, { foreignKey: 'OrderId' });  
  };

  return Trade;
};
