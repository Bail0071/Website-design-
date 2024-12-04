document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'http://localhost:3001/api/returns';

    async function loadAllReturns() {
        try {
            const response = await fetch(apiUrl);
            const returns = await response.json();
            displayAllReturns(returns);
        } catch (error) {
            console.error('Error loading all returns:', error);
        }
    }

    function displayAllReturns(returns) {
        const allReturnsContainer = document.getElementById('allReturnsList');
        if (!returns.length) {
            allReturnsContainer.innerHTML = `
                <div class="return-item text-center">
                    <p class="mb-0">No return requests found</p>
                </div>
            `;
            return;
        }

        allReturnsContainer.innerHTML = returns.map(returnRequest => `
            <div class="return-item animate-item">
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-1">Order #${returnRequest.orderNumber}</h6>
                        <p class="mb-1">${returnRequest.productName}</p>
                        <small class="text-muted">Status: ${returnRequest.status}</small>
                    </div>
                </div>
                <div class="mt-2">
                    <small class="text-muted">Reason: ${returnRequest.reason}</small>
                    ${returnRequest.details ? `<p class="mb-0 mt-1">${returnRequest.details}</p>` : ''}
                </div>
            </div>
        `).join('');
    }

    loadAllReturns();
}); 