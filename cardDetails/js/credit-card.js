document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the flight fare from sessionStorage
    const flightFare = sessionStorage.getItem('flightFare') || 'N/A';
    
    // Retrieve the onboard services total from sessionStorage
    const onboardServicesTotal = sessionStorage.getItem('onboardServicesTotal') || '0';

    // Update the flight fare in the purchase summary
    document.getElementById('flight-fare').textContent = `$${flightFare}`;
    
    // Update the onboard services cost in the purchase summary
    if (onboardServicesTotal === '0') {
        document.getElementById('onboard-services-cost').textContent = 'None';
    } else {
        document.getElementById('onboard-services-cost').textContent = `$${onboardServicesTotal}`;
    }

    // Calculate the total amount including taxes and services
    const taxes = 50;
    const totalAmount = parseFloat(flightFare) + parseFloat(onboardServicesTotal) + taxes;

    // Update the total amount in the purchase summary
    document.getElementById('total-amount').textContent = `$${totalAmount}`;
});

document.getElementById('credit-card-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting

    // Collect input values
    const cardName = document.getElementById('card-name').value.trim();  // Correct ID
    const cardNumber = document.getElementById('card-number').value.replace(/\s+/g, ''); // Remove spaces
    const expiryDate = document.getElementById('expiry-date').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const billingAddress = document.getElementById('billing-address').value.trim();

    // Validate the card number using the Luhn Algorithm
    if (!isValidCardNumber(cardNumber)) {
        alert('Invalid card number. Please check and try again.');
        return;
    }

    // Validate expiry date (MM/YY format)
    if (!isValidExpiryDate(expiryDate)) {
        alert('Invalid expiry date. Please use MM/YY format.');
        return;
    }

    // Ensure CVV is valid (3 digits)
    if (cvv.length !== 3 || isNaN(cvv)) {
        alert('Invalid CVV. It must be a 3-digit number.');
        return;
    }

    // Ensure all fields are filled in
    if (cardName && cardNumber && expiryDate && cvv && billingAddress) {
        alert('Payment processed successfully!\nThank you for booking with FlyDreamAir.');
        
        // Store the cardholder's name in sessionStorage
        sessionStorage.setItem('passengerName', cardName);

        // Redirect to the receipt page
        window.location.href = '../../receipt/html/receipt.html';
    } else {
        alert('Please fill out all required fields.');
    }
});

// Simple validation for credit card using the Luhn Algorithm
function isValidCardNumber(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Validate expiry date (MM/YY)
function isValidExpiryDate(expiryDate) {
    const match = expiryDate.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);  // Matches MM/YY format
    if (!match) return false;

    const month = parseInt(match[1]);
    const year = parseInt('20' + match[2]);

    const currentDate = new Date();
    const expiry = new Date(year, month);

    return expiry > currentDate;  // Ensure the expiry date is in the future
}

// Add automatic formatting for card number
document.getElementById('card-number').addEventListener('input', function(event) {
    const input = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const formattedCardNumber = input.match(/.{1,4}/g)?.join(' ') || input;
    event.target.value = formattedCardNumber;
});

// Automatically move to the next field after entering MM/YY for expiry date
document.getElementById('expiry-date').addEventListener('input', function(event) {
    const input = event.target.value.replace(/\//g, '').replace(/[^0-9]/g, '');

    if (input.length >= 2) {
        event.target.value = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
});
