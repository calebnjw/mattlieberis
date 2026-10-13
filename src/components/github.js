const storageKey = 'mattlieber-theme';

export function createGitHubLink() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'theme-toggle';

  let savedTheme = localStorage.getItem('storageKey');
  const dark = savedTheme === 'dark';

  button.title = 'View project on GitHub';
  button.innerHTML = dark ? '<img src="public/github_invertocat_black.svg" alt="GitHub"/>' : '<img src="public/github_invertocat_black.svg" alt="GitHub"/>'

  button.addEventListener('click', () => {
    navigate("https://github.com/calebnjw/mattlieberis")
  });

  return button;
}