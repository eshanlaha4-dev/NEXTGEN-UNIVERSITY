/* NEXTGEN UNIVERSITY premium website interactions */
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector("#mainNav");
    const searchToggle = document.querySelector("#searchToggle");
    const searchClose = document.querySelector("#searchClose");
    const voiceSearch = document.querySelector("#voiceSearch");
    const searchBackdrop = document.querySelector("#searchBackdrop");
    const navbarSearchDropdown = document.querySelector("#navbarSearchDropdown");
    const headerSearchInput = document.querySelector("#headerSearchInput");
    const searchResults = document.querySelector("#searchResults");
    const heroBg = document.querySelector(".hero-bg");

    const courseLibrary = [
        "BCA",
        "BBA",
        "MBA",
        "MCA",
        "B.Tech Computer Science",
        "B.Ed",
        "M.Ed",
        "B.Sc Nursing",
        "Diploma in Engineering"
    ];

    const suggestions = [
        { title: "Computer Science Courses", subtitle: "Explore coding, AI, and system design." },
        { title: "Admissions 2026", subtitle: "Secure your seat in the next intake." },
        { title: "Faculty Members", subtitle: "Meet our world-class mentors." },
        { title: "Upcoming Tech Events", subtitle: "Join future-focused campus experiences." }
    ];

    const renderSearchResults = (results, query) => {
        if (!searchResults) return;

        if (!query.trim()) {
            const suggestionHtml = suggestions
                .map(
                    (item) => `
                        <div class="search-suggestion" data-suggestion="${item.title}">
                            <i class="fa-solid fa-angle-right"></i>
                            <span>${item.title}</span>
                        </div>
                    `
                )
                .join("");

            searchResults.innerHTML = `
                <div class="search-placeholder">Type to search courses...</div>
                <div class="search-suggestions">${suggestionHtml}</div>
            `;
            return;
        }

        if (!results.length) {
            searchResults.innerHTML = `<div class="search-placeholder">No course found</div>`;
            return;
        }

        searchResults.innerHTML = results
            .map(
                (course) => `
                    <article class="search-card">
                        <h3>${course}</h3>
                    </article>
                `
            )
            .join("");
    };

    const updateSearchResults = (query) => {
        const value = query.trim().toLowerCase();
        const results = value
            ? courseLibrary.filter((course) => course.toLowerCase().includes(value))
            : [];
        renderSearchResults(results, query);
    };

    const toggleSearch = (show) => {
        if (!navbarSearchDropdown || !searchToggle || !searchBackdrop) return;
        navbarSearchDropdown.classList.toggle("active", show);
        navbarSearchDropdown.setAttribute("aria-hidden", show ? "false" : "true");
        searchToggle.setAttribute("aria-expanded", show ? "true" : "false");
        searchBackdrop.classList.toggle("active", show);
        if (show) {
            headerSearchInput.value = "";
            headerSearchInput.focus();
            renderSearchResults([], "");
        }
    };

    const openSearch = () => toggleSearch(true);
    const closeSearch = () => toggleSearch(false);

    if (searchToggle && searchClose && navbarSearchDropdown && headerSearchInput && searchBackdrop) {
        searchToggle.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleSearch(!navbarSearchDropdown.classList.contains("active"));
        });

        searchClose.addEventListener("click", (event) => {
            event.preventDefault();
            closeSearch();
        });

        searchBackdrop.addEventListener("click", closeSearch);

        headerSearchInput.addEventListener("input", (event) => {
            updateSearchResults(event.target.value);
        });

        searchResults.addEventListener("click", (event) => {
            const suggestion = event.target.closest(".search-suggestion");
            if (suggestion) {
                const value = suggestion.dataset.suggestion;
                headerSearchInput.value = value;
                updateSearchResults(value);
            }
        });

        document.addEventListener("click", (event) => {
            if (
                navbarSearchDropdown.classList.contains("active") &&
                !navbarSearchDropdown.contains(event.target) &&
                !searchToggle.contains(event.target) &&
                !searchBackdrop.contains(event.target)
            ) {
                closeSearch();
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && navbarSearchDropdown.classList.contains("active")) {
                closeSearch();
            }
        });
    }

    if (voiceSearch) {
        voiceSearch.addEventListener("click", () => {
            if (headerSearchInput) {
                headerSearchInput.focus();
            }
        });
    }

    const updateNavbar = () => {
        if (!navbar) return;
        navbar.classList.toggle("scrolled", window.scrollY > 24);
    };

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });

    const updateHeroBackground = () => {
        if (!heroBg) return;
        const offset = Math.min(window.scrollY * 0.08, 36);
        heroBg.style.transform = `translateY(${offset}px) scale(1.03)`;
    };

    updateHeroBackground();
    window.addEventListener("scroll", updateHeroBackground, { passive: true });

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true,
            offset: 100,
            easing: "ease-out-cubic"
        });
    }

    // Interactive card glow effect on mouse move
    const addCardGlowEffect = () => {
        const cards = document.querySelectorAll('.hero-card, .course-card, .profile-card, .testimonial-card, .event-card, .metric-card, .about-panel');
        
        cards.forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
                card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--x', '50%');
                card.style.setProperty('--y', '50%');
            });
        });
    };

    addCardGlowEffect();
});
