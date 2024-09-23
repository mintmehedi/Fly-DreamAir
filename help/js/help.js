document.addEventListener("DOMContentLoaded", () => {
    // FAQ Toggle
    const faqItems = document.querySelectorAll(".faq-item h3");

    faqItems.forEach((item) => {
        item.addEventListener("click", () => {
            const answer = item.nextElementSibling;
            answer.classList.toggle("visible");

            if (answer.classList.contains("visible")) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = "0";
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector(".contact-form form");
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent the form from submitting
        
        // Simulate form submission (you would typically send this data to a server)
        const successMessage = document.createElement("p");
        successMessage.textContent = "Thank you for reaching out. We'll get back to you soon!";
        successMessage.style.color = "green";
        successMessage.style.marginTop = "20px";
        
        contactForm.parentElement.appendChild(successMessage);
        
        // Clear the form fields
        contactForm.reset();
    });
});
