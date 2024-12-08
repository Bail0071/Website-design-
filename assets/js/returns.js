document.addEventListener('DOMContentLoaded', function() {
    // Get form element
    const returnForm = document.getElementById('returnForm');
    
    // Add submit event listener to form
    returnForm.addEventListener('submit', handleSubmit);

    async function handleSubmit(e) {
        // Prevent default form submission
        e.preventDefault();
        
        const returnData = {
            orderNumber: document.getElementById('orderNumber').value,
            productName: document.getElementById('productName').value,
            reason: document.getElementById('returnReason').value,
            details: document.getElementById('returnDetails').value,
            status: 'Pending' // Add default status
        };

        try {
            const response = await fetch('http://localhost:3001/api/returns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(returnData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit return');
            }

            // Clear form
            returnForm.reset();
            
            // Show success message
            alert('Return submitted successfully!');
            
            // Refresh returns list
            loadReturns();
            
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit return');
        }
    }

    // Load returns on page load
    loadReturns();
});

// Function to load returns
async function loadReturns() {
    try {
        const response = await fetch('http://localhost:3001/api/returns');
        const returns = await response.json();
        displayReturns(returns);
    } catch (error) {
        console.error('Error loading returns:', error);
    }
}

// Function to display returns
function displayReturns(returns) {
    const returnsList = document.getElementById('returnsList');
    
    if (!returns.length) {
        returnsList.innerHTML = '<p>No returns found</p>';
        return;
    }

    const returnsHtml = returns.map(ret => `
        <div class="return-item">
            <h6>Order #${ret.orderNumber}</h6>
            <p>Product: ${ret.productName}</p>
            <p>Reason: ${ret.reason}</p>
            <p>Status: ${ret.status}</p>
            ${ret.details ? `<p>Details: ${ret.details}</p>` : ''}
        </div>
    `).join('');

    returnsList.innerHTML = returnsHtml;
} 