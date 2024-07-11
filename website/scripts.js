document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const closeSearchButton = document.getElementById('closeSearchButton');
    const searchSection = document.getElementById('searchSection');
    const menuButton = document.getElementById('menuButton');
    const closeMenuButton = document.getElementById('closeMenuButton');
    const menuSection = document.getElementById('menuSection');
    const header = document.querySelector('header');
    const homeSection = document.getElementById('homeSection'); // Ajout de la sélection de la section d'accueil

    // Cacher toutes les overlays sauf la page d'accueil
    const overlays = document.querySelectorAll('.overlay');
    overlays.forEach(overlay => {
        if (overlay !== homeSection) {
            overlay.style.display = 'none';
        }
    });

    let lastScrollTop = 0;
    let didScroll;

    // Function to toggle header visibility based on scroll direction
    function toggleHeaderVisibility() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.add('hidden-header');
        } else {
            // Scrolling up or at the top
            header.classList.remove('hidden-header');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }

    // Event listeners for search and menu buttons
    searchButton.addEventListener('click', () => {
        searchSection.style.display = 'flex';
    });

    closeSearchButton.addEventListener('click', () => {
        searchSection.style.display = 'none';
    });

    menuButton.addEventListener('click', () => {
        menuSection.style.display = 'flex';
    });

    closeMenuButton.addEventListener('click', () => {
        menuSection.style.display = 'none';
    });

    // Event listener for navigation items to show overlays
    const navItems = document.querySelectorAll('header nav ul li a');

    navItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const sectionId = item.getAttribute('href').substring(1) + 'Section';
            overlays.forEach(overlay => {
                overlay.style.display = overlay.id === sectionId ? 'flex' : 'none';
            });
        });
    });

    overlays.forEach(overlay => {
        overlay.addEventListener('mouseleave', () => {
            overlay.style.display = overlay === homeSection ? 'flex' : 'none'; // Assurez-vous que la page d'accueil est visible après le survol
        });
    });

    // Event listener for window scroll to toggle header visibility
    window.addEventListener('scroll', function() {
        didScroll = true;
    });

    // Function to check if the user scrolled and toggle header visibility
    setInterval(function() {
        if (didScroll) {
            toggleHeaderVisibility();
            didScroll = false;
        }
    }, 250);

    // Function to reset header visibility on window resize
    window.addEventListener('resize', () => {
        header.classList.remove('hidden-header');
        lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    });

    // Loading overlay fade-out animation
    const loadingOverlay = document.getElementById('loading-overlay');
    setTimeout(() => {
        loadingOverlay.style.animation = 'fadeOut 1s forwards';
        loadingOverlay.addEventListener('animationend', () => {
            loadingOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }, 3000); // 3 seconds total (2s animation + 1s delay)
});
