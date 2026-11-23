/**
 * <site-footer></site-footer>
 *
 * Shared footer. Update links / socials here once.
 */
const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Services", href: "services/" },
      { label: "Case Studies", href: "case-studies/" },
      { label: "About Us", href: "about-us/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "legal/privacy-policy/" },
      { label: "Cookie Policy", href: "legal/cookie-policy/" },
      { label: "Terms of Service", href: "legal/terms-of-service/" },
    ],
  },
];

// TODO: swap in your real profile URLs
const SOCIALS = [
  { label: "X", href: "https://x.com", icon: '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z"/></svg>' },
  { label: "Instagram", href: "https://instagram.com", icon: '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"/></svg>' },
  { label: "LinkedIn", href: "https://linkedin.com", icon: '<svg viewBox="0 0 256 256" aria-hidden="true"><path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"/></svg>' },
];

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const root = document.documentElement.dataset.root || "./";
    const year = new Date().getFullYear();

    const cols = FOOTER_COLUMNS.map(
      (c) => `
        <div class="site-footer__col">
          <h5>${c.title}</h5>
          ${c.links.map((l) => `<a href="${root}${l.href}">${l.label}</a>`).join("")}
        </div>`
    ).join("");

    const socials = SOCIALS.map(
      (s) => `<a href="${s.href}" target="_blank" rel="noopener" aria-label="${s.label}">${s.icon}</a>`
    ).join("");

    this.innerHTML = `
      <footer class="site-footer">
        <div class="container site-footer__grid">
          <div class="site-footer__brand">
            <a href="${root}" aria-label="Studio — home"><img src="${root}assets/img/logo.png" alt="Studio" width="158" height="33"></a>
            <p class="dim">© ${year} Studio 1957. All rights reserved.</p>
          </div>
          ${cols}
          <div class="socials">${socials}</div>
        </div>
      </footer>`;
  }
}

customElements.define("site-footer", SiteFooter);
