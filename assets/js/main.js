/**
 * Page behaviour. Each init* function is self-contained and only runs
 * if its markup exists, so this one file is safe to load on every page.
 * When you move to a framework, each of these becomes a component.
 */
import "./components/site-header.js";
import "./components/site-footer.js";
import "./components/cta-section.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Marquees: clone the track so the loop is seamless ---------- */
function initMarquees() {
  document.querySelectorAll(".marquee").forEach((marquee) => {
    const track = marquee.querySelector(".marquee__track");
    if (!track || marquee.dataset.ready) return;
    // Repeat the items until one track is at least as wide as the viewport,
    // so short lists (e.g. 4 tags) still loop without a gap.
    const originals = [...track.children];
    const target = Math.max(marquee.clientWidth, window.innerWidth);
    let guard = 0;
    while (track.scrollWidth < target && guard++ < 10) {
      originals.forEach((child) => {
        const copy = child.cloneNode(true);
        copy.setAttribute("aria-hidden", "true");
        copy.querySelectorAll?.("a, button").forEach((el) => el.setAttribute("tabindex", "-1"));
        if (copy.matches("a, button")) copy.setAttribute("tabindex", "-1");
        track.appendChild(copy);
      });
    }
    const clone = track.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.querySelectorAll("a, button").forEach((el) => el.setAttribute("tabindex", "-1"));
    marquee.appendChild(clone);
    marquee.dataset.ready = "true";
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- Word-by-word heading fade (like the Framer text effect) ---------- */
function initWordReveal() {
  const targets = document.querySelectorAll("[data-words]");
  if (!targets.length) return;

  targets.forEach((el) => {
    // Wrap each word in a span, preserving <br> and inline elements' text.
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
        else {
          const span = document.createElement("span");
          span.className = "word";
          span.textContent = part;
          frag.appendChild(span);
        }
      });
      node.replaceWith(frag);
    });
  });

  if (reduceMotion) {
    document.querySelectorAll(".word").forEach((w) => w.classList.add("is-lit"));
    return;
  }

  const update = () => {
    const vh = window.innerHeight;
    targets.forEach((el) => {
      const words = el.querySelectorAll(".word");
      const rect = el.getBoundingClientRect();
      // 0 when heading enters the bottom 85% of the viewport, 1 when it reaches 45%
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (vh * 0.4)));
      const lit = Math.round(progress * words.length);
      words.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
    });
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ---------- Testimonials carousel ---------- */
function initTestimonials() {
  document.querySelectorAll("[data-carousel]").forEach((root) => {
    const slides = [...root.querySelectorAll(".testimonial")];
    const dots = root.querySelector(".testimonials__dots");
    if (slides.length < 2) return;
    let index = 0;
    let timer;

    const dotButtons = slides.map((_, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-label", `Show testimonial ${i + 1}`);
      b.addEventListener("click", () => go(i, true));
      dots?.appendChild(b);
      return b;
    });

    function go(i, user = false) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle("is-active", n === index));
      dotButtons.forEach((d, n) => d.setAttribute("aria-selected", String(n === index)));
      if (user) restart();
    }
    function restart() {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(() => go(index + 1), 6000);
    }

    root.querySelector("[data-prev]")?.addEventListener("click", () => go(index - 1, true));
    root.querySelector("[data-next]")?.addEventListener("click", () => go(index + 1, true));
    go(0);
    restart();
  });
}

/* ---------- FAQ: only one open at a time ---------- */
function initFaq() {
  document.querySelectorAll("[data-accordion]").forEach((group) => {
    const items = group.querySelectorAll("details");
    items.forEach((item) =>
      item.addEventListener("toggle", () => {
        if (item.open) items.forEach((other) => other !== item && (other.open = false));
      })
    );
  });
}

/* ---------- Contact form ----------
 * Set data-endpoint on the <form> to any service that accepts a POST
 * (Formspree, Basin, Getform, your own API…). Until then it shows a notice.
 */
function initForms() {
  document.querySelectorAll("form[data-contact]").forEach((form) => {
    const status = form.querySelector(".form__status");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (form.querySelector(".hp input")?.value) return; // bot trap

      const endpoint = form.dataset.endpoint;
      const setStatus = (msg, state) => {
        status.textContent = msg;
        status.dataset.state = state;
      };

      if (!endpoint) {
        setStatus("Form isn't connected yet — add a data-endpoint to the form.", "error");
        return;
      }

      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      setStatus("Sending…", "");
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        setStatus("Thanks! We'll get back to you shortly.", "success");
      } catch {
        setStatus("Something went wrong. Please try again or email us.", "error");
      } finally {
        button.disabled = false;
      }
    });
  });
}

initMarquees();
initReveal();
initWordReveal();
initTestimonials();
initFaq();
initForms();
