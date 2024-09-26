// Get the login form element
const loginForm = document.getElementById('login-form');

// Listen for form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // Reset previous error/success states
    resetValidation();

    let isValid = true;

    // Check if email is valid
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email.');
        isValid = false;
    }

    // Check if password is entered
    if (password === '') {
        showError('password', 'Please enter your password.');
        isValid = false;
    }

    // If all fields are valid
    if (isValid) {
        // Simulate successful login and redirect to homepage
        alert('Login successful! Redirecting to homepage...');
        window.location.href = '../../index.html'; // Redirect to homepage (replace with your actual path)
    }
});

// Real-time validation for email input
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', function() {
    if (validateEmail(emailInput.value)) {
        clearError('email');
    } else {
        showError('email', 'Please enter a valid email.');
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

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    return re.test(String(email).toLowerCase());
}
