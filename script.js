let cart = [];
let cartCount = 0;

const products = {
    cookies: [
        { id: 1, name: "Chocolate chip cookies", price: 1, img: "chocolate chip.jpg" },
        { id: 2, name: "Red velvet cookies", price: 1.75, img: "red velvet.jpg" },
        { id: 3, name: "Matcha cookies", price: 1.75, img: "matcha.jpg" },
        { id: 4, name: "Smores cookies", price: 2, img: "Smores.jpg" },
        { id: 5, name: "Oreos cookies", price: 2, img: "oreos.jpg" },
        { id: 6, name: "Biscoff cookies", price: 2.5, img: "biscoff.jpg" }
    ],
    brownies: [
        { id: 7, name: "Original", price: 4, img: "original.jpg" },
        { id: 8, name: "cheesecake brownies", price: 6, img: "cheesecake brownies.jpg" },
        { id: 9, name: "Red velvet brownies", price: 6, img: "red velvet brownies.jpg" },
        { id: 10, name: "Matcha brownies", price: 6, img: "matcha brownies.jpg" }
    ],
    cakes: [
        { id: 11, name: "Chocolate cake", price: 3, img: "chocolate cake.jpg" },
        { id: 12, name: "Cheesecake", price: 5, img: "cheesecake.jpg" },
        { id: 13, name: "Red velvet cake", price: 5, img: "red velvet cake.jpg" },
        { id: 14, name: "Strawberry cake", price: 6, img: "strawberry cake.jpg" },
        { id: 15, name: "Lemon cake", price: 6, img: "lemon cake.jpg" },
        { id: 16, name: "Tiramisu cake", price: 7.5, img: "tiramisu cake.jpg" },
        { id: 17, name: "Matcha tiramisu cake", price: 8, img: "matcha tiramisu.jpg" }
    ]
};

function loadCategory(category) {
    const productList = document.getElementById("product-list");
    if(!productList) return;
    productList.innerHTML = "";

    products[category].forEach(product => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3 class="description">${product.name}</h3>
            <p class="price">Price: $${product.price}</p>
            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
            <span class="favorite" onclick="toggleFavorite(this)">&#x2764;</span>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(id, name, price) {
    let existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    updateCartDisplay();
    updateCartCountDisplay();
    localStorage.setItem("cartItems", JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item"); // Add a class for styling

                // Find the image source based on the product ID (inefficient, but works for this example)
                let imageSrc = "";
                for (const category in products) {
                    const product = products[category].find(p => p.id === item.id);
                    if (product) {
                        imageSrc = product.img;
                        break;
                    }
                }

                itemElement.innerHTML = `
                    <img src="${imageSrc}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-quantity">x${item.quantity}</span>
                        <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }

    if (totalPriceElement) {
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }
}

function updateCartCountDisplay(){
    cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.getElementById('cart-count');
    if(cartCountElement){
        cartCountElement.textContent = cartCount;
    }
}

window.addEventListener('storage', () => {
    cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartDisplay();
    updateCartCountDisplay();
});

window.addEventListener('load', () => {
    cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    updateCartDisplay();
    updateCartCountDisplay();
});

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for your purchase!");
    cart = [];
    cartCount = 0;
    localStorage.removeItem('cartItems'); // Clear cart from local storage
    updateCartDisplay();
    updateCartCountDisplay();
}

function toggleFavorite(element) {
    element.classList.toggle('active');
    if (element.classList.contains('active')) {
        console.log('Added to Favorites');
    } else {
        console.log('Removed from Favorites');
    }
}

// Simple form validation for Contact Form (if you have it)
const contactForm = document.getElementById("contactForm");
if(contactForm){
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
    
        if (!name || !email) {
            alert("Please fill in both fields.");
        } else {
            alert(`Thank you, ${name}, we will contact you soon.`);
        }
    });
}