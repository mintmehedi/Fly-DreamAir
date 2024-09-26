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
}// Assuming the rest of your functions are correctly set up and working

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dynamic ticket information when the page loads
    displayDynamicTicketInfo();

    // Setup event listeners for downloading the receipt and ticket
    const downloadReceiptBtn = document.getElementById('download-receipt');
    const downloadTicketBtn = document.getElementById('download-ticket');

    if (downloadReceiptBtn) {
        downloadReceiptBtn.addEventListener('click', function() {
            downloadReceipt();
        });
    }

    if (downloadTicketBtn) {
        downloadTicketBtn.addEventListener('click', function() {
            downloadTicket();
        });
    }
});

function downloadReceipt() {
    const content = document.querySelector('.receipt-details').innerText; // Fetching text from the receipt details displayed on the page
    const filename = "Receipt.txt"; // Setting a filename
    downloadFile(content, filename, 'text/plain'); // Calling the download function
}

function downloadTicket() {
    const content = document.querySelector('.ticket-details').innerText; // Fetching text from the ticket details displayed on the page
    const filename = "Ticket.txt"; // Setting a filename
    downloadFile(content, filename, 'text/plain'); // Calling the download function
}

function downloadFile(content, fileName, fileType) {
    const blob = new Blob([content], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
}
