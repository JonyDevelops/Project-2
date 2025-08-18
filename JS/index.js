const cart = [];

function addToCart(product) {
console.log(product);
 cart.push(product);
 console.log(cart.length)
}

function removeFromCart (product){
    /*Remove Product from Cart */
}

const CartIcon = document.querySelector('.cart-icon');
const body = document.querySelector('body');

CartIcon.addEventListener('click', () => {
    body.classList.toggle('ShowCart')
})