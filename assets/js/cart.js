$(document).ready(function() {
    // Add a class to the body or a specific container for dark theme
    $('body').addClass('dark-theme');

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let cart = [];

    function displayProducts() {
        $('#productList').empty();
        products.forEach(product => {
            $('#productList').append(`
                <li class="list-group-item">
                    <strong>${product.productDescription}</strong><br>
                    <span>Price: $${product.productPrice}</span><br>
                    <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.productId}">Add to Cart</button>
                </li>
            `);
        });
    }

    function displayCart() {
        $('#cartList').empty();
        cart.forEach(item => {
            $('#cartList').append(`
                <li class="list-group-item">
                    <strong>${item.productDescription}</strong><br>
                    <span>Price: $${item.productPrice}</span><br>
                    <button class="btn btn-danger btn-sm remove-from-cart" data-id="${item.productId}">Remove</button>
                </li>
            `);
        });
    }

    $('#productList').on('click', '.add-to-cart', function() {
        const productId = $(this).data('id');
        const product = products.find(p => p.productId === productId);
        cart.push(product);
        displayCart();
    });

    $('#cartList').on('click', '.remove-from-cart', function() {
        const productId = $(this).data('id');
        cart = cart.filter(item => item.productId !== productId);
        displayCart();
    });

    $('#checkout').click(function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            $.ajax({
                url: '/api/checkout',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(cart),
                success: function(response) {
                    alert('Checkout successful!');
                    cart = [];
                    displayCart();
                },
                error: function() {
                    alert('Error during checkout.');
                }
            });
        }
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
