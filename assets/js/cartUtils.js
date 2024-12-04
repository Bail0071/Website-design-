renderCartItems(cartListElement) {
    if (this.cart.length === 0) {
        cartListElement.innerHTML = `
            <div class="empty-cart-message" style="text-align: center; color: #888;">
                <i class="empty-cart-icon fas fa-shopping-cart" style="font-size: 24px; margin-bottom: 10px;"></i>
                Your cart is empty
            </div>`;
        return;
    }

    cartListElement.innerHTML = this.cart.map(item => `
        <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid #ddd; background: #fff; margin-bottom: 0.5rem; border-radius: 8px;">
            <div class="cart-item-details" style="flex-grow: 1; margin-right: 1rem;">
                <h6>${item.name}</h6>
                <div class="quantity-controls" style="display: flex; align-items: center; gap: 0.5rem; margin: 0.5rem 0;">
                    <button class="btn btn-sm btn-outline-secondary" style="border: 1px solid #ccc; padding: 5px;" onclick="cartManager.updateQuantity('${item.productId}', ${item.quantity - 1})">-</button>
                    <span class="quantity" style="min-width: 2rem; text-align: center;">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" style="border: 1px solid #ccc; padding: 5px;" onclick="cartManager.updateQuantity('${item.productId}', ${item.quantity + 1})">+</button>
                </div>
                <div class="price" style="font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
            <button class="btn btn-sm btn-danger" style="background-color: #dc3545; color: white; border: none; padding: 5px;" onclick="cartManager.removeItem('${item.productId}')">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const totalElement = document.getElementById('cartTotal');
    if (totalElement) {
        totalElement.textContent = this.getTotal().toFixed(2);
    }
} 