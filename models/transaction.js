module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      amount: DataTypes.FLOAT,
      transaction_type: DataTypes.ENUM('TRANSFER', 'BUY', 'SELL'),
      status: DataTypes.ENUM('PENDING', 'COMPLETED', 'FAILED'),
    });
  
    Transaction.associate = models => {
      Transaction.belongsTo(models.User);
    };
  
    return Transaction;
  };
  