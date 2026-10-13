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
    button.className = 'theme-toggle';
    button.setAttribute('aria-label', 'Dark mode');

    function updateButton() {
        const dark = document.documentElement.dataset.theme === 'dark';
        button.setAttribute('aria-pressed', String(dark));
        button.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
        button.innerHTML = dark
            ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>'
            : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14A9 9 0 0 1 10 3.5 9 9 0 1 0 20.5 14Z"/></svg>';
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
