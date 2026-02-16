// Main JS

// Cart Logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }
}

function addToCart(productId, quantity = 1, showNotification = true) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    const qtyToAdd = parseInt(quantity);

    if (existingItem) {
        existingItem.quantity += qtyToAdd;
    } else {
        cart.push({ ...product, quantity: qtyToAdd });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    if (showNotification) {
        alert(`${product.name} added to cart!`);
    }
}

function buyNow(productId, quantity = 1) {
    addToCart(productId, quantity, false);
    window.location.href = 'checkout.html';
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart(); // Re-render cart if on cart page
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            renderCart();
        }
    }
}


// Page Specific Logic

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .card').forEach(el => {
        observer.observe(el);
    });

    // Homepage Featured Products
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer && typeof products !== 'undefined') {
        renderProducts(products.slice(0, 4), featuredContainer);
    }

    // Product Listing Page
    const productsContainer = document.getElementById('all-products');
    if (productsContainer && typeof products !== 'undefined') {
        renderProducts(products, productsContainer);

        // Initialize filters
        document.getElementById('priceRange')?.addEventListener('input', (e) => {
            document.getElementById('priceValue').textContent = e.target.value;
            applyFilters();
        });

        document.querySelectorAll('.category-filter').forEach(checkbox => {
            checkbox.addEventListener('change', applyFilters);
        });
    }

    // Search Logic
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');

    // Create suggestions container
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions-dropdown';
    if (searchForm) {
        searchForm.classList.add('search-wrapper');
        searchForm.appendChild(suggestionsContainer);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            if (query.length < 2) {
                suggestionsContainer.style.display = 'none';
                return;
            }

            const matches = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            ).slice(0, 6);

            if (matches.length > 0) {
                suggestionsContainer.innerHTML = matches.map(product => `
                    <div class="suggestion-item" onclick="window.location.href='product-details.html?id=${product.id}'">
                        <img src="${product.image}" class="suggestion-img" alt="${product.name}">
                        <div class="suggestion-info">
                            <p class="suggestion-title">${product.name}</p>
                            <span class="suggestion-category">${product.category}</span>
                            <p class="suggestion-price">₹${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                `).join('');
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.innerHTML = '<div class="suggestion-item"><div class="suggestion-info"><p class="suggestion-title">No products found</p></div></div>';
                suggestionsContainer.style.display = 'block';
            }
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchForm.contains(e.target)) {
                suggestionsContainer.style.display = 'none';
            }
        });

        // Initial search form submit
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.toLowerCase();
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        });
    }

    // Check for search query or category filter on products page
    if (productsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        const categoryQuery = urlParams.get('category');

        if (searchQuery) {
            // Apply search filter immediately
            const sortSelect = document.getElementById('sortSelect');
            if (sortSelect) sortSelect.value = 'default';
            if (searchInput) searchInput.value = searchQuery;
            applySearch(searchQuery);
        } else if (categoryQuery) {
            // Apply category filter
            applyFilters();
        }
    }


    // Product Details Page
    const productDetailsContainer = document.getElementById('product-details-container');
    if (productDetailsContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        if (productId) {
            renderProductDetails(productId);
        } else {
            productDetailsContainer.innerHTML = '<div class="col-12"><p class="text-center">Product not found.</p></div>';
        }
    }

    // Cart Page
    const cartContainer = document.getElementById('cart-items');
    if (cartContainer) {
        renderCart();
    }

    // Checkout Page Redirect if empty
    if (window.location.pathname.includes('checkout.html') && cart.length === 0) {
        alert('Your cart is empty. Redirecting to products...');
        window.location.href = 'products.html';
    }
});

function renderProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const container = document.getElementById('product-details-container');

    if (!product) {
        container.innerHTML = '<div class="col-12"><p class="text-center">Product not found.</p></div>';
        return;
    }

    container.innerHTML = `
        <div class="col-md-6 mb-4">
            <img src="${product.image}" class="img-fluid rounded" alt="${product.name}" referrerpolicy="no-referrer">
        </div>
        <div class="col-md-6">
            <div class="small mb-1">SKU: BST-${product.id}00</div>
            <h1 class="display-5 fw-bolder">${product.name}</h1>
            <div class="fs-5 mb-5">
                ${product.oldPrice ? `<span class="text-decoration-line-through text-muted">₹${product.oldPrice.toFixed(2)}</span>` : ''}
                <span>₹${product.price.toFixed(2)}</span>
            </div>
            
            <div class="mb-3">
                <div class="d-flex align-items-center">
                    <div class="text-warning me-2">
                        ${renderStars(product.rating)}
                    </div>
                    <span class="text-muted small">(${product.reviews} reviews)</span>
                </div>
            </div>

            <p class="lead">${product.description}</p>
            <div class="d-flex mb-4 align-items-center">
                <div class="input-group input-group-sm me-3" style="width: 120px;">
                    <button class="btn btn-outline-dark px-2" type="button" onclick="document.getElementById('inputQuantity').stepDown()">
                        <i class="bi bi-dash"></i>
                    </button>
                    <input class="form-control text-center px-0" id="inputQuantity" type="number" value="1" min="1" readonly />
                    <button class="btn btn-outline-dark px-2" type="button" onclick="document.getElementById('inputQuantity').stepUp()">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
                <button class="btn btn-outline-dark flex-shrink-0 me-2" type="button" onclick="addToCart(${product.id}, document.getElementById('inputQuantity').value)">
                    <i class="bi-cart-fill me-1"></i>
                    Add to cart
                </button>
                <button class="btn btn-primary flex-shrink-0" type="button" onclick="buyNow(${product.id}, document.getElementById('inputQuantity').value)">
                    <i class="bi-bag-check-fill me-1"></i>
                    Buy Now
                </button>
            </div>
        </div>
        
        <!-- Related Products -->
        <div class="col-12 mt-5">
            <h2 class="fw-bolder mb-4">Related Products</h2>
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                ${renderRelatedProducts(product)}
            </div>
        </div>
    `;
}

function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="bi bi-star-fill"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="bi bi-star-half"></i>';
        } else {
            stars += '<i class="bi bi-star"></i>';
        }
    }
    return stars;
}

function renderRelatedProducts(currentProduct) {
    const related = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .sort(() => 0.5 - Math.random()) // Randomize for variety
        .slice(0, 4);

    if (related.length === 0) return '<p class="text-muted">No related products found.</p>';

    return related.map(product => `
        <div class="col mb-5">
            <div class="card h-100">
                <!-- Product image-->
                <a href="product-details.html?id=${product.id}">
                    <img class="card-img-top" src="${product.image}" alt="${product.name}" />
                </a>
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder"><a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a></h5>
                        <!-- Product price-->
                        ${product.oldPrice ? `<span class="text-muted text-decoration-line-through">₹${product.oldPrice.toFixed(2)}</span>` : ''}
                        ₹${product.price.toFixed(2)}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center d-flex justify-content-center gap-2">
                        <button class="btn btn-outline-dark mt-auto" onclick="addToCart(${product.id})">Add to cart</button>
                        <button class="btn btn-primary mt-auto" onclick="buyNow(${product.id})">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function applySearch(query) {
    const term = query.toLowerCase();
    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    );

    const container = document.getElementById('all-products');
    if (container) {
        // Clear other filters visually if needed, but for now just show results
        if (filteredProducts.length > 0) {
            renderProducts(filteredProducts, container);
        } else {
            container.innerHTML = `<div class="col-12 text-center"><p>No products found for "${query}".</p><a href="products.html" class="btn btn-outline-primary">Clear Search</a></div>`;
        }
    }
}

function applyFilters() {
    let filteredProducts = [...products];

    // Category Filter (from URL)
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
        filteredProducts = filteredProducts.filter(p => p.category === categoryParam);

        // Update Title if possible
        const titleElement = document.querySelector('.text-center.mb-5 h1');
        if (titleElement) titleElement.textContent = `${categoryParam} Products`;
    }

    // Price Filter
    const maxPrice = parseFloat(document.getElementById('priceRange').value);
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    // Sort
    const sortValue = document.getElementById('sortSelect').value;
    if (sortValue === 'low-high') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'high-low') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    const container = document.getElementById('all-products');
    if (container) {
        if (filteredProducts.length > 0) {
            renderProducts(filteredProducts, container);
        } else {
            container.innerHTML = '<div class="col-12 text-center"><p>No products found properly matching your criteria.</p></div>';
        }
    }
}

function renderProducts(productList, container) {
    container.innerHTML = productList.map(product => `
        <div class="col mb-5">
            <div class="card h-100">
                <!-- Sale badge-->
                ${product.isOnSale ? '<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>' : ''}
                <!-- Product image-->
                <a href="product-details.html?id=${product.id}">
                    <img class="card-img-top" src="${product.image}" alt="${product.name}" referrerpolicy="no-referrer" />
                </a>
                <!-- Product details-->
                <div class="card-body p-4">
                    <div class="text-center">
                        <!-- Product name-->
                        <h5 class="fw-bolder"><a href="product-details.html?id=${product.id}" class="text-decoration-none text-dark">${product.name}</a></h5>
                        <!-- Product price-->
                        ${product.oldPrice ? `<span class="text-muted text-decoration-line-through">₹${product.oldPrice.toFixed(2)}</span>` : ''}
                        ₹${product.price.toFixed(2)}
                    </div>
                </div>
                <!-- Product actions-->
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center d-flex justify-content-center gap-2">
                        <button class="btn btn-outline-dark mt-auto" onclick="addToCart(${product.id})">Add to cart</button>
                        <button class="btn btn-primary mt-auto" onclick="buyNow(${product.id})">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}


// Scroll to Top Logic
let mybutton = document.getElementById("scrollToTopBtn");

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        if (mybutton) mybutton.style.display = "block";
    } else {
        if (mybutton) mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty</td></tr>';
        if (cartTotalElement) cartTotalElement.textContent = '₹0.00';

        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.classList.add('disabled');
            checkoutBtn.style.pointerEvents = 'none';
            checkoutBtn.style.opacity = '0.5';
        }
        return;
    }

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.classList.remove('disabled');
        checkoutBtn.style.pointerEvents = 'auto';
        checkoutBtn.style.opacity = '1';
    }

    let total = 0;

    cartContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        return `
        <tr>
            <td data-th="Product">
                <div class="row">
                    <div class="col-sm-2 hidden-xs"><img src="${item.image}" alt="${item.name}" class="img-fluid"/></div>
                    <div class="col-sm-10">
                        <h4 class="nomargin">${item.name}</h4>
                        <p>${item.description}</p>
                    </div>
                </div>
            </td>
            <td data-th="Price">₹${item.price.toFixed(2)}</td>
            <td data-th="Quantity">
                <div class="input-group input-group-sm justify-content-center" style="width: 100px; margin: 0 auto;">
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <input type="number" class="form-control text-center px-1" value="${item.quantity}" readonly>
                    <button class="btn btn-outline-secondary" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </td>
            <td data-th="Subtotal" class="text-center">₹${itemTotal.toFixed(2)}</td>
            <td class="actions" data-th="">
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>
        `;
    }).join('');

    if (cartTotalElement) cartTotalElement.textContent = `₹${total.toFixed(2)}`;
}

function handleContact(event) {
    event.preventDefault();
    if (event.target.checkValidity()) {
        alert('Message sent successfully! We will get back to you soon.');
        event.target.reset();
        event.target.classList.remove('was-validated');
    } else {
        event.target.classList.add('was-validated');
    }
}
