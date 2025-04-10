module.exports = (sequelize, DataTypes) => {
    const FiatWallet = sequelize.define('FiatWallet', {
      currency: DataTypes.STRING,
      balance: DataTypes.FLOAT,
    });
  
    FiatWallet.associate = models => {
      FiatWallet.belongsTo(models.User);
    };
  
    return FiatWallet;
  };
  