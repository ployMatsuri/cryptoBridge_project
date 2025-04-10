const db = require('../models');

exports.createTrade = async (req, res) => {
  try {
    // ดึงข้อมูลจาก request body
    const { coin_symbol, quantity, price_per_unit, buyer_id, seller_id, type, OrderId } = req.body;

    // ตรวจสอบว่ามีการส่ง 'type' หรือไม่
    if (!type || (type !== 'BUY' && type !== 'SELL')) {
      return res.status(400).json({ error: 'Invalid or missing trade type (BUY/SELL)' });
    }

    // สร้าง trade ใหม่
    const trade = await db.Trade.create({
      coin_symbol,
      quantity,
      price_per_unit,
      total_amount: quantity * price_per_unit,
      buyer_id,
      seller_id,
      type,  // บันทึกประเภทของการทำธุรกรรม
      OrderId,  // ระบุ OrderId สำหรับการเชื่อมโยง
    });

    // หา CryptoWallet ของผู้ซื้อ
    const buyerWallet = await db.CryptoWallet.findOne({
      where: { UserId: buyer_id, coin_symbol },
    });

    // หา CryptoWallet ของผู้ขาย
    const sellerWallet = await db.CryptoWallet.findOne({
      where: { UserId: seller_id, coin_symbol },
    });

    // ตรวจสอบว่า wallet ของผู้ซื้อและผู้ขายมีอยู่
    if (!buyerWallet || !sellerWallet) {
      return res.status(404).json({ error: 'Wallet not found for buyer or seller' });
    }

    // อัปเดตยอดใน CryptoWallet หลังการทำธุรกรรม
    if (type === 'BUY') {
      // เพิ่มเหรียญใน wallet ของผู้ซื้อ
      buyerWallet.balance += quantity;
      // ลดเหรียญใน wallet ของผู้ขาย
      sellerWallet.balance -= quantity;
    } else if (type === 'SELL') {
      // ลดเหรียญใน wallet ของผู้ซื้อ
      buyerWallet.balance -= quantity;
      // เพิ่มเหรียญใน wallet ของผู้ขาย
      sellerWallet.balance += quantity;
    }

    // บันทึกการเปลี่ยนแปลงใน CryptoWallet
    await buyerWallet.save();
    await sellerWallet.save();

    // ส่งผลลัพธ์การทำการ trade
    res.status(201).json(trade);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
