const { db } = require('./models');

async function checkSeedData() {
  try {
    // ตรวจสอบการโหลดโมเดล User
    if (!db.User) {
      console.log('User model is not loaded correctly');
    } else {
      const users = await db.User.findAll();
      console.log('Users:', users.map(user => user.username));  // แสดงชื่อผู้ใช้
    }

    // ตรวจสอบการโหลดโมเดล FiatWallet
    if (!db.FiatWallet) {
      console.log('FiatWallet model is not loaded correctly');
    } else {
      const fiatWallets = await db.FiatWallet.findAll();
      console.log('FiatWallets:', fiatWallets.map(wallet => `${wallet.currency}: ${wallet.balance}`));  // แสดงสกุลเงินและยอดเงิน
    }

    // ตรวจสอบการโหลดโมเดล CryptoWallet
    if (!db.CryptoWallet) {
      console.log('CryptoWallet model is not loaded correctly');
    } else {
      // ดึงข้อมูล CryptoWallet พร้อมเชื่อมโยงกับ User
      const cryptoWallets = await db.CryptoWallet.findAll({
        include: {
          model: db.User,
          attributes: ['username'], // เพิ่มข้อมูล username ของ User
        },
      });

      console.log('CryptoWallets before transactions:');
      cryptoWallets.forEach(wallet => {
        console.log(`${wallet.User.username} - ${wallet.coin_symbol}: ${wallet.balance}`);
      });  // แสดงเหรียญและยอดเงินก่อนทำการซื้อขาย
    }

    // ตรวจสอบการโหลดโมเดล Order
    if (!db.Order) {
      console.log('Order model is not loaded correctly');
    } else {
      const orders = await db.Order.findAll();
      console.log('Orders:', orders.map(order => `${order.coin_symbol} - ${order.type} - ${order.price_per_unit}`));  // แสดงสัญลักษณ์เหรียญ, ประเภทคำสั่ง, และราคาต่อหน่วย
    }

    // ตรวจสอบการโหลดโมเดล Trade
    if (!db.Trade) {
      console.log('Trade model is not loaded correctly');
    } else {
      const trades = await db.Trade.findAll();
      console.log('Trades:', trades.map(trade => `${trade.coin_symbol} - ${trade.quantity}`));  // แสดงสัญลักษณ์เหรียญและจำนวน
    }

    // ตรวจสอบการโหลดโมเดล Transaction
    if (!db.Transaction) {
      console.log('Transaction model is not loaded correctly');
    } else {
      const transactions = await db.Transaction.findAll();
      console.log('Transactions:', transactions.map(transaction => `${transaction.transaction_type} - ${transaction.amount}`));  // แสดงประเภทและจำนวนธุรกรรม
    }

    // ตรวจสอบข้อมูลของ CryptoWallet หลังการทำธุรกรรม
    const updatedCryptoWallets = await db.CryptoWallet.findAll({
      include: {
        model: db.User,
        attributes: ['username'], // เพิ่มข้อมูล username ของ User
      },
    });

    console.log('CryptoWallets after transactions:');
    updatedCryptoWallets.forEach(wallet => {
      console.log(`${wallet.User.username} - ${wallet.coin_symbol}: ${wallet.balance}`);
    });

  } catch (error) {
    console.error('Error occurred while fetching data:', error);
  }
}

checkSeedData();
