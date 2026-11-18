// last modified time for footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;


document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.getElementById("submissionResults");
    if (!resultsContainer) return;

    const params = new URLSearchParams(window.location.search);

    const firstName = params.get("firstName") || "Not provided";
    const lastName = params.get("lastName") || "Not provided";
    const orgTitle = params.get("orgTitle") || "Not provided";
    const email = params.get("email") || "Not provided";
    const phone = params.get("phone") || "Not provided";
    const organization = params.get("organization") || "Not provided";
    const membershipCode = params.get("membershipLevel") || "";
    const description = params.get("description") || "Not provided";
    const rawTimestamp = params.get("timestamp");

    // Map membership value codes to readable labels
    const membershipLabels = {
        np: "NP Membership (Non-Profit - No Fee)",
        bronze: "Bronze Membership ($50/year)",
        silver: "Silver Membership ($100/year)",
        gold: "Gold Membership ($150/year)"
    };
    const membershipDisplay = membershipLabels[membershipCode] || "Not selected";

    //  Timestamp into a readable date and time
    let formattedDate = "Not recorded";
    if (rawTimestamp) {
        const parsedDate = new Date(rawTimestamp);
        formattedDate = isNaN(parsedDate.getTime())
            ? rawTimestamp
            : parsedDate.toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short"
            });
    }

    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${escapeHTML(firstName)}</p>
        <p><strong>Last Name:</strong> ${escapeHTML(lastName)}</p>
        <p><strong>Organizational Title:</strong> ${escapeHTML(orgTitle)}</p>
        <p><strong>Email Address:</strong> ${escapeHTML(email)}</p>
        <p><strong>Mobile Phone:</strong> ${escapeHTML(phone)}</p>
        <p><strong>Business / Organization:</strong> ${escapeHTML(organization)}</p>
        <p><strong>Membership Level:</strong> ${escapeHTML(membershipDisplay)}</p>
        <p><strong>Description:</strong> ${escapeHTML(description)}</p>
        <p><strong>Submitted On:</strong> ${escapeHTML(formattedDate)}</p>
    `;
});

function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}