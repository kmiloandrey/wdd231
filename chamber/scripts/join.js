// last modified time for footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;


document.addEventListener("DOMContentLoaded", () => {
    // Set hidden timestamp field to the exact date and time
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    // Open the matching modal when clicking "Learn More"
    const modalLinks = document.querySelectorAll(".learn-more-btn");
    modalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const modalId = link.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close the modal when clicking the "X"
    const closeButtons = document.querySelectorAll(".close-modal");
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // Close the modal when clicking outside the dialog box
    const modals = document.querySelectorAll(".membership-modal");
    modals.forEach((modal) => {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.close();
            }
        });
    });
});