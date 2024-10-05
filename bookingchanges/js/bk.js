document.addEventListener('DOMContentLoaded', function () {
    const seatGrid = document.getElementById('seat-grid');
    const confirmSeatNumber = document.getElementById('confirm-seat-number');
    const confirmButton = document.getElementById('confirm-button');
    const currentSeatElement = document.getElementById('current-seat-number'); // Current seat display in confirmation box
    let selectedSeat = null;

    // Retrieve passenger data from session storage
    const passengerName = getPassengerName();
    const email = getPassengerEmail();
    const phoneNumber = getPassengerPhone();
    let currentSeat = getSeatNumber(); // Retrieve the seat number from session storage

    // Display the current seat number in the confirmation box if available
    if (currentSeat) {
        currentSeatElement.textContent = currentSeat;
    }

    // Populate passenger information fields
    populatePassengerInfo(passengerName, email, phoneNumber);

    // Fetch seat layout and availability data from data.json
    fetch('../data/data.json')
        .then(response => response.json())
        .then(seatData => {
            generateSeatLayout(seatData, currentSeat); // Generate seat layout with the current seat highlighted
        })
        .catch(error => console.error('Error loading seat data:', error));

    // Function to generate the seat layout with correct seat labels
    function generateSeatLayout(seatData, currentSeat) {
        const rows = 10;
        const columns1And3 = ['A', 'B']; // For 1st column (two seats per row)
        const columns2 = ['D', 'E', 'F']; // For 2nd column (three seats per row)
        const columns3 = ['H', 'J']; // For 3rd column (two seats per row with distinct labels)

        for (let row = 1; row <= rows; row++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('seat-row');

            // Create seat groups: 1st column
            createSeatGroup(row, columns1And3, rowDiv, seatData, currentSeat);
            rowDiv.appendChild(createAisle());

            // Create seat groups: 2nd column (middle)
            createSeatGroup(row, columns2, rowDiv, seatData, currentSeat);
            rowDiv.appendChild(createAisle());

            // Create seat groups: 3rd column with distinct labels
            createSeatGroup(row, columns3, rowDiv, seatData, currentSeat);

            seatGrid.appendChild(rowDiv);

            // Add a gap after every 5th row
            if (row % 5 === 0) {
                const gapDiv = document.createElement('div');
                gapDiv.classList.add('row-gap');
                seatGrid.appendChild(gapDiv);
            }
        }
    }

    // Function to create individual seat groups and highlight current seat
    function createSeatGroup(row, columns, rowDiv, seatData, currentSeat) {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('seat-group');
        columns.forEach(column => {
            const seatNumber = `${row}${column}`;
            const seatStatus = seatData.find(seat => seat.seatNumber === seatNumber)?.availability;

            // Create the seat button element
            const seatButton = document.createElement('button');
            seatButton.classList.add('seat');
            seatButton.textContent = seatNumber;

            // Apply styles for available, booked, or current seats
            if (seatStatus) {
                seatButton.classList.add('available');
            } else {
                seatButton.classList.add('booked');
                seatButton.disabled = true; // Disable booked seats
            }

            // Highlight the current seat with a special class
            if (seatNumber === currentSeat) {
                seatButton.classList.add('current-seat');
            }

            // Add click event for available seats
            seatButton.addEventListener('click', function () {
                if (selectedSeat) {
                    selectedSeat.classList.remove('selected');
                }
                seatButton.classList.add('selected');
                selectedSeat = seatButton;

                // Update confirmation box
                confirmSeatNumber.textContent = seatNumber;
                confirmButton.disabled = false; // Enable confirm button
            });

            groupDiv.appendChild(seatButton);
        });
        rowDiv.appendChild(groupDiv);
    }

    // Create aisle element
    function createAisle() {
        const aisleDiv = document.createElement('div');
        aisleDiv.classList.add('aisle');
        return aisleDiv;
    }

    // Function to populate the passenger information fields using session storage data
    function populatePassengerInfo(name, email, phone) {
        document.getElementById('passenger-name').value = name || 'N/A';
        document.getElementById('email').value = email || 'N/A';
        document.getElementById('phone').value = phone || 'N/A';
    }

    // Function to get the passenger name from sessionStorage
    function getPassengerName() {
        return sessionStorage.getItem('passengerName') || 'John Doe';  // Default name if not found
    }

    // Function to get the passenger email from sessionStorage
    function getPassengerEmail() {
        return sessionStorage.getItem('email') || 'example@example.com';  // Default email if not found
    }

    // Function to get the passenger phone number from sessionStorage
    function getPassengerPhone() {
        return sessionStorage.getItem('phone') || 'N/A';  // Default phone number if not found
    }

    // Function to get the seat number from sessionStorage
    function getSeatNumber() {
        return sessionStorage.getItem('seatNumber') || 'N/A';  // Return 'N/A' if no seat number is found
    }

    // Sidebar Navigation Click Events
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const contentSections = document.querySelectorAll('.content-section');

    sidebarItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            sidebarItems.forEach(el => el.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            item.classList.add('active');
            contentSections[index].classList.add('active');
        });
    });

    // Set initial active section
    document.getElementById('seat-modification-tab').classList.add('active');
    document.getElementById('seat-modification-section').classList.add('active');
});

document.addEventListener('DOMContentLoaded', function () {
    // Modal Elements
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeBtn = document.querySelector('.close-btn');
    const okBtn = document.getElementById('modal-ok-btn');

    // Function to Show Modal with Message
    function showModal(message, callback) {
        modalMessage.textContent = message; // Set the message
        modal.style.display = 'block'; // Show the modal

        // Close Modal when clicking on 'OK' or 'X'
        okBtn.onclick = closeBtn.onclick = function () {
            modal.style.display = 'none';
            if (callback) callback();
        };
    }

    // Event Listener for Seat Change Confirmation
    document.getElementById('confirm-button').addEventListener('click', function () {
        showModal('Your seat has been changed successfully!', function () {
            // Optionally reset the selection state here
        });
    });

    // Event Listener for Saving Personal Details
    document.querySelector('.save-button').addEventListener('click', function () {
        showModal('Personal details updated successfully.');
    });

    // Event Listener for Cancel Flight
    document.querySelector('.cancel-button').addEventListener('click', function () {
        showModal('Your flight has been cancelled. You will receive a refund in 2-3 business days.', function () {
            // Redirect to homepage after confirmation
            window.location.href = '../../index.html';
        });
    });
});
