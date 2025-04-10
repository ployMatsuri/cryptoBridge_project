const express = require('express');
const router = express.Router();
const tradeController = require('../controllers/tradeController');

router.post('/', tradeController.createTrade);

router.get('/user/:user_id', tradeController.getTradesByUser);

router.get('/order/:order_id', tradeController.getTradeByOrderId);
