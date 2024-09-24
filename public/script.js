const addToCart = async (product, size) => {
  try {
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId: product.id, size, quantity: 1 })
    });

    if (response.ok) {
      alert(`${product.name} (Size: ${size}) added to the cart!`);
    } else {
      const error = await response.json();
      alert('Error adding to cart: ' + error.message);
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('An error occurred while adding to the cart.');
  }
};

// Adjust `displayCartItems` to fetch items from the backend rather than localStorage.
const displayCartItems = async () => {
  try {
    const response = await fetch('/api/cart');
    const cart = await response.json();

    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountContainer = document.getElementById('total-amount');
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
              <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
          </div>
        `;
      });
    }

    totalAmountContainer.innerText = totalAmount;

    document.querySelectorAll('.remove-item').forEach((button) => {
      button.addEventListener('click', async (e) => {
        const itemId = e.target.getAttribute('data-id');
        await removeItemFromCart(itemId);
      });
    });
  } catch (error) {
    console.error('Error displaying cart items:', error);
    alert('An error occurred while loading your cart.');
  }
};

// Modify remove function to interact with the backend
const removeItemFromCart = async (itemId) => {
  try {
    const response = await fetch(`/api/cart/remove/${itemId}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      displayCartItems();
    } else {
      const error = await response.json();
      alert('Error removing item: ' + error.message);
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};


// Function to check login status and update the UI
async function checkLoginStatus() {
  try {
    const response = await fetch('/auth/current-user', { method: 'GET', credentials: 'include' });

    if (response.ok) {
      const data = await response.json();
      document.getElementById('user-dropdown').textContent = `Hello, ${data.username}`;
      document.getElementById('logout-menu').style.display = 'none'; // Ensure it's initially hidden
    } else {
      document.querySelector('.login-status').innerHTML = '<a href="login.html">Log In</a>';
    }
  } catch (error) {
    console.error('Error checking login status:', error);
    document.querySelector('.login-status').innerHTML = '<a href="login.html">Log In</a>';
  }
}

// Toggle the logout dropdown menu
document.addEventListener('DOMContentLoaded', () => {
  checkLoginStatus();

  const userDropdown = document.getElementById('user-dropdown');
  const logoutMenu = document.getElementById('logout-menu');
  const logoutButton = document.getElementById('logout-btn');

  if (userDropdown && logoutMenu && logoutButton) {
    // Toggle the logout menu when clicking on the username
    userDropdown.addEventListener('click', (e) => {
      e.preventDefault();
      logoutMenu.style.display = logoutMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Handle the logout action
    logoutButton.addEventListener('click', async () => {
      try {
        const response = await fetch('/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          alert('Logged out successfully');
          window.location.href = 'login.html'; // Redirect to login page after logout
        } else {
          alert('Error logging out');
        }
      } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }
});