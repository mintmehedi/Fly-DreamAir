document.addEventListener('DOMContentLoaded', function() {
    function handleCounter(serviceId) {
        const decreaseBtn = document.querySelector(`#${serviceId} .decrease`);
        const increaseBtn = document.querySelector(`#${serviceId} .increase`);
        const quantityDisplay = document.querySelector(`#${serviceId} .quantity`);

        let quantity = 0;

        increaseBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
        });

        decreaseBtn.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
            }
        });
    }

    const services = ['chocolate-bars-qty', 'crackers-qty', 'cookies-qty', 'noodles-qty', 'sandwiches-qty', 'pasta-qty', 'salads-qty', 'coffee-tea-qty', 'soft-drinks-qty', 'water-qty', 'juices-qty'];

    services.forEach(serviceId => handleCounter(serviceId));
});
