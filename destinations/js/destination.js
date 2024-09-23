document.addEventListener("DOMContentLoaded", () => {
    const filter = document.getElementById("filter");
    const destinationCards = document.querySelectorAll(".destination-card");

    filter.addEventListener("change", function () {
        const filterValue = this.value;

        destinationCards.forEach((card) => {
            const type = card.getAttribute("data-type");
            
            if (filterValue === "all" || type === filterValue) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});
