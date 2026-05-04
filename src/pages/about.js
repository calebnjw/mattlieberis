import { Navbar } from '../components/navbar.js';

function initAbout() {
  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Load navbar
  new Navbar('app');

  // Add your about content here
  const aboutContent = document.createElement('div');
  aboutContent.className = '';
  aboutContent.textContent = 'This is the about page. Add your content here!';
  app.appendChild(aboutContent);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAbout);
