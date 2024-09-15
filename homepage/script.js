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
