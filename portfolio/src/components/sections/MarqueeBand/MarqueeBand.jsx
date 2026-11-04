import { useRef } from "react";
import useScrollEngine from "../../../hooks/useScrollEngine";
import { clamp, mix } from "../../../hooks/scrollEngine";
import profileData from "../../../data/profileData";
import "./MarqueeBand.css";

const { bandWords, marqueeLines } = profileData.home;

// Two scroll-linked text treatments. Everything is a function of scroll
// position, so scrolling back up reverses it.
//  - TickerBand: a tilted band of skills that straightens as it arrives
//  - MarqueeLines: two big sentences sliding in opposite directions
export function TickerBand() {
  const bandRef = useRef(null);
  const slideRef = useRef(null);
  const lastProgress = useRef(-1);

  // Only transforms change per frame (they stay on the GPU): scale and tilt
  // settle as the band arrives, and the words slide with the scroll.
  useScrollEngine(({ vh, motionOff }) => {
    const band = bandRef.current;
    const slide = slideRef.current;
    if (!band || !slide) return;

    if (motionOff) {
      band.style.transform = "";
      slide.style.transform = "";
      lastProgress.current = -1;
      return;
    }

    const rect = band.getBoundingClientRect();
    if (rect.bottom < -120 || rect.top > vh + 120) return;

    const p = clamp((vh - rect.top) / (vh + rect.height));
    if (Math.abs(p - lastProgress.current) < 0.0005) return;
    lastProgress.current = p;

    band.style.transform = `translate3d(0, 0, 0) scale(${mix(0.94, 1, p)}) rotate(${mix(-1.4, 0.6, p)}deg)`;
    slide.style.transform = `translate3d(${mix(120, -260, p)}px, 0, 0)`;
  });

  const items = [...bandWords, ...bandWords];

  return (
    <section className="ticker" aria-label="Skills" data-reveal-skip>
      <div className="ticker-band" ref={bandRef}>
        <div className="ticker-slide" ref={slideRef}>
          <div className="ticker-track">
            {items.map((word, index) => (
              <span className="ticker-item" key={`${word}-${index}`}>
                {word}
                <svg className="ticker-star" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function MarqueeLines() {
  const sectionRef = useRef(null);
  const lineRefs = useRef([]);
  const lastOffset = useRef(null);
  const lastSkew = useRef(null);

  useScrollEngine(({ vh, velocity, motionOff }) => {
    const section = sectionRef.current;
    if (!section) return;

    if (motionOff) {
      lineRefs.current.forEach((line) => line && (line.style.transform = ""));
      return;
    }

    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > vh) return;

    const offset = Math.round((rect.top - vh * 0.5) * 4) / 4;
    const skew = Math.round(clamp(velocity * 0.035, -1.5, 1.5) * 20) / 20;
    if (offset === lastOffset.current && skew === lastSkew.current) return;
    lastOffset.current = offset;
    lastSkew.current = skew;

    lineRefs.current.forEach((line, index) => {
      if (!line) return;
      const direction = index % 2 === 0 ? 1 : -1;
      line.style.transform = `translate3d(${offset * 0.28 * direction}px, 0, 0) skewX(${skew}deg)`;
    });
  });

  return (
    <section className="lines" ref={sectionRef} aria-label={marqueeLines.join(" ")} data-reveal-skip>
      {marqueeLines.map((line, index) => (
        <span
          className={`lines-text ${index % 2 ? "lines-text-outline" : ""}`}
          key={line}
          ref={(node) => {
            lineRefs.current[index] = node;
          }}
          aria-hidden="true"
        >
          {line} {line}
        </span>
      ))}
    </section>
  );
}
