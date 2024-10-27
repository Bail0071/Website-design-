const products = [
    { id: 1, name: "Wilson NFL Football", price: 59.99 },
    { id: 2, name: "Basketball", price: 29.99 },
    { id: 3, name: "Soccer Ball", price: 24.99 }
];

function displayProducts(productList) {
    const productListElement = $("#productList");
    productListElement.empty();
    productList.forEach(product => {
        const productHTML = `
            <div class="product-item">
                <h5>${product.name}</h5>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button class="btn btn-primary addToCartBtn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productListElement.append(productHTML);
    });
}

// Initial display of all products
displayProducts(products);

// Search functionality
$("#searchBtn").on("click", function() {
    const searchQuery = $("#searchInput").val().toLowerCase();
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery));
    displayProducts(filteredProducts);
});

const cart = [];

// Add to cart functionality
$(document).on("click", ".addToCartBtn", function() {
    const productId = $(this).data("id");
    const product = products.find(p => p.id === productId);
    addToCart(product);
});

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
    updateCartTotal();
}

// Display cart items in the summary
function updateCartDisplay() {
    const cartItemsElement = $("#cartItems");
    cartItemsElement.empty();
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItemHTML = `
            <div class="cart-item">
                <span>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</span>
                <span class="item-total float-right">$${itemTotal.toFixed(2)}</span>
            </div>
        `;
        cartItemsElement.append(cartItemHTML);
    });
}

// Update cart total
function updateCartTotal() {
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    const tax = subtotal * 0.1; // Assuming a 10% tax rate
    const total = subtotal + tax;

    $("#subtotal").text(subtotal.toFixed(2));
    $("#tax").text(tax.toFixed(2));
    $("#total").text(total.toFixed(2));
}
