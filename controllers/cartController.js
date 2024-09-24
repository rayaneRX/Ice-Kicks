
const { Cart, Product } = require('../models');

async function addToCart(req, res) {
  const { userId, productId, size, quantity } = req.body;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cartItem = await Cart.findOne({ where: { userId, productId, size } });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      await Cart.create({ userId, productId, size, quantity });
    }

    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Error adding to cart', error });
  }
}

module.exports = { addToCart };