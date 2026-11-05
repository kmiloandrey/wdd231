/* last modified time for footer */
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

// 1. Paths & Selectors (Declared at the top)
const jsonPath = "data/members.json";
const cardsContainer = document.querySelector("#cards");
const gridBtn = document.querySelector("#gridBtn");
const listBtn = document.querySelector("#listBtn");
const menuButton = document.querySelector("#menuButton");
const mainNav = document.querySelector("#mainNav");

// Map numeric membership levels to readable text strings
const membershipMap = {
    1: "Silver",
    2: "Gold",
    3: "Platinum"
};

// 3. Grid vs List View Toggle Controls
if (gridBtn && listBtn && cardsContainer) {
    gridBtn.addEventListener("click", () => {
        cardsContainer.className = "grid-view";
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        cardsContainer.className = "list-view";
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}

// 4. Fetch Member JSON Data Runtime
async function getMemberData() {
    try {
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        if (cardsContainer) {
            cardsContainer.innerHTML = `<p class="error-msg">Failed to load directory data. Please try again later.</p>`;
        }
    }
}

// 5. Render Data elements onto section components (UPDATED FOR WIREFRAME DESIGN)
const displayMembers = (members) => {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = ""; // Clear existing content

    members.forEach((member) => {
        // Create the base card wrapper
        let card = document.createElement("section");
        card.className = `member-card level-${member.membershipLevel}`;

        // Get the readable membership label text string
        const levelText = membershipMap[member.membershipLevel] || "Member";

        // 1. Create the edge-to-edge header area layout elements
        let topHeader = document.createElement("div");
        topHeader.className = "card-top-header";

        let name = document.createElement("h3");
        name.textContent = member.name;

        let levelLabel = document.createElement("p");
        levelLabel.className = "membership-level";
        levelLabel.textContent = `${levelText} Member`;

        topHeader.appendChild(name);
        topHeader.appendChild(levelLabel);

        // 2. Create the lower structural container holding image left, text fields right
        let detailsContainer = document.createElement("div");
        detailsContainer.className = "member-details";

        let image = document.createElement("img");
        image.setAttribute("src", `images/${member.image}`);
        image.setAttribute("alt", `Logo of ${member.name}`);
        image.setAttribute("loading", "lazy");

        // Textual metrics right wrapper container
        let infoFieldsWrapper = document.createElement("div");
        infoFieldsWrapper.className = "info-fields-wrapper";

        let address = document.createElement("p");
        address.className = "address";
        address.textContent = member.address;

        let phone = document.createElement("p");
        phone.className = "phone";
        phone.textContent = member.phoneNumber;

        let websiteParagraph = document.createElement("p");
        websiteParagraph.className = "website";

        let websiteLink = document.createElement("a");
        websiteLink.setAttribute("href", member.websiteUrl);
        websiteLink.setAttribute("target", "_blank");
        websiteLink.setAttribute("rel", "noopener noreferrer");
        // Strips "https://" off visually to keep it clean matching the picture style
        websiteLink.textContent = member.websiteUrl.replace("https://", "");

        websiteParagraph.appendChild(websiteLink);

        // Assemble the informational text fields side
        infoFieldsWrapper.appendChild(address);
        infoFieldsWrapper.appendChild(phone);
        infoFieldsWrapper.appendChild(websiteParagraph);

        // Assemble the dynamic layout panels inside details box
        detailsContainer.appendChild(image);
        detailsContainer.appendChild(infoFieldsWrapper);

        // Assemble components onto the main structural card section element
        card.appendChild(topHeader);
        card.appendChild(detailsContainer);

        // Render card container onto the DOM viewport
        cardsContainer.appendChild(card);
    });
};


// 7. Initialize script execution
getMemberData();