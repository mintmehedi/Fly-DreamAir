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
    let selectedFlightDetails = null;  // Store selected flight details

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

    // Add event listeners for validating dates
    departureDate.addEventListener("change", validateDates);
    returnDate.addEventListener("change", validateDates);

    // Flight selection handler
    const selectFlight = (event) => {
        // Clear previous selections
        flightCards.forEach(card => card.classList.remove("selected"));

        // Mark the clicked flight as selected
        const selectedCard = event.currentTarget;
        selectedCard.classList.add("selected");

        // Extract and display selected flight details
        selectedFlightDetails = selectedCard.querySelector(".flight-time").textContent;
        const flightPrice = selectedCard.querySelector(".flight-price div").textContent;
        selectedFlightDisplay.textContent = `Selected Flight: ${selectedFlightDetails}, Price: ${flightPrice}`;
        selectedFlightDisplay.style.fontWeight = "bold";
        selectedFlightDisplay.style.marginTop = "20px";
    };

    // Attach event listeners to flight cards for selection
    flightCards.forEach(card => {
        card.addEventListener("click", selectFlight);
    });

    // Handle the confirm button click and redirect
    const confirmBtns = document.querySelectorAll(".select-btn");
    confirmBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if (selectedFlightDetails) {
                window.location.href = "file:///Users/tabibkamal/Desktop/214%20grp%20project/booking%20confirmation/4.html";  // Replace with your actual confirmation page URL
            } else {
                alert("Please select a flight before confirming.");
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const fromCity = urlParams.get('from');
    const toCity = urlParams.get('to');
    const departDate = urlParams.get('departDate');
    const returnDate = urlParams.get('returnDate');
    const tripType = urlParams.get('tripType');  // one-way or round-trip

    // Select all flight cards
    const flightCards = document.querySelectorAll('.flight-card');
    
    // Iterate through each flight card and update the flight details dynamically
    flightCards.forEach(card => {
        const flightTimeElements = card.querySelectorAll('.flight-time');

        // If it's a one-way trip, update only the departure information
        if (tripType === 'one-way') {
            flightTimeElements.forEach((element, index) => {
                if (index === 0) {
                    // Update departure flight
                    const originalText = element.textContent;  
                    const updatedText = originalText.replace(/SYD/g, fromCity).replace(/MEL/g, toCity);
                    element.textContent = updatedText;
                } else {
                    // Hide the return flight (since it's one-way)
                    element.style.display = 'none';
                }
            });
        } else {
            // If it's a round-trip, update both departure and return flights
            flightTimeElements.forEach(element => {
                const originalText = element.textContent;
                const updatedText = originalText.replace(/SYD/g, fromCity).replace(/MEL/g, toCity);
                element.textContent = updatedText;
            });
        }
    });
});



