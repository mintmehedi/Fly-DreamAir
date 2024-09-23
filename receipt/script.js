// Download Ticket button functionality
document.querySelector('.download-ticket-btn').addEventListener('click', function() {
    alert('Your ticket has been downloaded.');
    // Simulate downloading the ticket (in practice, you'd link to a real file or dynamically generate a PDF)
});

// Download Receipt button functionality
document.querySelector('.download-receipt-btn').addEventListener('click', function() {
    alert('Your receipt has been downloaded.');
    // Simulate downloading the receipt (in practice, you'd link to a real file or dynamically generate a PDF)
});

// Back to Main Menu button functionality
document.querySelector('.back-main-menu-btn').addEventListener('click', function() {
    window.location.href = "main-menu.html";  // Replace with your actual main menu URL
});

// Simulate ticket information (you can replace this with real data)
const flightData = {
    flight: 'Sydney (SYD) ➔ Melbourne (MEL)',
    date: '25th September 2024',
    departureTime: '08:15 AM',
    class: 'Economy',
    passengerName: 'John Doe',
    seatNumber: '12A',
    bookingReference: 'ABC1234',
    flightFare: 230,
    taxesFees: 50,
    foodDrinks: 20,
    totalPaid: 300,
    paymentMethod: 'Credit Card',
    transactionId: 'TXN987654321'
};

// Function to display ticket and receipt information
function displayTicketInfo() {
    document.querySelector('.ticket-details').innerHTML = `
        <p><strong>Flight:</strong> ${flightData.flight}</p>
        <p><strong>Date:</strong> ${flightData.date}</p>
        <p><strong>Departure Time:</strong> ${flightData.departureTime}</p>
        <p><strong>Class:</strong> ${flightData.class}</p>
        <p><strong>Passenger Name:</strong> ${flightData.passengerName}</p>
        <p><strong>Seat Number:</strong> ${flightData.seatNumber}</p>
        <p><strong>Booking Reference:</strong> ${flightData.bookingReference}</p>
    `;

    document.querySelector('.receipt-details').innerHTML = `
        <p><strong>Flight Fare:</strong> $${flightData.flightFare}</p>
        <p><strong>Taxes & Fees:</strong> $${flightData.taxesFees}</p>
        <p><strong>Food & Drinks:</strong> $${flightData.foodDrinks}</p>
        <p><strong>Total Paid:</strong> $${flightData.totalPaid}</p>
        <p><strong>Payment Method:</strong> ${flightData.paymentMethod}</p>
        <p><strong>Transaction ID:</strong> ${flightData.transactionId}</p>
    `;
}

// Initialize the ticket information when the page loads
document.addEventListener('DOMContentLoaded', displayTicketInfo);
