// last modified time for footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

// Mobile menu toggle
if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

// places.mjs data display
import {places} from '../data/places.mjs'
console.log(places)

const showHere = document.querySelector("#allplaces")

function displayItems(places) {
    places.forEach(x => {

        const thecard = document.createElement('div')

        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.image}`
        thephoto.alt = x.name
        thecard.appendChild(thephoto)

        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)

        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        thecard.appendChild(theaddress)

        const thedescription = document.createElement('p')
        thedescription.innerText = x.description
        thecard.appendChild(thedescription)



        showHere.appendChild(thecard)
    })
}

displayItems(places)

//Visit message with localStorage

const visitMessage = document.querySelector("#visit-message");
const lastVisit = localStorage.getItem("lastVisit");
const today = Date.now();
const dayInMs = 1000 * 60 * 60 * 24;

if (!lastVisit) {
    visitMessage.innerText = "Welcome! Let us know if you have any questions.";
} else {
    const daysPassed = Math.floor((today - Number(lastVisit)) / dayInMs);

    if (daysPassed < 1) {
        visitMessage.innerText = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
        visitMessage.innerText = "You last visited 1 day ago.";
    } else {
        visitMessage.innerText = `You last visited ${daysPassed} days ago.`;
    }
}

localStorage.setItem("lastVisit", today);