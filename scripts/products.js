document.addEventListener("DOMContentLoaded", () => {
    // Check which page we're on by presence of DOM elements
    if (document.getElementById('product-grid')) {
        fetchProducts();
    }

    if (document.getElementById('product-detail')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if (productId) {
            fetchProductDetail(productId);
        }
    }
});

/* ----------------------------
1. PRODUCT LIST PAGE LOGIC
---------------------------- */

const productGrid = document.getElementById('product-grid');

async function fetchProducts() {
    productGrid.innerHTML = '<p>Loading products...</p>';
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();
        displayProducts(products);
    } catch (error) {
        productGrid.innerHTML = '<p>Failed to load products.</p>';
        console.error(error);
    }
}

function displayProducts(products) {
    productGrid.innerHTML = '';
    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <a href="products.html?id=${product.id}">
                <img loading="lazy" src="${product.image}" alt="${product.title}" />
            </a>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="product-button" aria-label="Add ${product.title} to cart">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        `;

        // Attach click event to the Add to Cart button
        const button = card.querySelector('.product-button');
        button.addEventListener('click', () => addToCart(product));

        fragment.appendChild(card);
    });

    productGrid.appendChild(fragment);

    if (!products.length) {
        productGrid.innerHTML = '<p>No products available.</p>';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const profileIcon = document.getElementById("profileIcon");
    if (localStorage.getItem("loggedIn") === "true") {
        profileIcon.innerHTML = '<span style="color: green; cursor:pointer;" id="logoutBtn">Logged in</span>';
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("loggedIn");
            window.location.reload();
        });
    }
});
/* ----------------------------
2. PRODUCT DETAIL PAGE LOGIC
---------------------------- */

const productDetailContainer = document.getElementById('product-detail');

async function fetchProductDetail(id) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const product = await res.json();
        displayProductDetail(product);
    } catch (error) {
        productDetailContainer.innerHTML = '<p>Failed to load product details.</p>';
        console.error(error);
    }
}

function displayProductDetail(product) {
    productDetailContainer.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.title}" />
        </div>
        <div class="product-detail-info">
            <h1>${product.title}</h1>
            <p class="price">$${product.price.toFixed(2)}</p>
            <p class="description">${product.description}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;

    const addButton = document.querySelector('.add-to-cart');
    if (addButton) {
        addButton.addEventListener('click', () => addToCart(product));
    }
}


/* ----------------------------
3. CART STORAGE
---------------------------- */

function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
    updateCartCount(); // Update badge immediately
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const badge = document.querySelector('.cart-badge');
    if (badge) badge.textContent = count;
}

document.addEventListener('DOMContentLoaded', updateCartCount);



/* ----------------------------
4. search bar functionality
---------------------------- */

document.querySelector('.search-bar input').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const title = card.querySelector('.product-title').textContent.toLowerCase();
        card.style.display = title.includes(term) ? 'block' : 'none';
    });
});
