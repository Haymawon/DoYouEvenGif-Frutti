// =============================================
// Shared functionality across all pages
// =============================================

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    setActiveNavLink();
    
    // Load feature cards on homepage
    if (document.querySelector('.features-grid')) {
        loadFeatureCards();
    }
    
    // Initialize mobile menu toggle
    initMobileMenu();
});

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Remove active class from all links
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        
        // Set active class based on current page
        if ((currentPage === 'index.html' && linkPage === 'index.html') || 
            (currentPage !== 'index.html' && linkPage.includes(currentPage))) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Load feature cards on homepage
function loadFeatureCards() {
    const featuresGrid = document.querySelector('.features-grid');
    if (!featuresGrid) return;
    
    const features = [
        {
            icon: 'film',
            title: 'Loopies',
            description: 'Discover millions of GIFs, share with friends, and create your own collections.',
            link: 'loopies.html'
        },
        {
            icon: 'music',
            title: 'Meowodies',
            description: 'Listen to the finest tunes with our premium music player and curated playlists.',
            link: 'meowodies.html'
        },
        {
            icon: 'image',
            title: 'Peek-a-Pics',
            description: 'Explore stunning visuals and artwork in our exclusive gallery collection.',
            link: 'peek-a-pics.html'
        },
        {
            icon: 'wand-magic-sparkles',
            title: 'Magic Portals',
            description: 'Journey through our enchanted portals to discover amazing corners of the internet.',
            link: 'magic-portals.html'
        }
    ];
    
    featuresGrid.innerHTML = features.map(feature => `
        <a href="${feature.link}" class="feature-card">
            <div class="feature-icon"><i class="fas fa-${feature.icon}"></i></div>
            <h3 class="feature-title">${feature.title}</h3>
            <p>${feature.description}</p>
        </a>
    `).join('');
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.createElement('button');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    
    menuToggle.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
    });
    
    document.body.appendChild(menuToggle);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Helper function to load JSON data
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}