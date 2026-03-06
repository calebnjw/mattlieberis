import { Navbar } from '../components/navbar.js';

function initAbout() {
  // Load navbar
  new Navbar('navbar');

  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Create content container
  const content = document.createElement('div');
  content.className = 'space-y-4';

  // Add your about content here
  const paragraph = document.createElement('p');
  paragraph.className = 'text-lg text-gray-700 dark:text-gray-300';
  paragraph.textContent = 'This is the about page. Add your content here!';
  content.appendChild(paragraph);

  app.appendChild(content);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAbout);
