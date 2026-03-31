import { Navbar } from '../components/navbar.js';

function initAbout() {
  // Load navbar
  new Navbar('navbar');

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Add your about content here
  const aboutContent = document.createElement('div');
  aboutContent.className = '';
  aboutContent.textContent = 'This is the about page. Add your content here!';
  app.appendChild(aboutContent);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAbout);
