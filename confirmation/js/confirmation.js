// Load flight details on page load
window.onload = function() {
    // Retrieve stored data from sessionStorage
    const flightData = JSON.parse(sessionStorage.getItem('flightData'));
    const flightFare = sessionStorage.getItem('flightFare');
    const departureTime = sessionStorage.getItem('departureTime');
    const returnTime = sessionStorage.getItem('returnTime');
    const tripType = flightData.tripType; // Get the trip type (round-trip or one-way)

    if (flightData && departureTime) {
        // Update the flight summary with the retrieved session data
        document.querySelector('.flight-summary .flight-details').innerHTML = `
            <p><strong>Departure:</strong> ${departureTime}</p>
        `;

        // Check if it's a round-trip or one-way
        if (tripType === 'round-trip' && returnTime) {
            // Display the return flight details for round-trip
            document.querySelector('.flight-summary .flight-details').innerHTML += `
                <p><strong>Return:</strong>${returnTime}</p>
            `;
        } else {
            // Hide the return flight section entirely for one-way
        }

        // Show the flight fare and date as normal
        document.querySelector('.flight-summary .flight-details').innerHTML += `
            <p><strong>Date:</strong> ${flightData.departDate}</p>
            <p><strong>Flight Price:</strong> $${flightFare}</p>
        `;
    } else {
        alert('No flight data found. Please go back and select your flight again.');
    }

    // Initialize payment instructions based on default method
    updatePaymentInstructions(document.getElementById('payment-method').value);
};

// Function to update payment instructions based on the selected method
function updatePaymentInstructions(paymentMethod) {
    const paymentInstructionsDiv = document.getElementById('payment-instructions');
    paymentInstructionsDiv.innerHTML = '';

    if (paymentMethod === 'credit-card') {
        paymentInstructionsDiv.innerHTML = `
            <label for="card-number">Card Number:</label>
            <input type="text" id="card-number" name="card-number" required>
            <label for="expiry-date">Expiry Date:</label>
            <input type="month" id="expiry-date" name="expiry-date" required>
            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" required>
        `;
    } else if (paymentMethod === 'paypal') {
        paymentInstructionsDiv.innerHTML = `
            <p>Please proceed to PayPal to complete your payment.</p>
            <button type="button" onclick="window.open('https://www.paypal.com')">Pay with PayPal</button>
        `;
    } else if (paymentMethod === 'bank-transfer') {
        paymentInstructionsDiv.innerHTML = `
            <p>Please transfer the total amount to the following bank account:</p>
            <p>Bank: FlyDream Bank<br>Account Number: 123-456-789<br>BSB: 123-456</p>
        `;
    }
}

// Handle form submission (confirmation)
document.getElementById('confirmation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get the full name from the form
    const fullName = document.getElementById('full-name').value;

    // Store the full name in sessionStorage
    sessionStorage.setItem('passengerName', fullName);

    // Get other form values (if needed)
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const passport = document.getElementById('passport').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Simple validation (for demonstration purposes)
    if (fullName && email && phone && passport) {
        alert(`Flight booked successfully!\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nPayment Method: ${paymentMethod}`);
        
        // Redirect to the next page after confirmation
        window.location.href = '../../seat&services/html/seat&service.html';  // Replace with the actual URL
    } else {
        alert('Please fill out all required fields.');
    }
});

