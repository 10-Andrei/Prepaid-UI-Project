// Function to update the title based on the section ID
function updateTitleFromHash() {
    const hash = window.location.hash.substring(1); 
    let newTitle = "Our Products | ATM Prepaid"; // Default title

    switch (hash) {
        case "Telco":
            newTitle = "Telco Load | ATM Prepaid";
            break;
        case "Transpo":
            newTitle = "Transportation | ATM Prepaid";
            break;
        case "Epins":
            newTitle = "E-Pins | ATM Prepaid";
            break;
        case "Topup":
            newTitle = "Direct Top-Up | ATM Prepaid";
            break;
    }

    document.title = newTitle;
}

// Run function when the page loads
document.addEventListener("DOMContentLoaded", updateTitleFromHash);