'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Users
    const users = await queryInterface.bulkInsert('Users', [
      { username: 'user1', email: 'user1@example.com', password_hash: 'hashedpass1', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user2', email: 'user2@example.com', password_hash: 'hashedpass2', createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });

    // FiatWallets
    await queryInterface.bulkInsert('FiatWallets', [
      { UserId: users[0].id, currency: 'THB', balance: 50000, createdAt: new Date(), updatedAt: new Date() },
      { UserId: users[1].id, currency: 'USD', balance: 1000, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // CryptoWallets
    await queryInterface.bulkInsert('CryptoWallets', [
      { UserId: users[0].id, coin_symbol: 'BTC', balance: 0.1, createdAt: new Date(), updatedAt: new Date() },
      { UserId: users[0].id, coin_symbol: 'ETH', balance: 5, createdAt: new Date(), updatedAt: new Date() },
      { UserId: users[1].id, coin_symbol: 'XRP', balance: 200, createdAt: new Date(), updatedAt: new Date() },
      { UserId: users[1].id, coin_symbol: 'DOGE', balance: 1000, createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Orders (SELL & BUY orders)
    const orders = await queryInterface.bulkInsert('Orders', [
      { type: 'SELL', coin_symbol: 'BTC', price_per_unit: 1000000, quantity: 0.01, status: 'OPEN', UserId: users[1].id, createdAt: new Date(), updatedAt: new Date() },
      { type: 'BUY', coin_symbol: 'ETH', price_per_unit: 50000, quantity: 1, status: 'OPEN', UserId: users[0].id, createdAt: new Date(), updatedAt: new Date() },
      { type: 'SELL', coin_symbol: 'XRP', price_per_unit: 50, quantity: 100, status: 'OPEN', UserId: users[0].id, createdAt: new Date(), updatedAt: new Date() },
      { type: 'BUY', coin_symbol: 'DOGE', price_per_unit: 10, quantity: 500, status: 'OPEN', UserId: users[1].id, createdAt: new Date(), updatedAt: new Date() },
    ], { returning: true });

    // Trades (Including 'type' for the trade)
    await queryInterface.bulkInsert('Trades', [
      { coin_symbol: 'BTC', quantity: 0.01, price_per_unit: 1000000, total_amount: 10000, buyer_id: users[0].id, seller_id: users[1].id, OrderId: orders[0].id, type: 'SELL', createdAt: new Date(), updatedAt: new Date() },
      { coin_symbol: 'ETH', quantity: 1, price_per_unit: 50000, total_amount: 50000, buyer_id: users[1].id, seller_id: users[0].id, OrderId: orders[1].id, type: 'BUY', createdAt: new Date(), updatedAt: new Date() },
      { coin_symbol: 'XRP', quantity: 100, price_per_unit: 50, total_amount: 5000, buyer_id: users[1].id, seller_id: users[0].id, OrderId: orders[2].id, type: 'SELL', createdAt: new Date(), updatedAt: new Date() },
      { coin_symbol: 'DOGE', quantity: 500, price_per_unit: 10, total_amount: 5000, buyer_id: users[0].id, seller_id: users[1].id, OrderId: orders[3].id, type: 'BUY', createdAt: new Date(), updatedAt: new Date() },
    ]);

    // Transactions (Recording payments for trades)
    await queryInterface.bulkInsert('Transactions', [
      { amount: 10000, transaction_type: 'BUY', status: 'COMPLETED', UserId: users[0].id, createdAt: new Date(), updatedAt: new Date() },
      { amount: 50000, transaction_type: 'SELL', status: 'COMPLETED', UserId: users[1].id, createdAt: new Date(), updatedAt: new Date() },
      { amount: 5000, transaction_type: 'BUY', status: 'COMPLETED', UserId: users[1].id, createdAt: new Date(), updatedAt: new Date() },
      { amount: 5000, transaction_type: 'SELL', status: 'COMPLETED', UserId: users[0].id, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {});
    await queryInterface.bulkDelete('Trades', null, {});
    await queryInterface.bulkDelete('Orders', null, {});
    await queryInterface.bulkDelete('CryptoWallets', null, {});
    await queryInterface.bulkDelete('FiatWallets', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
