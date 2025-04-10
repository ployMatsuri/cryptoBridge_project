const express = require('express');
const app = express();
const db = require('./models');  

const PORT = 3000;

app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const tradeRoutes = require("./routes/tradeRoutes");
const transactionRoutes = require("./routes/transactionRoutes");


app.use("/users", userRoutes);

app.use("/orders", orderRoutes);
app.use("/trades", tradeRoutes);
app.use("/transactions", transactionRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the Cryptocurrency Exchange System");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!", error: err.message });
});

db.sequelize.authenticate()  
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
