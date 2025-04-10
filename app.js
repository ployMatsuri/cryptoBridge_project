const express = require('express');
const app = express();
const db = require('./models');  // นำเข้า db

const PORT = 3000;

app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
// const tradeRoutes = require("./routes/trade");
// const transactionRoutes = require("./routes/transaction");

// ตั้ง Route สำหรับแต่ละ Controller
app.use("/users", userRoutes);

app.use("/orders", orderRoutes);
// app.use("/trades", tradeRoutes);
// app.use("/transactions", transactionRoutes);


// Home route (Optional)
app.get("/", (req, res) => {
  res.send("Welcome to the Cryptocurrency Exchange System");
});

// Error handling middleware (สำหรับ error ที่ไม่ถูกจับ)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

// ตรวจสอบการเชื่อมต่อกับฐานข้อมูล
db.sequelize.authenticate()  // ใช้ db.sequelize แทน
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
