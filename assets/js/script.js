//
// This code is managing products in the Techshop Product Management Panel.
// It includes functionality to add, update, and display products.
//

$(document).ready(function() {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    function generateProductId() {
        // Simple counter-based ID generation
        let productId = 'PROD-' + new Date().getTime();
        $('#productId').val(productId);
        showNotification('Product ID generated successfully!');
    }

    function showNotification(message) {
        const notification = $('<div class="notification"></div>').text(message);
        $('body').append(notification);
        notification.fadeIn(300).delay(2000).fadeOut(300, function() {
            $(this).remove();
        });
    }

    function displayProducts() {
        $('#productDisplay').empty();
        products.forEach(product => {
            $('#productDisplay').append(`
                <li class="card bg-secondary text-white mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${product.productId}</h5>
                        <div class="card-text d-flex flex-wrap mb-4">
                            <span class="badge bg-info text-dark me-2 mb-2">Description: ${product.productDescription}</span>
                            <span class="badge bg-secondary me-2 mb-2">Category: ${product.productCategory}</span>
                            <span class="badge bg-light text-dark me-2 mb-2">Unit: ${product.productUnit}</span>
                            <span class="badge bg-success me-2 mb-2">Price: $${product.productPrice}</span>
                            <span class="badge bg-warning text-dark mb-2">Weight: ${product.productWeight || 'N/A'}</span>
                        </div>
                        <button class="btn btn-danger btn-sm delete-product" data-id="${product.productId}"><i class="fas fa-trash-alt"></i> Delete</button>
                    </div>
                </li>
            `);
        });
    }

    $('#addProduct').click(function() {
        const product = {
            productId: $('#productId').val(),
            productDescription: $('#productDescription').val(),
            productCategory: $('#productCategory').val(),
            productUnit: $('#productUnit').val(),
            productPrice: $('#productPrice').val(),
            productWeight: $('#productWeight').val() || null
        };

        const existingIndex = products.findIndex(p => p.productId === product.productId);
        if (existingIndex > -1) {
            products[existingIndex] = product;
        } else {
            products.push(product);
        }

        // Save to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        displayProducts();
    });

    // Add event listener for the generate button
    $('#generateProductId').click(function() {
        generateProductId();
    });

    // Initial display of products
    displayProducts();

    // Add event listener for delete buttons
    $('#productDisplay').on('click', '.delete-product', function() {
        const productId = $(this).data('id');
        products = products.filter(product => product.productId !== productId);
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        showNotification('Product deleted successfully!');
    });
});
