// models/Product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    price: { type: DataTypes.DECIMAL, allowNull: false },
    image: DataTypes.STRING,
  });

  Product.associate = function(models) {
    Product.hasMany(models.Order, { foreignKey: 'productId' });
    Product.hasMany(models.Cart, { foreignKey: 'productId' });
  };

  return Product;
};