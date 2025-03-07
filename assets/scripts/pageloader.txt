function loadPage(sectionId, file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(sectionId).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

// Load all pages
function checkAllPagesLoaded() {
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, 
                    behavior: "smooth",
                });
            }
        }, 200);
    }
}

// Load pages
loadPage("Telco", "telco.html", checkAllPagesLoaded);
loadPage("Transpo", "transpo.html", checkAllPagesLoaded);
loadPage("Epins", "epins.html", checkAllPagesLoaded);
loadPage("Topup", "topup.html", checkAllPagesLoaded);
