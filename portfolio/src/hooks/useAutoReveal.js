import { useEffect } from "react";

// Gives every inner page the same scroll-in motion without touching each page:
// it tags section content and grid/list items with data-reveal, and an
// IntersectionObserver toggles .is-revealed in both directions.
const GRID_ITEMS = "main [class*='-grid'] > *, main [class*='-list'] > *";
const BLOCKS = "main section > .container > *, main > div > section > .container > *";

function collect() {
  const items = [...document.querySelectorAll(GRID_ITEMS)];
  const blocks = [...document.querySelectorAll(BLOCKS)].filter(
    (block) => !items.some((item) => block.contains(item))
  );

  return [...items, ...blocks].filter((element) => {
    if (element.closest("[data-reveal-skip]")) return false;
    if (element.style.opacity || element.style.transform) return false; // something else is animating it
    if (element.matches("script, style, svg, dialog")) return false;
    return true;
  });
}

export default function useAutoReveal(routeKey) {
  useEffect(() => {
    if (document.documentElement.dataset.motion === "reduced") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) target.classList.add("is-revealed");
          else if (entry.boundingClientRect.top > 0) target.classList.remove("is-revealed");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    const seen = new WeakSet();

    const scan = () => {
      collect().forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);

        const siblings = element.parentElement ? [...element.parentElement.children] : [];
        const index = Math.max(0, siblings.indexOf(element));
        element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 70}ms`);
        element.setAttribute("data-reveal", "");
        observer.observe(element);
      });
    };

    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(scan, 120);
    };

    const frame = window.requestAnimationFrame(scan);
    const mutations = new MutationObserver(schedule);
    mutations.observe(document.querySelector("main") || document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      mutations.disconnect();
      observer.disconnect();
    };
  }, [routeKey]);
}
