function changeTitle(newTitle) {
    document.title = newTitle;
}

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-menu li a");
    const homeLink = document.querySelector(".nav-menu .home-hover");
    let manualClick = false;
    let switchTimeout;

    window.scrollTo(0, 0);
    localStorage.removeItem("activeNav");

    // Home link stays active
    homeLink.classList.add("home-active");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            manualClick = true; // Ignore observer temporarily

            // Remove active from all links
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Add active class except for Home
            if (!this.classList.contains("home-hover")) {
                this.classList.add("active");
            }

            const sectionId = this.getAttribute("href").substring(1);
            if (sectionId) {
                slowScrollTo(document.getElementById(sectionId).offsetTop, 1500);
            }

            setTimeout(() => { manualClick = false; }, 2000);
        });
    });

    function slowScrollTo(targetPosition, duration) {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const ease = easeInOutQuad(elapsedTime, startPosition, distance, duration);
            window.scrollTo(0, ease);

            if (elapsedTime < duration) {
                requestAnimationFrame(animation);
            }
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    const observer = new IntersectionObserver(
        entries => {
            if (manualClick) return;

            clearTimeout(switchTimeout);
            switchTimeout = setTimeout(() => {
                let isHomeVisible = false;
                let activeSection = null;

                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        activeSection = entry.target;
                        if (entry.target.id === "home") {
                            isHomeVisible = true;
                        }
                    }
                });

                navLinks.forEach(nav => nav.classList.remove("active"));

                if (activeSection) {
                    const link = document.querySelector(`.nav-menu a[href="#${activeSection.id}"]`);
                    if (link && !link.classList.contains("home-hover")) {
                        changeTitle(link.innerText + " | ATM Prepaid");
                        link.classList.add("active");
                    }
                }

                if (isHomeVisible || window.scrollY === 0) {
                    navLinks.forEach(nav => nav.classList.remove("active"));
                }
            }, 500);
        },
        { root: null, threshold: 0.5 }
    );

    document.querySelectorAll("section, div[id]").forEach(section => observer.observe(section));

    window.addEventListener("scroll", () => {
        if (window.scrollY === 0) {
            navLinks.forEach(nav => nav.classList.remove("active"));
        }
    });
});


