/**
 * <site-header active="home"></site-header>
 *
 * Shared navigation. Edit NAV_LINKS once and every page updates.
 * Paths are relative to the site root, which each page declares with
 * <html data-root="../"> so it works on GitHub Pages sub-paths too.
 */
const NAV_LINKS = [
  { id: "home", label: "Home", href: "" },
  { id: "services", label: "Services", href: "services/" },
  { id: "about", label: "About Us", href: "about-us/" },
  { id: "case-studies", label: "Case Studies", href: "case-studies/" },
];

const CTA = { label: "Contact us", href: "contact/" };

class SiteHeader extends HTMLElement {
  connectedCallback() {
    const root = document.documentElement.dataset.root || "./";
    const active = this.getAttribute("active");

    const links = NAV_LINKS.map(
      (l) =>
        `<a href="${root}${l.href}"${l.id === active ? ' aria-current="page"' : ""}>${l.label}</a>`
    ).join("");

    this.innerHTML = `
      <header class="site-header">
        <div class="container">
          <div class="site-header__bar surface">
            <a class="site-header__logo" href="${root}" aria-label="Studio — home">
              <img src="${root}assets/img/logo.png" alt="Studio" width="251" height="53">
            </a>
            <nav class="site-nav" aria-label="Main">${links}</nav>
            <a class="btn btn--primary" href="${root}${CTA.href}">${CTA.label}</a>
            <button class="site-header__toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
              <span></span><span></span>
            </button>
            <div class="site-header__mobile" id="mobile-nav">
              <nav class="site-nav" aria-label="Mobile">${links}</nav>
              <a class="btn btn--primary btn--block" href="${root}${CTA.href}">${CTA.label}</a>
            </div>
          </div>
        </div>
      </header>`;

    const header = this.querySelector(".site-header");
    const toggle = this.querySelector(".site-header__toggle");
    toggle.addEventListener("click", () => {
      const open = header.toggleAttribute("data-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }
}

customElements.define("site-header", SiteHeader);
