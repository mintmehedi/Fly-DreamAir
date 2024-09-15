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
