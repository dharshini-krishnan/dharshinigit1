// --- 1. Product Data ---
const products = [
    // Electronics Category
    { id: 1, name: "Noise Cancelling Headphones", category: "electronics", price: 199.99, image: "https://m.media-amazon.com/images/I/61A+cSg3UpL._AC_SL1500_.jpg" },
    { id: 2, name: "4K Smart TV 55-inch", category: "electronics", price: 499.00, image: "https://tse4.mm.bing.net/th/id/OIP.xniW4AzfI5fnizn4ieoPpQHaF6?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 3, name: "Wireless Gaming Mouse", category: "electronics", price: 45.50, image: "https://m.media-amazon.com/images/I/611hFJXt8ZL._AC_SL1500_.jpg" },
    
    // Clothing Category
    { id: 4, name: "Casual Denim Jacket", category: "clothing", price: 79.95, image: "https://tse4.mm.bing.net/th/id/OIP.qAMJOcfwn7axuFABVDL-ewHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 5, name: "Men's Cotton T-Shirt", category: "clothing", price: 25.00, image: "https://i5.walmartimages.com/seo/WAENQINLA-Men-s-Cotton-T-Shirts-Big-and-Tall-Classic-3-Pack-Crew-Neck-Shirts-for-Men-Comfort-Short-Sleeve-Undershirts-5XL_8ad49573-61e7-4376-9499-c54525c2b576.30636a33e60f56c855c2a08385542c37.jpeg" },
    { id: 6, name: "Women's Running Shoes", category: "clothing", price: 90.00, image: "https://th.bing.com/th/id/OIP.S3ga0uFnvJMt0jVptJxLXwHaEL?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
    
    // Home Goods Category
    { id: 7, name: "Bamboo Wood Cutting Board", category: "home", price: 29.99, image: "https://th.bing.com/th/id/OIP.WSgo1kFhP4yqjuvvHQwVKQHaE7?o=7&cb=12rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 8, name: "Robot Vacuum Cleaner", category: "home", price: 250.00, image: "https://www.livemint.com/lm-img/img/2024/01/24/1600x900/best_robotic_vacuum_cleaner_1706094429597_1706094429964.jpg" },
    { id: 9, name: "Aroma Diffuser", category: "home", price: 35.00, image: "https://tse2.mm.bing.net/th/id/OIP.PY1bWt9enxNdbS156kPc0gHaEJ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
    
    // Books Category
    { id: 10, name: "The Alchemist", category: "books", price: 12.50, image: "https://tse2.mm.bing.net/th/id/OIP.7iTlm2MlgGSJZQdkbOKTzQHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 11, name: "JavaScript Definitive Guide", category: "books", price: 49.99, image: "https://tse3.mm.bing.net/th/id/OIP.Lz2_JbAFz4Zegxawx6kTDwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { id: 12, name: "Cooking for Beginners", category: "books", price: 19.95, image: "https://tse1.mm.bing.net/th/id/OIP.bHRj8Z-fuAZBxcFD1UWshwHaJJ?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3" }
];

const productGrid = document.getElementById('productGrid');
const noResults = document.getElementById('noResults');

// --- 2. Rendering Function ---
/**
 * Renders a list of products onto the main grid.
 * @param {Array} productList - The list of products to display.
 */
function renderProducts(productList) {
    productGrid.innerHTML = ''; // Clear existing products

    if (productList.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    noResults.style.display = 'none';

    productList.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        // Create the HTML for one product card
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>Category: ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <div class="price">$${product.price.toFixed(2)}</div>
                <button>Add to Cart</button>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

// --- 3. Filtering and Searching Logic ---
function filterProducts() {
    // 1. Get Search Term
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // 2. Get Selected Categories
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked'))
                                     .map(checkbox => checkbox.value);

    // 3. Get Price Range
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;

    // 4. Filter the Products
    const filtered = products.filter(product => {
        const nameMatches = product.name.toLowerCase().includes(searchTerm);
        
        const categoryMatches = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        const priceMatches = product.price >= minPrice && product.price <= maxPrice;
        
        return nameMatches && categoryMatches && priceMatches;
    });

    // 5. Render the Results
    renderProducts(filtered);
}

// --- 4. Clear Filters Function ---
function clearFilters() {
    // Clear search input
    document.getElementById('searchInput').value = '';

    // Uncheck all category checkboxes
    document.querySelectorAll('.category-filter:checked').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Reset price inputs
    document.getElementById('minPrice').value = '0';
    document.getElementById('maxPrice').value = '500';

    // Rerun the filter function to show all products
    filterProducts();
}

// --- 5. Initial Load ---
// Display all products when the page first loads
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});
