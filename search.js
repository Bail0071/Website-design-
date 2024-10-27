$(document).ready(function() {
    // Load product data and display all items initially
    displayProducts(products);

    // Search function (triggered on button click)
    $("#searchBtn").click(function() {
        const searchQuery = $("#searchInput").val().toLowerCase();
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery));
        displayProducts(filteredProducts);
    });
});// JavaScript Document
