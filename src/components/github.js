export function createGitHubLink() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'navbar-action';

  button.title = 'View project on GitHub';
  button.innerHTML = '<img src="public/icons/github_invertocat_black.svg" alt="GitHub"/>';

  button.addEventListener('click', () => {
    window.location.href = "https://github.com/calebnjw/mattlieberis";
  });

  return button;
}
