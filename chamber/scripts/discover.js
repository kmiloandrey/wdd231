// last modified time for footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

// Mobile menu toggle
if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
        mainNav.classList.toggle("open");
    });
}

import { places } from '../data/places.mjs'
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