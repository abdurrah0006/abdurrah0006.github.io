import { useEffect } from "react";

const SIZE = 128;
const TAG = "</AR>";

// Redraws the browser-tab icon from the active design: the </AR> tag on one
// line, in that design's display font, heavy and thick, in the design's two
// brand colours.
// A canvas is used because an SVG favicon cannot load web fonts.
export default function useThemedFavicon(design, mode) {
  useEffect(() => {
    let cancelled = false;

    const draw = () => {
      if (cancelled) return;

      const style = getComputedStyle(document.documentElement);
      const stack = style.getPropertyValue("--font-display").trim() || "serif";
      const primary = style.getPropertyValue("--color-primary").trim() || "#cf4520";
      const secondary = style.getPropertyValue("--color-secondary").trim() || "#e8a13a";

      const canvas = document.createElement("canvas");
      canvas.width = SIZE;
      canvas.height = SIZE;
      const context = canvas.getContext("2d");
      if (!context) return;

      // Fit the single line across the canvas, then thicken with an outline.
      let size = 96;
      context.font = `800 ${size}px ${stack}`;
      size = Math.min(size, (size * SIZE * 0.96) / context.measureText(TAG).width);
      context.font = `800 ${size}px ${stack}`;

      const gradient = context.createLinearGradient(0, 0, SIZE, 0);
      gradient.addColorStop(0, primary);
      gradient.addColorStop(1, secondary);

      context.fillStyle = gradient;
      context.strokeStyle = gradient;
      context.lineWidth = size * 0.08;
      context.lineJoin = "round";
      context.textAlign = "center";
      context.textBaseline = "middle";

      context.strokeText(TAG, SIZE / 2, SIZE / 2);
      context.fillText(TAG, SIZE / 2, SIZE / 2);

      let link = document.querySelector('link[rel~="icon"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.type = "image/png";
      link.href = canvas.toDataURL("image/png");
    };

    draw();

    // Redraw once the design's web font has actually finished loading.
    document.fonts?.addEventListener("loadingdone", draw);
    document.fonts?.ready.then(draw);

    return () => {
      cancelled = true;
      document.fonts?.removeEventListener("loadingdone", draw);
    };
  }, [design, mode]);
}
