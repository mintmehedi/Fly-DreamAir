// Get the form element
const form = document.getElementById('registration-form');

// Listen for form submission
form.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    // Reset previous error/success states
    resetValidation();

    let isValid = true;

    // Check if passwords match
    if (password !== confirmPassword) {
        showError('confirm-password', 'Passwords do not match.');
        isValid = false;
    }

    // Check if terms are agreed
    if (!terms) {
        alert('You must agree to the terms of services and privacy policy.');
        isValid = false;
    }

    // If all fields are valid
    if (isValid) {
        // Show a success message (can replace this with an actual page navigation later)
        alert('Registration successful! Navigating to homepage...');
        window.location.href = '../../index.html';
    }
});

// Real-time validation for password matching
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');

confirmPasswordInput.addEventListener('input', function() {
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError('confirm-password', 'Passwords do not match.');
    } else {
        clearError('confirm-password');
    }
});

// Helper function to show error message and add visual feedback
function showError(fieldId, message) {
    const inputField = document.getElementById(fieldId);
    inputField.style.borderColor = 'red';

    let errorElem = inputField.nextElementSibling;
    if (!errorElem || !errorElem.classList.contains('error-message')) {
        errorElem = document.createElement('span');
        errorElem.classList.add('error-message');
        inputField.parentNode.appendChild(errorElem);
    }
    errorElem.textContent = message;
}

// Helper function to clear error message and reset visual feedback
function clearError(fieldId) {
    const inputField = document.getElementById(fieldId);
    inputField.style.borderColor = '';

    const errorElem = inputField.nextElementSibling;
    if (errorElem && errorElem.classList.contains('error-message')) {
        errorElem.remove();
    }
}

// Helper function to reset all validation styles and messages
function resetValidation() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(error) {
        error.remove();
    });

    const inputFields = document.querySelectorAll('input');
    inputFields.forEach(function(input) {
        input.style.borderColor = '';
    });
}
