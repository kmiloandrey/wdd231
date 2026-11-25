// last modified time for footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

// Mobile menu toggle
const menuButton = document.querySelector('#menuButton');
const mainNav = document.querySelector('#mainNav');

if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

// Set current date and time when the form loads
const timestampField = document.getElementById("timestamp");
if (timestampField) {
    timestampField.value = new Date().toLocaleString();
}