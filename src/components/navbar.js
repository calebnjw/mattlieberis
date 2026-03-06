export class Navbar {
    async initNavbar(containerId) {
        // Create navbar content
        const navbarContainer = document.getElementById(containerId);
        if (!navbarContainer) return;

        const navbar = document.createElement('div');
        navbar.className = 'navbar';
        navbarContainer.appendChild(navbar);

        // Create left side with logo
        const homeIcon = document.createElement('a');
        homeIcon.href = '../index.html';
        homeIcon.className = 'navbar-icon';
        navbar.appendChild(homeIcon);

        // Create right side with navigation links
        const navLinks = document.createElement('div');

        const episodesLink = document.createElement('a');
        episodesLink.href = '../episodes.html';
        episodesLink.className = 'navbar-link geist-600 color-primary';
        episodesLink.textContent = 'Episodes';
        navLinks.appendChild(episodesLink);

        const aboutLink = document.createElement('a');
        aboutLink.href = '../about.html';
        aboutLink.className = 'navbar-link geist-600 color-primary';
        aboutLink.textContent = 'About';
        navLinks.appendChild(aboutLink);

        navbar.appendChild(navLinks);
    }

    // constructor Navbar class for use in other pages
    constructor(containerId) {
        this.containerId = containerId;
        this.initNavbar(containerId);
    }
}
