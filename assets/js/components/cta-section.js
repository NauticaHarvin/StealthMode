/**
 * <cta-section></cta-section>
 *
 * "Let's work together" block used at the bottom of several pages.
 * Override copy per page with attributes:
 *   <cta-section heading="..." text="..." button="..." href="..."></cta-section>
 */
class CtaSection extends HTMLElement {
  connectedCallback() {
    const root = document.documentElement.dataset.root || "./";
    const heading = this.getAttribute("heading") || "Let's work together";
    const text =
      this.getAttribute("text") ||
      "Join our subscription service and get your dream website designed and launched by experts. Start today, scale tomorrow!";
    const button = this.getAttribute("button") || "Book your free intro call";
    const href = this.getAttribute("href") || `${root}contact/`;

    this.innerHTML = `
      <section class="section" aria-labelledby="cta-heading">
        <div class="container">
          <div class="cta surface" data-reveal>
            <span class="badge"><span class="badge__dot"></span>Now booking site projects for Q4</span>
            <h2 id="cta-heading">${heading}</h2>
            <p class="lead">${text}</p>
            <a class="btn btn--primary" href="${href}">${button}</a>
          </div>
        </div>
      </section>`;
  }
}

customElements.define("cta-section", CtaSection);
