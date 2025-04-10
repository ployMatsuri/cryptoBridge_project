const db = require('../models');

async function seed() {
  try {
    await db.Transaction.destroy({ where: {}, truncate: true, cascade: true });
    await db.Trade.destroy({ where: {}, truncate: true, cascade: true });
    await db.Order.destroy({ where: {}, truncate: true, cascade: true });
    await db.User.destroy({ where: {}, truncate: true, cascade: true });

    // User
    const [user1, user2] = await Promise.all([
      db.User.create({ username: 'alice', email: 'alice@example.com', password_hash: '123456' }),
      db.User.create({ username: 'bob', email: 'bob@example.com', password_hash: 'abcdef' })
    ]);

    // Order
    const order1 = await db.Order.create({
      UserId: user2.id,
      coin_symbol: 'BTC',
      quantity: 0.5,
      price_per_unit: 1000000,
      type: 'SELL',
      status: 'OPEN'
    });

    // Trade
    const trade1 = await db.Trade.create({
      buyer_id: user1.id,
      seller_id: user2.id,
      coin_symbol: 'BTC',
      quantity: 0.5,
      price_per_unit: 1000000,
      total_amount: 500000,
      type: 'BUY',
      OrderId: order1.id
    });

    // Transaction
    const transaction1 = await db.Transaction.create({
      amount: 500000,
      transaction_type: 'BUY',
      status: 'COMPLETED',
      UserId: user1.id
    });

    const transaction2 = await db.Transaction.create({
      amount: 500000,
      transaction_type: 'SELL',
      status: 'COMPLETED',
      UserId: user2.id
    });

    console.log('✅ ข้อมูลทดสอบถูก seed เรียบร้อยแล้ว!');

    process.exit();
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการ seed:', error);
    process.exit(1);
  }
}

seed();
