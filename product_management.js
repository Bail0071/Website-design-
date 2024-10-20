function validateProductForm() {
    var productId = document.getElementById("productId").value;
    var productDescription = document.getElementById("productDescription").value;
    var productCategory = document.getElementById("productCategory").value;
    var productUOM = document.getElementById("productUOM").value;
    var productPrice = document.getElementById("productPrice").value;

    // Validation for all fields 
    if (productId === "" || productId.length < 3) {
        alert("Please enter a valid Product ID (at least 3 characters).");
        return false;
    }
  
    if (productDescription === "" || productDescription.length < 5) {
        alert("Please enter a valid Product Description (at least 5 characters).");
        return false;
    }
  
    if (productCategory === "") {
        alert("Please enter a Product Category.");
        return false;
    }
    
    if (productUOM === "") {
        alert("Please enter a Product Unit of Measure.");
        return false;
    }
    
    if (isNaN(productPrice) || productPrice <= 0) {
        alert("Please enter a valid Product Price.");
        return false;
    }

    // Creating JSON object for product
    var productData = {
        id: productId,
        description: productDescription,
        category: productCategory,
        uom: productUOM,
        price: parseFloat(productPrice),
        weight: document.getElementById("productWeight").value || null
    };

    console.log(JSON.stringify(productData));

    return true;
}
