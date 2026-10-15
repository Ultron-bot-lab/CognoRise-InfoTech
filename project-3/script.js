// --- 1. Product Data ---
const products = [
    // Electronics
    { 
        id: 1, 
        name: "Philips Coffee Maker", 
        price: 49.99, 
        category: "electronics", 
        image: "images/coffee.jpg" 
    },
    { 
        id: 2, 
        name: "Noise Cancelling Headphones", 
        price: 129.99, 
        category: "electronics", 
        image: "images/headphone.jpg" 
    },
    { 
        id: 3, 
        name: "Huawei Smartphone", 
        price: 899.00, 
        category: "electronics", 
        image: "images/phone.jpg" 
    },
    { 
        id: 4, 
        name: "Ulysse Nardin Watch", 
        price: 4500.00, 
        category: "electronics", 
        image: "images/watch.jpg" 
    },

    // Home & Decor
    { 
        id: 5, 
        name: "Yellow Ceramic Table Lamp", 
        price: 85.50, 
        category: "home", 
        image: "images/lamp.jpg" 
    },
    { 
        id: 6, 
        name: "Rustic Home Decor Set", 
        price: 35.00, 
        category: "home", 
        image: "images/decor.jpg" 
    },

    // Clothing & Accessories
    { 
        id: 7, 
        name: "Beige Bomber Jacket", 
        price: 65.00, 
        category: "clothing", 
        image: "images/jacket.jpg" 
    },
    { 
        id: 8, 
        name: "Leather Dress Shoes", 
        price: 110.00, 
        category: "clothing", 
        image: "images/shoes.jpg" 
    }
];

// --- 2. State Management ---
let cart = JSON.parse(localStorage.getItem("ecommerceCart")) || [];

// --- 3. DOM Elements ---
const productGrid = document.getElementById("product-grid");
const cartItemsContainer = document.getElementById("cart-items");
const totalItemsEl = document.getElementById("total-items");
const totalPriceEl = document.getElementById("total-price");
const searchBar = document.getElementById("search-bar");
const categoryFilter = document.getElementById("category-filter");

// --- 4. Reusable Functions ---

function saveCart() {
    localStorage.setItem("ecommerceCart", JSON.stringify(cart));
    updateCartUI();
}

function renderProducts(productList) {
    productGrid.innerHTML = "";
    
    if (productList.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(card);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    saveCart();
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity < 1) {
        item.quantity = 1; 
    }

    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let totalItems = 0;
    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;

            const cartItemEl = document.createElement("div");
            cartItemEl.className = "cart-item";
            cartItemEl.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    $${item.price.toFixed(2)} x ${item.quantity}
                </div>
                <div class="cart-item-controls">
                    <button class="decrease" onclick="changeQuantity(${item.id}, -1)">-</button>
                    <button class="increase" onclick="changeQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})">X</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemEl);
        });
    }

    totalItemsEl.textContent = totalItems;
    totalPriceEl.textContent = totalPrice.toFixed(2);
}

function filterProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = category === "all" || product.category === category;
        return matchesSearch && matchesCategory;
    });

    renderProducts(filtered);
}

// --- 5. Event Listeners ---
searchBar.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// --- 6. Initialization ---
function init() {
    renderProducts(products); 
    updateCartUI();           
}

init();