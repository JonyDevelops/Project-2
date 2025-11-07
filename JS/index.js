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
    'Mocha': { name: 'Mocha', price: 2.00, image: '' },

    // Cold Drinks
    'Iced Latte': { name: 'Iced Latte', price: 2.50, image: '/Assets/images/Latte.png' },
    'Iced Americano': { name: 'Iced Americano', price: 2.50, image: '/Assets/images/iced-americano-sq.jpg' },
    'Iced Mocha': { name: 'Iced Mocha', price: 2.50, image: '/Assets/images/Iced_Cafe_Mocha.jpg' },
    'Iced Espresso': { name: 'Iced Espresso', price: 2.50, image: '/Assets/images/Iced Espresso.jpeg' },
    'Iced Macchiato': { name: 'Iced Macchiato', price: 2.50, image: '/Assets/images/IcedMacchiato.png' },
    'Iced Flat White': { name: 'Iced Flat White', price: 2.50, image: '/Assets/images/IcedFlatWhite.png' },
    'Frappe': { name: 'Frappe', price: 3.00, image: '/Assets/images/Fappe.jpg' },
    'Caramel iced frappe': { name: 'Caramel Iced Frappe', price: 3.00, image: '/Assets/images/Caramal iced frappe.jpg' },
    'Chocolate iced frappe': { name: 'Chocolate Iced Frappe', price: 3.00, image: '/Assets/images/Chocolate iced frappe.jpg' },
    'Mocha Frappe': { name: 'Mocha Frappe', price: 3.00, image: '/Assets/images/Mocha Frappe.jpg' },

    // Snacks
    'Chocolate croissant': { name: 'Chocolate croissant', price: 2.00, image: '/Assets/images/Chocolate croissant.jpg' },
    'Croissant': { name: 'Croissant', price: 2.00, image: '/Assets/images/Croissant701SWSweb_2web.jpg' },
    'McCoys Cheddar & Onion': { name: "McCoy's Cheddar & Onion", price: 2.00, image: '/Assets/images/Chedder & onion.jpg' },
    'Chocolate Chip Cookie': { name: 'Chocolate Chip Cookie', price: 2.00, image: '/Assets/images/classic-chocolate-chip-cookies.jpg' },
    'McCoys Salt & Vinegar': { name: "McCoys Salt & Vinegar", price: 2.00, image: "/Assets/images/McCoy's Salt & Vinegar.png" },
    'White chocolate cookie': { name: 'White chocolate cookie', price: 2.00, image: '/Assets/images/White chocolate cookie.jpg' },
    'Chocolate Donut': { name: 'Chocolate Donut', price: 2.00, image: '/Assets/images/Chocolate Donut.jpg' },
    'Original glazed donut': { name: 'Original glazed donut', price: 2.00, image: '/Assets/images/original glazed donut.jpg' }
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
                    <button class="quantity-btn" onclick="geQuantity(${item.id}, -1)">-</button>
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

function togglemenu() {
    const hamburger= document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
}

const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.hamburger').classList.remove('active');
            document.querySelector('nav').classList.remove('active');
            });
        }); 