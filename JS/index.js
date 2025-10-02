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
            id: Date.now(), // Simple unique ID
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showAddToCartNotification(product.name);
}

function updateCartDisplay() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

function showAddToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} added to cart!`;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function toggleCart() {
    window.location.href = "/Pages/Cart.html";
}   