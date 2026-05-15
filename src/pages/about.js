import { Navbar } from '../components/navbar.js';

function initAbout() {
  // Create app content
  const app = document.getElementById('app');
  if (!app) return;

  // Load navbar
  new Navbar('app');

  // Add about content
  const aboutContainer = document.createElement('div');
  aboutContainer.id = 'about-container';
  aboutContainer.className = 'color-primary';

  // Reply All section
  const replyAllSection = createSection(
    'What is Reply All?',
    'Reply All was an award-winning podcast produced by Gimlet Media (now Spotify Studios) that ran from November 24, 2014 until June 23, 2022. Hosted by PJ Vogt and Phia Bennin (formerly Sruthi Pinnamaneni), the show explored and investigated internet culture, strange internet mysteries, and compelling human stories unfolding online.\n\nReply All became known for its deep-dive journalism, entertaining storytelling, and ability to humanize the internet. The podcast won multiple awards and developed a devoted cult following during its eight-year run. Each episode featured unique endings with creative descriptions of Matt Lieber, one of the show\'s key producers.'
  );
  aboutContainer.appendChild(replyAllSection);

  // Matt Lieber section
  const mattSection = createSection(
    'Who is Matt Lieber?',
    'Matt Lieber is a podcast producer and one of the co-founders of Gimlet Media. While he worked behind the scenes on Reply All, Matt became an unexpected internet sensation thanks to the podcast\'s end credits. Every episode of Reply All would include a unique, often humorous or absurdist description of Matt Lieber—ranging from the mundane to the completely ridiculous. These descriptions became a beloved running gag among the Reply All community, with listeners eagerly awaiting each episode to discover what creative description would appear next.'
  );
  aboutContainer.appendChild(mattSection);

  // This Project section
  const projectSection = createSection(
    'About This Project',
    'mattlieber.is is a fan-made archive that celebrates the Reply All podcast\'s most memorable running gag. This project compiles all of the unique descriptions of Matt Lieber that appeared at the end of each Reply All episode—all 251 episodes worth.\n\nThe goal of this project is to preserve and celebrate this piece of internet culture and podcast history. Every time you visit, you\'ll see a randomly selected Matt Lieber description displayed alongside episode details, introducing you to the creativity and humor that made Reply All so special.\n\nThis project is made by a fan, for fans, and is not affiliated with Spotify or the original Reply All producers.'
  );
  aboutContainer.appendChild(projectSection);

  // Stats section
  const statsSection = document.createElement('div');
  statsSection.className = 'mb-3';
  statsSection.innerHTML = `
    <h2 class="text-title geist-600 mb-1">By The Numbers</h2>
    <p class="geist-400">• 251 episodes of Reply All</p>
    <p class="geist-400">• 251 unique Matt Lieber descriptions</p>
    <p class="geist-400">• 8 years of internet culture exploration</p>
    <p class="geist-400">Aired: November 24, 2014 – June 23, 2022</p>
  `;
  aboutContainer.appendChild(statsSection);

  app.appendChild(aboutContainer);
}

function createSection(title, content) {
  const section = document.createElement('div');
  section.className = 'mb-3';

  const heading = document.createElement('h2');
  heading.className = 'text-title geist-600 mb-1';
  heading.textContent = title;
  section.appendChild(heading);

  const text = document.createElement('p');
  text.className = 'geist-400';
  text.style.whiteSpace = 'pre-wrap';
  text.textContent = content;
  section.appendChild(text);

  return section;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initAbout);
