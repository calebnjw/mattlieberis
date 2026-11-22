export function createArchiveFooter() {
  const footer = document.createElement('footer');
  footer.className = 'archive-footer';
  footer.innerHTML = `
    <div class="archive-footer-inner">
      <div>
        <a class="section-label" href="index.html">Matt Lieber is...</a>
        <p>a collection of the affectionate, iconic, and unexpected sign-offs from Gimlet’s <em>Reply All</em>.</p>
      </div>
      <div>
        <p class="section-label">A tribute to Reply All</p>
        <a href="https://github.com/calebnjw/mattlieberis" target="_blank" rel="noopener noreferrer">View repository on GitHub</a>
      </div>
    </div>`;
  return footer;
}
