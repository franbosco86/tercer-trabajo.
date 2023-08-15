const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-btn");


let cartItems = [];

function addToCart(product) {
    const existingItem = cartItems.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function updateCart() {
    cartItemsElement.innerHTML = "";
    let total = 0;

    cartItems.forEach((product, index) => {
        const item = document.createElement("li");
        item.innerHTML = `
            ${product.name} (x${product.quantity}) - $${(product.price * product.quantity).toFixed(2)}
            <button class="remove-btn" data-index="${index}">Remove</button>`;
        cartItemsElement.appendChild(item);
        total += product.price * product.quantity;
    });

    cartTotalElement.innerText = total.toFixed(2);

    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}


const buyButtons = document.querySelectorAll(".boton-compra");
buyButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        const productName = document.querySelectorAll("h2")[index].innerText;
        const productPrice = parseFloat(document.querySelectorAll(".Precio")[index].innerText.slice(1));
        const product = { name: productName, price: productPrice };
        addToCart(product);
    });
});

checkoutButton.addEventListener("click", () => {
    if (cartItems.length === 0) {
        alert("El carrito está vacío. Agregue productos antes de realizar el checkout.");
    } else {
        alert("Gracias por su compra. Total: $" + parseFloat(cartTotalElement.innerText).toFixed(2));
        cartItems = [];
        updateCart();
    }
});








