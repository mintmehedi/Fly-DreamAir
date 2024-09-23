// JavaScript to handle the confirmation process

// Mock data for flight selection (you can replace this with dynamic data)
const selectedFlight = {
    departureFlight: 'SYD 8:15 AM ➔ MEL 9:50 AM',
    returnFlight: 'MEL 4:30 PM ➔ SYD 6:10 AM',
    flightDate: '25th September 2024',
    price: 230
};

// Load flight details on page load
window.onload = function() {
    // Update the flight summary details
    document.getElementById('departure-flight').innerText = selectedFlight.departureFlight;
    document.getElementById('return-flight').innerText = selectedFlight.returnFlight;
    document.getElementById('flight-date').innerText = selectedFlight.flightDate;
    document.getElementById('flight-price').innerText = selectedFlight.price;

    // Initialize payment instructions based on default method
    updatePaymentInstructions(document.getElementById('payment-method').value);
};

// Update payment instructions based on the selected method
document.getElementById('payment-method').addEventListener('change', function(event) {
    updatePaymentInstructions(event.target.value);
});

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

    // Get all the form values
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const passport = document.getElementById('passport').value;
    const paymentMethod = document.getElementById('payment-method').value;

    // Simple validation (for demonstration purposes)
    if (fullName && email && phone && passport) {
        alert(`Flight booked successfully!\n\nFull Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nPayment Method: ${paymentMethod}`);
        
        // Redirect to Payment Success page after confirmation
        window.location.href = 'file:///Users/tabibkamal/Desktop/214%20grp%20project/seat&services/html/seat&service.html';  // Replace with the actual URL of your payment success page
    } else {
         alert('Please fill out all required fields.');
    }
});
