// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const { addToCart } = require('../controllers/cartController');

// Corrected route path
router.post('/cart/add', addToCart);

module.exports = router;