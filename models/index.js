const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const db = {};  

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
  logging: false, 
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.User = require('./user')(sequelize, DataTypes);
db.FiatWallet = require('./fiatWallet')(sequelize, DataTypes);
db.CryptoWallet = require('./cryptoWallet')(sequelize, DataTypes);
db.Order = require('./order')(sequelize, DataTypes);
db.Trade = require('./trade')(sequelize, DataTypes);
db.Transaction = require('./transaction')(sequelize, DataTypes);


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


sequelize.sync({ alter: true })
  .then(() => console.log('All models synced!'))
  .catch((err) => console.error('Sequelize sync error:', err));

module.exports = db;  
