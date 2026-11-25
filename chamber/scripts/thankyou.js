// last modified time for footer
document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;


const resultsContainer = document.getElementById("submissionResults");

if (resultsContainer) {
    const params = new URLSearchParams(window.location.search);

    const firstName = params.get("firstname") || "Not provided";
    const lastName = params.get("lastname") || "Not provided";
    const orgTitle = params.get("organizationaltitle") || "Not provided";
    const email = params.get("email") || "Not provided";
    const phone = params.get("phone") || "Not provided";
    const organization = params.get("organization") || "Not provided";
    const membershipCode = params.get("membership") || "";
    const description = params.get("description") || "Not provided";
    const timestamp = params.get("timestamp") || "Not recorded";

    const membershipNames = {
        np: "NP Membership (Non-Profit — No Fee)",
        bronze: "Bronze Membership",
        silver: "Silver Membership",
        gold: "Gold Membership"
    };

    const membershipDisplay = membershipNames[membershipCode] || "Not selected";

    resultsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Organizational Title:</strong> ${orgTitle}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> ${phone}</p>
        <p><strong>Business / Organization:</strong> ${organization}</p>
        <p><strong>Membership Level:</strong> ${membershipDisplay}</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Submitted On:</strong> ${timestamp}</p>
    `;
}