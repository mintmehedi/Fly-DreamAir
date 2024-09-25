document.addEventListener('DOMContentLoaded', function() {
    // Seat selection logic
    const seatGrid = document.getElementById('seat-grid');
    const confirmSeatNumber = document.getElementById('confirm-seat-number');
    const confirmButton = document.getElementById('confirm-button');
    let selectedSeat = null;

    const rows = 10;
    const columns1And3 = ['A', 'B']; // For 1st column (two seats per row)
    const columns2 = ['D', 'E', 'F']; // For 2nd column (three seats per row)
    const columns3 = ['H', 'J']; // For 3rd column (two seats per row, different seat labels)

    const bookedSeats = ['1A', '1B', '2D', '5H']; // Example of booked seats

    function createSeat(row, seatLabel) {
        const seatButton = document.createElement('button');
        seatButton.classList.add('seat', 'available');
        seatButton.textContent = `${row}${seatLabel}`;

        // Check if seat is booked
        if (bookedSeats.includes(`${row}${seatLabel}`)) {
            seatButton.classList.add('booked');
            seatButton.classList.remove('available');
        }

        // Seat selection logic
        seatButton.addEventListener('click', function() {
            if (!seatButton.classList.contains('booked')) {
                if (selectedSeat) {
                    selectedSeat.classList.remove('selected');
                }
                seatButton.classList.add('selected');
                selectedSeat = seatButton;

                // Update the confirmation box
                confirmSeatNumber.innerHTML = `${row}${seatLabel}`;
                confirmButton.disabled = false; // Enable the confirm button after seat selection
            }
        });

        return seatButton;
    }

    for (let row = 1; row <= rows; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('seat-row');

        // 1st column (2 seats)
        const group1Div = document.createElement('div');
        group1Div.classList.add('seat-group');
        columns1And3.forEach(seatLabel => {
            const seatButton = createSeat(row, seatLabel);
            group1Div.appendChild(seatButton);
        });
        rowDiv.appendChild(group1Div);

        // Aisle after 1st column
        const aisleDiv1 = document.createElement('div');
        aisleDiv1.classList.add('aisle');
        rowDiv.appendChild(aisleDiv1);

        // 2nd column (3 seats)
        const group2Div = document.createElement('div');
        group2Div.classList.add('seat-group');
        columns2.forEach(seatLabel => {
            const seatButton = createSeat(row, seatLabel);
            group2Div.appendChild(seatButton);
        });
        rowDiv.appendChild(group2Div);

        // Aisle after 2nd column
        const aisleDiv2 = document.createElement('div');
        aisleDiv2.classList.add('aisle');
        rowDiv.appendChild(aisleDiv2);

        // 3rd column (2 seats with different seat labels)
        const group3Div = document.createElement('div');
        group3Div.classList.add('seat-group');
        columns3.forEach(seatLabel => {
            const seatButton = createSeat(row, seatLabel);
            group3Div.appendChild(seatButton);
        });
        rowDiv.appendChild(group3Div);

        seatGrid.appendChild(rowDiv);

        // Adding a row gap after every 5th row
        if (row % 5 === 0) {
            const gapDiv = document.createElement('div');
            gapDiv.classList.add('row-gap');
            seatGrid.appendChild(gapDiv);
        }
    }

    // When user confirms the seat
    confirmButton.addEventListener('click', function() {
        if (selectedSeat) {
            const seatNumber = selectedSeat.textContent;

            // Store the selected seat number in sessionStorage
            sessionStorage.setItem('seatNumber', seatNumber);

            alert(`Seat ${seatNumber} has been confirmed.`);
            confirmButton.disabled = true;  // Disable the confirm button after confirmation
        }
    });

    // Onboard services logic
    function handleCounter(serviceId) {
        const decreaseBtn = document.querySelector(`#${serviceId} .decrease`);
        const increaseBtn = document.querySelector(`#${serviceId} .increase`);
        const quantityDisplay = document.querySelector(`#${serviceId} .quantity`);
        const serviceCostPerItem = 20;  // Cost per item is $20
        let quantity = 0;

        increaseBtn.addEventListener('click', () => {
            quantity++;
            quantityDisplay.textContent = quantity;
            updateOnboardServicesTotal();  // Update the total when increasing quantity
        });

        decreaseBtn.addEventListener('click', () => {
            if (quantity > 0) {
                quantity--;
                quantityDisplay.textContent = quantity;
                updateOnboardServicesTotal();  // Update the total when decreasing quantity
            }
        });

        return {
            getQuantity: () => quantity,
            getTotalCost: () => quantity * serviceCostPerItem
        };
    }

    // Initialize onboard services counters
    const services = [
        'chocolate-bars-qty', 'crackers-qty', 'cookies-qty', 'noodles-qty',
        'sandwiches-qty', 'pasta-qty', 'salads-qty', 'coffee-tea-qty',
        'soft-drinks-qty', 'water-qty', 'juices-qty'
    ];

    const serviceHandlers = services.map(serviceId => handleCounter(serviceId));

    // Function to update the total cost of onboard services
    function updateOnboardServicesTotal() {
        const totalCost = serviceHandlers.reduce((sum, handler) => sum + handler.getTotalCost(), 0);
        const onboardServicesTotalElement = document.getElementById('onboard-services-total');
        
        if (onboardServicesTotalElement) {
            onboardServicesTotalElement.textContent = `$${totalCost}`;
        }

        // Store the onboard services total in sessionStorage for use on the payment page
        sessionStorage.setItem('onboardServicesTotal', totalCost);
    }

    // Continue to the next page (payment page)
    document.getElementById('Continue').addEventListener('click', function() {
        // Ensure the seat number is stored before continuing
        const seatNumber = sessionStorage.getItem('seatNumber');
        if (!seatNumber) {
            alert('Please confirm your seat selection before continuing.');
            return;
        }

        // Redirect to the payment page
        window.location.href = '../../cardDetails/html/cardDetails.html';  // Adjust this URL as needed
    });
});
