module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { foreignKey: 'userId' });
    Cart.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  return Cart;
};