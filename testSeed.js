// testSeed.js
const db = require('./models');

async function testSeed() {
  try {
    console.log('กำลังดึงข้อมูลจากฐานข้อมูล...');

    const users = await db.User.findAll({ include: [db.Order, db.Transaction] });
    const trades = await db.Trade.findAll({ include: ['buyer', 'seller'] });
    const transactions = await db.Transaction.findAll({ include: db.User });

    console.log('\nUsers:');
    users.forEach(user => {
      console.log(`- ${user.id}: ${user.username}, email: ${user.email}`);
    });

    console.log('\nTransactions:');
    transactions.forEach(tx => {
      console.log(`- [${tx.transaction_type}] ${tx.amount} by ${tx.User?.username} | Status: ${tx.status}`);
    });

    console.log('\nTrades:');
    trades.forEach(trade => {
      console.log(
        `- ${trade.coin_symbol}: ${trade.quantity} @ ${trade.price_per_unit} | buyer: ${trade.buyer?.username}, seller: ${trade.seller?.username}`
      );
    });

    console.log('\n✅ การแสดงผลข้อมูลสำเร็จ!');
    process.exit();
  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
    process.exit(1);
  }
}

testSeed();
