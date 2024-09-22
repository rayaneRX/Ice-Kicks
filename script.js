// Function to get cart from localStorage
const getCart = () => {
  return JSON.parse(localStorage.getItem('cart')) || [];
};

// Function to save cart to localStorage
const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Function to add an item to the cart
const addToCart = (product, size) => {
  const cart = getCart();
  cart.push({ product, size });
  saveCart(cart);
  alert(`${product.name} (Size: ${size}) added to the cart!`);
};

// Handle adding items to the cart on product detail pages
const addToCartButton = document.getElementById('add-to-cart');
if (addToCartButton) {
  addToCartButton.addEventListener('click', () => {
    const product = {
      name: 'Air Jordan 1',
      price: 200,
      image: 'images/sneaker1.jpg'
    };
    const size = document.getElementById('size').value;
    addToCart(product, size);
  });
}

// Function to display cart items on the cart page
const displayCartItems = () => {
  const cartItemsContainer = document.getElementById('cart-items');
  const totalAmountContainer = document.getElementById('total-amount');

  const cart = getCart();
  let totalAmount = 0;

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const itemTotal = item.product.price;
      totalAmount += itemTotal;
      cartItemsContainer.innerHTML += `
        <div class="cart-item">
          <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h3>${item.product.name}</h3>
            <p>Price: $${item.product.price}</p>
            <p>Size: ${item.size}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
          </div>
        </div>
      `;
    });
  }

  totalAmountContainer.innerText = totalAmount;

  // Handle removing items from the cart
  document.querySelectorAll('.remove-item').forEach((button) => {
    button.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      removeItemFromCart(index);
    });
  });
};

// Function to remove an item from the cart
const removeItemFromCart = (index) => {
  let cart = getCart();
  cart.splice(index, 1); // Remove the item at the given index
  saveCart(cart);
  displayCartItems(); // Update the UI
};

// Function to clear the entire cart
const clearCartButton = document.getElementById('clear-cart');
if (clearCartButton) {
  clearCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    displayCartItems(); // Update the UI
  });
}

// If on the cart page, display the cart items
if (window.location.pathname.includes('cart.html')) {
  displayCartItems();
}
