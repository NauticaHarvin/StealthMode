# Studio website

A hand-coded rebuild of the Framer project **Designfast (copy)**. It uses plain HTML, CSS and JavaScript, with no build step and no framework.

## Run it locally

1. **Download the images (one time only).** This pulls them from Framer's CDN into `assets/img/`:
   ```bash
   bash scripts/download-assets.sh
   ```
2. **Serve the folder over HTTP.** The JS uses ES modules, which browsers won't load from `file://`.
   - VS Code: install **Live Server**, right-click `index.html`, then choose **Open with Live Server**
   - or from a terminal: `python3 -m http.server 8000` and open http://localhost:8000

## Project structure

```
index.html                  Home
services/                   Services index + 4 detail pages
about-us/  contact/
case-studies/               Index + 6 detail pages
legal/                      Index + privacy / cookie / terms
404.html                    GitHub Pages uses this for unknown URLs

assets/css/tokens.css       Colors, type scale, spacing: re-theme here
assets/css/base.css         Reset, typography, .container / .section
assets/css/components.css   One block per component (header, bento, pricing, faq…)
assets/js/main.js           Small init functions (marquee, reveal, carousel, faq, form)
assets/js/components/       Shared <site-header>, <site-footer>, <cta-section>
assets/img/                 Images (filled by the download script)
scripts/download-assets.sh
```

### How paths work
Each page sets `<html data-root="../">`, a relative path back to the site root. Every link and asset uses that path, so the site works at a domain root **and** at a GitHub Pages sub-path (`username.github.io/repo/`).

### Shared parts
The nav, footer and "Let's work together" CTA are native Web Components (custom elements) in `assets/js/components/`. To change a nav link, edit `NAV_LINKS` in `site-header.js` and every page updates.

## Things to wire up

| Where | What |
|---|---|
| `contact/index.html` | Put a form endpoint in `data-endpoint` on the `<form>` (Formspree, Basin, Getform or your own API). The Framer form had no destination. |
| `site-footer.js`, `about-us/` | The social links still point to the bare x.com / instagram.com / linkedin.com. |
| `about-us/` | Point the "virtual tour" `href` at a video. |
| `case-studies/*/` | "Visit live website" still uses the template's placeholder URL. |
| Template copy | The testimonials, team, case studies, pricing and legal pages are still Designfast placeholder content. Replace them before launch. |

## Deploy to GitHub Pages
Push the repo, then go to **Settings → Pages → Deploy from branch → `main` / root**. No build is needed. Commit `assets/img/` so the images ship with the site.

## Going interactive later
`main.js` is split into small `init*()` functions, and the CSS is organized by component. That makes it straightforward to move to React/Vite or Astro later: each `<section>` in the HTML becomes a component, each `init*` becomes that component's effect, and `tokens.css` carries over unchanged. **Astro** is the smoothest next step, because it keeps these HTML pages and lets you add interactive "islands" only where you need them.
