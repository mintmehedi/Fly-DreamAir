// Function to retrieve flight data from sessionStorage
function getFlightData() {
    const flightData = sessionStorage.getItem('flightData');
    return flightData ? JSON.parse(flightData) : null;
}

// Function to retrieve passenger name from sessionStorage
function getPassengerName() {
    const passengerName = sessionStorage.getItem('passengerName');
    return passengerName || 'John Doe';  // Default name if not found
}

// Function to retrieve seat number from sessionStorage
function getSeatNumber() {
    return sessionStorage.getItem('seatNumber') || 'N/A';  // Return 'N/A' if no seat number is found
}

// Function to retrieve flight fare from sessionStorage
function getFlightFare() {
    return sessionStorage.getItem('flightFare') || 'N/A';
}

// Function to retrieve onboard services total from sessionStorage
function getOnboardServicesTotal() {
    return sessionStorage.getItem('onboardServicesTotal') || '0';
}

// Function to display dynamic flight details on the receipt page
function displayDynamicTicketInfo() {
    const flightDetails = getFlightData();
    const passengerName = getPassengerName();  // Retrieve the passenger's name
    const seatNumber = getSeatNumber();  // Retrieve the seat number
    const flightFare = getFlightFare();  // Retrieve the flight fare
    const onboardServicesTotal = getOnboardServicesTotal();  // Retrieve the onboard services total

    // Static tax amount (if it's a constant)
    const taxes = 50;
    const totalPaid = parseFloat(flightFare) + parseFloat(onboardServicesTotal) + taxes;

    if (!flightDetails) {
        alert('No flight data found. Please start your booking process again.');
        return;
    }

    const flightRoute = `${flightDetails.fromCity} ➔ ${flightDetails.toCity}`;
    
    // Update the ticket details with dynamic data
    document.querySelector('.ticket-details').innerHTML = `
        <p><strong>Flight:</strong> ${flightRoute}</p>
        <p><strong>Date:</strong> ${flightDetails.departDate}</p> <!-- Dynamic departure date -->
        <p><strong>Class:</strong> Economy</p>
        <p><strong>Passenger Name:</strong> ${passengerName}</p> <!-- Dynamic passenger name -->
        <p><strong>Seat Number:</strong> ${seatNumber}</p> <!-- Dynamic seat number -->
        <p><strong>Booking Reference:</strong> AJF5012464</p>
    `;

    // Update the receipt details with dynamic flight and onboard services data
    document.querySelector('.receipt-details').innerHTML = `
        <p><strong>Flight Fare:</strong> $${flightFare}</p>
        <p><strong>Taxes & Fees:</strong> $${taxes}</p>
        <p><strong>Food & Drinks:</strong> $${onboardServicesTotal}</p> <!-- Dynamic onboard services total -->
        <p><strong>Total Paid:</strong> $${totalPaid.toFixed(2)}</p> <!-- Dynamic total paid -->
        <p><strong>Payment Method:</strong> Credit Card</p>
        <p><strong>Transaction ID:</strong> TXN987654321</p>
    `;
}

// Initialize the dynamic ticket information when the page loads
document.addEventListener('DOMContentLoaded', displayDynamicTicketInfo);
