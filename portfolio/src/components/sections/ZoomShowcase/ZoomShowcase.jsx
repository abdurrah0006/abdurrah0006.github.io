import { useRef, useState } from "react";
import useScrollEngine from "../../../hooks/useScrollEngine";
import { clamp, mix } from "../../../hooks/scrollEngine";
import profileData from "../../../data/profileData";
import "./ZoomShowcase.css";

const { about, home } = profileData;
const items = about.highlights;

// A pinned panel that zooms in as it arrives, cycles through what you do
// while you scroll, then zooms back out. Fully driven by scroll position.
function ZoomShowcase() {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  const wordRefs = useRef([]);
  const ringRef = useRef(null);
  const barRef = useRef(null);
  const [active, setActive] = useState(0);

  useScrollEngine(({ vh, motionOff }) => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const rect = wrap.getBoundingClientRect();
    if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) return;

    const p = motionOff ? 0.5 : clamp(-rect.top / (rect.height - vh));

    // Zoom in over the first 16%, hold, zoom out over the last 14%.
    const zoomIn = clamp(p / 0.16);
    const zoomOut = clamp((p - 0.86) / 0.14);
    const scale = motionOff ? 1 : mix(mix(0.62, 1, zoomIn), 0.9, zoomOut);
    const radius = motionOff ? 0 : mix(mix(64, 0, zoomIn), 40, zoomOut);

    card.style.transform = `scale(${scale})`;
    card.style.borderRadius = `${radius}px`;
    ringRef.current.style.transform = `translate(-50%, -50%) rotate(${p * 280}deg) scale(${mix(0.8, 1.15, p)})`;
    barRef.current.style.transform = `scaleX(${p})`;

    // Which item is in the spotlight (item i is centred when position === i)
    const span = 0.7 / items.length;
    const position = clamp((p - 0.15) / span, 0, items.length - 1);
    const index = Math.round(position);

    wordRefs.current.forEach((word, i) => {
      if (!word) return;

      if (motionOff) {
        word.style.opacity = i === index ? "1" : "0";
        word.style.transform = "none";
        word.style.filter = "none";
        return;
      }

      const distance = i - position;
      const away = Math.abs(distance);
      const shift = clamp(distance, -1, 1);

      word.style.opacity = String(clamp(1 - (away - 0.18) / 0.32));
      word.style.transform = `translate3d(0, ${shift * 72}px, 0) scale(${mix(1, 0.9, Math.abs(shift))})`;
      word.style.filter = `blur(${Math.min(away, 1) * 10}px)`;
    });

    setActive((previous) => (previous === index ? previous : index));
  });

  return (
    <section
      className="zoom"
      ref={wrapRef}
      style={{ "--zoom-count": items.length }}
      aria-label={home.zoomLabel}
      data-reveal-skip
    >
      <div className="zoom-sticky">
        <div className="zoom-card" ref={cardRef}>
          <div className="zoom-ring" ref={ringRef} aria-hidden="true" />

          <div className="zoom-top">
            <span>02 / {home.zoomLabel}</span>
            <span aria-hidden="true">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </div>

          <div className="zoom-stage">
            {items.map((item, index) => (
              <h2
                className="zoom-word"
                key={item}
                ref={(node) => {
                  wordRefs.current[index] = node;
                }}
                aria-hidden={index === active ? undefined : "true"}
              >
                {item}
              </h2>
            ))}
          </div>

          <div className="zoom-bottom">
            <span className="zoom-bar" aria-hidden="true">
              <i ref={barRef} />
            </span>
            <span>Keep scrolling</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ZoomShowcase;
