module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING,
    });
  
    User.associate = models => {
      User.hasMany(models.FiatWallet);
      User.hasMany(models.CryptoWallet);
      User.hasMany(models.Order);
      User.hasMany(models.Transaction);
      User.hasMany(models.Trade, { foreignKey: 'buyer_id' });
      User.hasMany(models.Trade, { foreignKey: 'seller_id' });
    };
  
    // ดึงกระเป๋าทั้ง fiat และ crypto
    User.prototype.getWallets = async function () {
      const fiat = await this.getFiatWallets();
      const crypto = await this.getCryptoWallets();
      return { fiat, crypto };
    };
  
    return User;
  };
  