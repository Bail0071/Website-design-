$(document).ready(function() {
    // Add a class to the body or a specific container for dark theme
    $('body').addClass('dark-theme');

    // Cart management
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.productId === product.productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                productId: product.productId,
                productDescription: product.productDescription,
                productPrice: product.productPrice,
                quantity: 1
            });
        }
        
        saveCart();
        showNotification('Item added to cart!');
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.productId !== productId);
        saveCart();
        showNotification('Item removed from cart!');
    }

    function updateCartDisplay() {
        const cartList = $('#cartList');
        const cartTotal = $('#cartTotal');
        let total = 0;

        if (cart.length === 0) {
            cartList.html(`
                <div class="empty-cart-message">
                    <i class="empty-cart-icon fas fa-shopping-cart"></i>
                    Your cart is empty
                </div>
            `);
        } else {
            cartList.empty();
            cart.forEach(item => {
                const itemTotal = item.productPrice * item.quantity;
                total += itemTotal;
                
                cartList.append(`
                    <div class="list-group-item animate-item">
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <h6 class="mb-0">${item.productDescription}</h6>
                                <small class="text-muted">Quantity: ${item.quantity}</small>
                            </div>
                            <div class="text-right">
                                <div class="product-price mb-2">$${(itemTotal).toFixed(2)}</div>
                                <button class="btn btn-danger btn-sm remove-from-cart" 
                                        onclick="removeFromCart('${item.productId}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `);
            });
        }

        cartTotal.text(total.toFixed(2));
        updateCheckoutButton(total);
    }

    function updateCheckoutButton(total) {
        const checkoutBtn = $('#checkout');
        if (total > 0) {
            checkoutBtn.prop('disabled', false)
                .html('<i class="fas fa-shopping-bag mr-2"></i>Checkout ($' + total.toFixed(2) + ')');
        } else {
            checkoutBtn.prop('disabled', true)
                .html('<i class="fas fa-shopping-bag mr-2"></i>Checkout');
        }
    }

    function showNotification(message) {
        const notification = $(`
            <div class="notification" style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--sport-red);
                color: white;
                padding: 15px 25px;
                border-radius: 50px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                opacity: 0;
                transform: translateY(-20px);
                transition: all 0.3s ease;
            ">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        setTimeout(() => notification.css({ opacity: 1, transform: 'translateY(0)' }), 100);
        setTimeout(() => {
            notification.css({ opacity: 0, transform: 'translateY(-20px)' });
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Handle checkout
    $('#checkout').click(function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        
        // Here you would typically integrate with a payment gateway
        // For now, we'll just clear the cart
        cart = [];
        saveCart();
        showNotification('Order placed successfully!');
    });

    // Add a search function to filter products
    $('#searchProduct').on('input', function() {
        const query = $(this).val().toLowerCase();
        $('#productList li').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(query) > -1);
        });
    });

    displayProducts();
});
