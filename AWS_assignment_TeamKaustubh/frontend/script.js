// ==============================================
// ShopVista — Product Catalog Frontend Script
// ==============================================

const API_BASE_URL = 'http://65.2.82.172:5000';

// ── DOM ELEMENTS ──────────────────────────────
const productsGrid = document.getElementById('products-grid');
const loadingState = document.getElementById('loading-state');
const errorState = document.getElementById('error-state');
const emptyState = document.getElementById('empty-state');
const errorMessage = document.getElementById('error-message');
const searchInput = document.getElementById('search-input');
const totalProductsEl = document.getElementById('total-products');
const totalCategoriesEl = document.getElementById('total-categories');
const navLinks = document.querySelectorAll('.nav-link');

// ── STATE ─────────────────────────────────────
let allProducts = [];
let currentCategory = 'all';
let searchQuery = '';

// ── INITIALIZE ────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupEventListeners();
});

// ── EVENT LISTENERS ───────────────────────────
function setupEventListeners() {
    // Category navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            currentCategory = category;

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Re-render
            renderProducts();
        });
    });

    // Search input with debounce
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderProducts();
        }, 300);
    });
}

// ── FETCH PRODUCTS FROM API ───────────────────
async function fetchProducts() {
    showState('loading');

    try {
        const response = await fetch(`${API_BASE_URL}/api/products`);

        if (!response.ok) {
            throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        allProducts = data;

        // Update hero stats
        updateStats();

        // Render products
        renderProducts();

    } catch (error) {
        console.error('Failed to fetch products:', error);
        errorMessage.textContent = `Unable to connect to the product API. ${error.message}`;
        showState('error');
    }
}

// ── UPDATE HERO STATS ─────────────────────────
function updateStats() {
    totalProductsEl.textContent = allProducts.length;

    const categories = new Set(allProducts.map(p => p.category));
    totalCategoriesEl.textContent = categories.size;
}

// ── FILTER PRODUCTS ───────────────────────────
function getFilteredProducts() {
    let filtered = allProducts;

    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(p => p.category === currentCategory);
    }

    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchQuery) ||
            p.description.toLowerCase().includes(searchQuery) ||
            p.category.toLowerCase().includes(searchQuery)
        );
    }

    return filtered;
}

// ── RENDER PRODUCTS ───────────────────────────
function renderProducts() {
    const filtered = getFilteredProducts();

    if (filtered.length === 0) {
        showState('empty');
        return;
    }

    // Clear the grid
    productsGrid.innerHTML = '';

    // Create product cards
    filtered.forEach((product, index) => {
        const card = createProductCard(product, index);
        productsGrid.appendChild(card);
    });

    showState('products');
}

// ── CREATE A PRODUCT CARD ─────────────────────
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.id = `product-${product.id}`;
    card.style.animationDelay = `${index * 0.08}s`;

    // Format price (handles both number and string)
    const price = typeof product.price === 'number'
        ? `₹${product.price.toLocaleString('en-IN')}`
        : product.price;

    card.innerHTML = `
        <div class="product-card-image">
            <img 
                src="${product.image}" 
                alt="${product.name}" 
                loading="lazy"
                onerror="this.parentElement.innerHTML='<div class=\\'img-placeholder\\'>📷</div>'"
            >
            <span class="category-badge">${product.category}</span>
        </div>
        <div class="product-card-body">
            <h3 class="product-card-title">${product.name}</h3>
            <p class="product-card-description">${product.description}</p>
            <div class="product-card-footer">
                <span class="product-price">${price}</span>
                <button class="product-card-action" onclick="viewProduct(${product.id})">
                    View Details
                </button>
            </div>
        </div>
    `;

    return card;
}

// ── VIEW PRODUCT (placeholder for future feature) ──
function viewProduct(id) {
    const product = allProducts.find(p => p.id === id);
    if (product) {
        alert(`${product.name}\n\nPrice: ₹${product.price.toLocaleString('en-IN')}\n\n${product.description}`);
    }
}

// ── SHOW/HIDE STATES ──────────────────────────
function showState(state) {
    // Hide all states
    loadingState.classList.add('hidden');
    errorState.classList.add('hidden');
    emptyState.classList.add('hidden');
    productsGrid.classList.add('hidden');

    // Show requested state
    switch (state) {
        case 'loading':
            loadingState.classList.remove('hidden');
            break;
        case 'error':
            errorState.classList.remove('hidden');
            break;
        case 'empty':
            emptyState.classList.remove('hidden');
            break;
        case 'products':
            productsGrid.classList.remove('hidden');
            break;
    }
}
