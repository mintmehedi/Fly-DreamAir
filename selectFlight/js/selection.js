document.getElementById('help-link').addEventListener('click', function() {
    window.location.href = '../../help/html/help.html';
});

document.getElementById('sign-up').addEventListener('click', function() {
    window.location.href = '../../signup/html/signup.html';
});

document.getElementById('sign-in').addEventListener('click', function() {
    window.location.href = '../../login/html/login.html';
});

document.getElementById('home').addEventListener('click', function() {
    window.location.href = '/index.html';
});

// Select all buttons with the class 'select-btn' and add an event listener to each
document.querySelectorAll('.select-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Get the parent flight card of the clicked button
        const flightCard = this.closest('.flight-card');
        
        // Extract the flight price, departure time, and return time from the flight card
        const flightPrice = flightCard.getAttribute('data-price');
        const departureTime = flightCard.querySelectorAll('.flight-time')[0].textContent;
        const returnTime = flightCard.querySelectorAll('.flight-time')[1].textContent;
        
        // Store the flight details (including times) in sessionStorage
        sessionStorage.setItem('flightFare', flightPrice);
        sessionStorage.setItem('departureTime', departureTime);
        sessionStorage.setItem('returnTime', returnTime);
        
        // Redirect to the seat and service page
        window.location.href = '../../confirmation/html/confirmation.html';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const departureDate = document.getElementById("departure-date");
    const returnDate = document.getElementById("return-date");
    const errorMessage = document.createElement('div');
    document.querySelector(".date-selection").appendChild(errorMessage);
    errorMessage.id = "error-message";
    const flightCards = document.querySelectorAll(".flight-card");
    const selectedFlightDisplay = document.createElement('div');
    document.querySelector(".results").insertBefore(selectedFlightDisplay, document.querySelector(".show-more-results-btn"));
    selectedFlightDisplay.id = "selected-flight";
    let selectedFlightDetails = null;

    // Date Validation Logic
    const validateDates = () => {
        const departureValue = new Date(departureDate.value);
        const returnValue = new Date(returnDate.value);

        if (returnDate.value && returnValue < departureValue) {
            errorMessage.textContent = "Return date cannot be earlier than the departure date.";
            errorMessage.style.color = "red";
        } else {
            errorMessage.textContent = "";
        }
    };

    departureDate.addEventListener("change", validateDates);
    returnDate.addEventListener("change", validateDates);

    const selectFlight = (event) => {
        flightCards.forEach(card => card.classList.remove("selected"));
        const selectedCard = event.currentTarget;
        selectedCard.classList.add("selected");

        selectedFlightDetails = selectedCard.querySelector(".flight-time").textContent;
        const flightPrice = selectedCard.querySelector(".flight-price div").textContent;
        selectedFlightDisplay.textContent = `Selected Flight: ${selectedFlightDetails}, Price: ${flightPrice}`;
        selectedFlightDisplay.style.fontWeight = "bold";
        selectedFlightDisplay.style.marginTop = "20px";
    };

    flightCards.forEach(card => {
        card.addEventListener("click", selectFlight);
    });

    const confirmBtns = document.querySelectorAll(".select-btn");
    confirmBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (selectedFlightDetails) {
                window.location.href = "../../seat&services/html/seat&service.html";
            } else {
                alert("Please select a flight before confirming.");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const fromCity = urlParams.get('from');
    const toCity = urlParams.get('to');
    const departDate = urlParams.get('departDate');
    const returnDate = urlParams.get('returnDate');
    const tripType = urlParams.get('tripType');

    const flightCards = document.querySelectorAll('.flight-card');
    
    flightCards.forEach(card => {
        const flightTimeElements = card.querySelectorAll('.flight-time');

        if (tripType === 'one-way') {
            flightTimeElements.forEach((element, index) => {
                if (index === 0) {
                    const originalText = element.textContent;
                    const updatedText = originalText.replace(/SYD/g, fromCity).replace(/MEL/g, toCity);
                    element.textContent = updatedText;
                } else {
                    element.style.display = 'none';
                }
            });
        } else {
            flightTimeElements.forEach(element => {
                const originalText = element.textContent;
                const updatedText = originalText.replace(/SYD/g, fromCity).replace(/MEL/g, toCity);
                element.textContent = updatedText;
            });
        }
    });
});
