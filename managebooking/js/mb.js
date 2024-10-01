document.addEventListener('DOMContentLoaded', function() {
    // Button to trigger redirect
    const continueButton = document.getElementById('continueBtn');

    // Redirect user to the booking changes page when the button is clicked
    if (continueButton) {
        continueButton.addEventListener('click', function() {
            window.location.href = '../../bookingchanges/html/bk.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const continueButton = document.querySelector('.continue-button');
    const inputs = document.querySelectorAll('.booking-input');
    const formContainer = document.querySelector('.manage-booking-container');

    // Disable the continue button initially
    continueButton.disabled = true;

    // Function to check if all inputs are filled
    function checkInputs() {
        let allFilled = true;
        inputs.forEach(input => {
            if (input.value.trim() === "") {
                allFilled = false;
            }
        });
        continueButton.disabled = !allFilled;
    }

    // Add event listeners to each input for real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', checkInputs);

        // Add focus effect to input fields
        input.addEventListener('focus', function() {
            input.classList.add('input-focus');
        });

        // Remove focus effect when input loses focus
        input.addEventListener('blur', function() {
            input.classList.remove('input-focus');
        });
    });

    // Add a brief loading effect on clicking "Continue"
    continueButton.addEventListener('click', function() {
        continueButton.innerHTML = 'Processing...';
        continueButton.disabled = true;

        // Simulate a small delay (e.g., 2 seconds) before submission
        setTimeout(() => {
            alert("Booking details submitted!");
            continueButton.innerHTML = 'Continue';
            continueButton.disabled = false;
        }, 2000);
    });
});