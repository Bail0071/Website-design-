$(document).ready(function() {
    // Display all products initially
    displayProducts(products);

    // Debounce function to limit search operations
    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
        };
    }

    // Search function
    $("#searchInput").on("keyup", debounce(function() {
        const searchQuery = $(this).val().toLowerCase().trim();
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery));
        
        if (filteredProducts.length > 0) {
            displayProducts(filteredProducts);
        } else {
            displayNoResultsMessage();
        }
    }, 300)); // Adjust debounce delay as needed

    function displayNoResultsMessage() {
        $("#productContainer").html("<p>No products found.</p>");
    }
});
