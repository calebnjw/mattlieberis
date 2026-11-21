const storageKey = 'mattlieber-theme';

// Keep light mode as the default until the user chooses otherwise.
let savedTheme;
try {
    savedTheme = localStorage.getItem(storageKey);
} catch {
    // The toggle still works when browser storage is unavailable.
}
document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';

export function createThemeToggle() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'navbar-action';
    button.setAttribute('aria-label', 'Dark mode');

    function updateButton() {
        const dark = document.documentElement.dataset.theme === 'dark';
        button.setAttribute('aria-pressed', String(dark));
        button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
        button.innerHTML = dark
            ? '<img src="public/icons/sun.svg" alt="Switch to light mode">'
            : '<img src="public/icons/moon.svg" alt="Switch to dark mode">';
    }

    button.addEventListener('click', () => {
        const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        try {
            localStorage.setItem(storageKey, theme);
        } catch {
            // Theme changes do not depend on persistence.
        }
        updateButton();
    });

    updateButton();
    return button;
}
