document.getElementById('our-destinations').addEventListener('click', function() {
    window.location.href = '../destinations/html/destination.html';
});

document.getElementById('help-link').addEventListener('click', function() {
    window.location.href = '../../help/html/help.html';
});

document.getElementById('mb').addEventListener('click', function() {
    window.location.href = '../../manageBooking/html/mb.html';
});

document.getElementById('sign-up').addEventListener('click', function() {
    window.location.href = '../../signup/html/signup.html';
});

document.getElementById('sign-in').addEventListener('click', function() {
    window.location.href = '../../login/html/login.html';
});

// JS for handling round trip and one way functionality
document.querySelectorAll('input[name="trip"]').forEach((radio) => {
    radio.addEventListener('change', function() {
        const returnDate = document.getElementById('return-date');
        if (this.value === 'one-way') {
            returnDate.style.display = 'none';
        } else {
            returnDate.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.search-button button').addEventListener('click', function() {
        // Capture user inputs from the form
        const fromCity = document.getElementById('from').value;
        const toCity = document.getElementById('to').value;
        const departDate = document.getElementById('depart-date').value;
        const returnDate = document.getElementById('return-date-input').value;
        const adults = document.getElementById('adult-count').textContent;
        const children = document.getElementById('child-count').textContent;
        const infants = document.getElementById('infant-count').textContent;

        // Check if user selected "Round Trip" or "One Way"
        const tripType = document.querySelector('input[name="trip"]:checked').value;  // round-trip or one-way

        // Validate that all necessary fields are filled
        if (!fromCity || !toCity || !departDate || !adults) {
            alert('Please fill in all required fields.');
            return;
        }

        // Store the data in sessionStorage for use in the receipt page
        sessionStorage.setItem('flightData', JSON.stringify({
            fromCity,
            toCity,
            departDate,
            returnDate,
            adults,
            children,
            infants,
            tripType
        }));

        // Prepare the URL for the selection page
        let url = `../../selectFlight/html/selection.html?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&departDate=${encodeURIComponent(departDate)}&adults=${encodeURIComponent(adults)}&children=${encodeURIComponent(children)}&infants=${encodeURIComponent(infants)}&tripType=${encodeURIComponent(tripType)}`;

        // Add return date to the URL only if it's a round-trip
        if (tripType === 'round-trip' && returnDate) {
            url += `&returnDate=${encodeURIComponent(returnDate)}`;
        }

        // Redirect to the selection page with the query parameters
        window.location.href = url;
    });
});

const API_KEY = '22b4e4afb0msh1b63950228bc573p112f40jsne871eaa81fdc';  // Your RapidAPI key

// Function to fetch city suggestions from the GeoDB Cities API
async function fetchCitySuggestions(query) {
    const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        }
    });
    const data = await response.json();
    return data.data.map(city => city.city);  // Returns an array of city names
}

// Function to display suggestions in the dropdown
function showSuggestions(inputElement, suggestionElement, suggestions) {
    suggestionElement.innerHTML = '';  // Clear previous suggestions
    if (suggestions.length > 0) {
        suggestionElement.style.display = 'block';  // Show the dropdown when there are suggestions
        suggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            li.addEventListener('click', () => {
                inputElement.value = suggestion;  // Set input value to selected suggestion
                suggestionElement.innerHTML = '';  // Clear suggestions once selected
                suggestionElement.style.display = 'none';  // Hide the dropdown after selection
            });
            suggestionElement.appendChild(li);
        });
    } else {
        suggestionElement.style.display = 'none';  // Hide the dropdown when no suggestions
    }
}

// Add event listeners for "From" and "To" inputs
document.addEventListener('DOMContentLoaded', function() {
    const fromInput = document.getElementById('from');
    const fromSuggestions = document.getElementById('from-suggestions');
    const toInput = document.getElementById('to');
    const toSuggestions = document.getElementById('to-suggestions');

    // Event listeners for input focus to hide the other dropdown
    fromInput.addEventListener('focus', function() {
        toSuggestions.innerHTML = '';  // Clear "to" suggestions when focusing on "from"
        toSuggestions.style.display = 'none';  // Hide the "to" dropdown
    });

    toInput.addEventListener('focus', function() {
        fromSuggestions.innerHTML = '';  // Clear "from" suggestions when focusing on "to"
        fromSuggestions.style.display = 'none';  // Hide the "from" dropdown
    });

    // Add event listeners for input and suggestions
    fromInput.addEventListener('input', async function() {
        const query = fromInput.value;
        if (query.length >= 2) {
            const suggestions = await fetchCitySuggestions(query);
            showSuggestions(fromInput, fromSuggestions, suggestions);
        } else {
            fromSuggestions.innerHTML = '';
        }
    });

    toInput.addEventListener('input', async function() {
        const query = toInput.value;
        if (query.length >= 2) {
            const suggestions = await fetchCitySuggestions(query);
            showSuggestions(toInput, toSuggestions, suggestions);
        } else {
            toSuggestions.innerHTML = '';
        }
    });

    // Hide suggestions when clicking outside of the input or suggestions
    document.addEventListener('click', function(event) {
        if (!fromInput.contains(event.target) && !fromSuggestions.contains(event.target)) {
            fromSuggestions.innerHTML = '';  // Hide "from" suggestions if clicked outside
            fromSuggestions.style.display = 'none';
        }
        if (!toInput.contains(event.target) && !toSuggestions.contains(event.target)) {
            toSuggestions.innerHTML = '';  // Hide "to" suggestions if clicked outside
            toSuggestions.style.display = 'none';
        }
    });
});

// JS for passenger counter
let adultCount = 1;
let childCount = 0;
let infantCount = 0;

document.getElementById('adult-plus').addEventListener('click', function() {
    adultCount++;
    document.getElementById('adult-count').textContent = adultCount;
});

document.getElementById('adult-minus').addEventListener('click', function() {
    if (adultCount > 1) {
        adultCount--;
        document.getElementById('adult-count').textContent = adultCount;
    }
});

document.getElementById('child-plus').addEventListener('click', function() {
    childCount++;
    document.getElementById('child-count').textContent = childCount;
});

document.getElementById('child-minus').addEventListener('click', function() {
    if (childCount > 0) {
        childCount--;
        document.getElementById('child-count').textContent = childCount;
    }
});

document.getElementById('infant-plus').addEventListener('click', function() {
    infantCount++;
    document.getElementById('infant-count').textContent = infantCount;
});

document.getElementById('infant-minus').addEventListener('click', function() {
    if (infantCount > 0) {
        infantCount--;
        document.getElementById('infant-count').textContent = infantCount;
    }
});

// Carousel Sliding Functionality
const slide = document.querySelector('.carousel-slide');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const items = document.querySelectorAll('.carousel-item');

let currentIndex = 0;
const totalItems = items.length;
const visibleItems = 3; // Number of items visible at a time
const itemWidth = items[0].offsetWidth + 20; // Item width + margin

rightArrow.addEventListener('click', () => {
    if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the beginning
    }
    updateCarouselPosition();
});

leftArrow.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - visibleItems; // Loop to the end
    }
    updateCarouselPosition();
});

function updateCarouselPosition() {
    slide.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}
