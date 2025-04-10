module.exports = (sequelize, DataTypes) => {
    const CryptoWallet = sequelize.define('CryptoWallet', {
      coin_symbol: DataTypes.STRING,
      balance: DataTypes.FLOAT,
    });
  
    CryptoWallet.associate = models => {
      CryptoWallet.belongsTo(models.User);
    };
  
    return CryptoWallet;
  };
  