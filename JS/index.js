// Cart Management System
let cart = [];

const productData = {
    'Cappuccino': { name: 'Cappuccino', price: 2.00, image: '/Assets/images/Cappuccino.jpg' },
    'black americano': { name: 'Black Americano', price: 2.00, image: '/Assets/images/black-americano.jpg' },
    'Latte': { name: 'Latte', price: 2.00, image: '/Assets/images/Latte.png' },
    'Flat white': { name: 'Flat White', price: 2.00, image: '/Assets/images/flat-white.png' },
    'Espresso': { name: 'Espresso', price: 2.00, image: '/Assets/images/Espresso.png' },
    'Fliter black coffee': { name: 'Filter Black Coffee', price: 2.00, image: '/Assets/images/Fliter black coffee.jpeg' },
    'Macchiato': { name: 'Macchiato', price: 2.00, image: '/Assets/images/Macchiato.png' },
    'Mocha': { name: 'Mocha', price: 2.00, image: '' }
};

function addToCart(productName) {
    const product = productData[productName];
    if (!product) {
        console.error('Product not found:', productName);
        return;
    }

    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now(), 
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showAddToCartNotification(product.name);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
    saveCartToLocalStorage();
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    if (!cartItemsContainer || !cartTotalElement) return;

    cartItemsContainer.innerHTML = '';

    let total = 0;
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image || '/Assets/images/default-coffee.png'}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">£${item.price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <div class="cart-item-total">
                    £${itemTotal.toFixed(2)}
                </div>
                <button class="remove-item-btn" onclick="removeFromCart(${item.id})">×</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    cartTotalElement.textContent = total.toFixed(2);
    updateCartDisplay();
}

function changeQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            renderCartItems();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    renderCartItems();
}

function clearCart() {
    cart = [];
    renderCartItems();
}

function Checkout() {
    if (cart.length > 0) {
        alert('Thank you for your order!');
        clearCart();
    } else {
        alert('Your cart is empty.');
    }
}

function showAddToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function toggleCart() {
    window.location.href = "/Pages/Cart.html";
}

function CartClose() {
    window.location.href = "../index.html";
}

window.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    updateCartDisplay();
    if (document.getElementById('cart-items')) {
        renderCartItems();
    }
});