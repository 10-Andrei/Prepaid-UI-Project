const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay); 

// Function to toggle menu visibility
function toggleMenu() {
    navMenu.classList.toggle('active'); 
    hamburger.classList.toggle('active'); 
    overlay.classList.toggle('active'); // Show/hide overlay
}

// Function to close the menu
function closeMenu() {
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
}

hamburger.addEventListener('click', toggleMenu);

// Close menu when clicking on overlay
overlay.addEventListener('click', closeMenu);

// Close menu when clicking on a nav item
navMenu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') { 
        closeMenu();
    }
});
