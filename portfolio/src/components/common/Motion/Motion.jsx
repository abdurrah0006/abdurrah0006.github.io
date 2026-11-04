import { useEffect, useRef } from "react";
import useInView from "../../../hooks/useInView";
import useScrollEngine from "../../../hooks/useScrollEngine";
import { clamp, mix } from "../../../hooks/scrollEngine";
import "./Motion.css";

/* Small building blocks for scroll-linked and entrance motion. */

// Hero name: every letter is its own span so it can animate in one by one.
export function SplitChars({ text, offset = 0 }) {
  return (
    <span className="split-chars" aria-hidden="true">
      {[...text].map((char, index) => (
        <span className="split-mask" key={`${char}-${index}`}>
          <span className="split-char" style={{ "--i": index + offset }}>
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ))}
    </span>
  );
}

// "Build _with care_" -> words, with the underscored ones marked as accent.
function parseWords(text) {
  let accent = false;

  return text.split(" ").map((raw) => {
    let word = raw;
    if (word.startsWith("_")) {
      accent = true;
      word = word.slice(1);
    }
    const isAccent = accent;
    if (word.endsWith("_")) {
      accent = false;
      word = word.slice(0, -1);
    }
    return { word, accent: isAccent };
  });
}

// Heading whose words rise out of a mask when it scrolls into view, and drop
// back when it leaves through the bottom, so it replays on the way up.
export function RevealHeading({ as: Tag = "h2", text, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const words = parseWords(text);

  return (
    <Tag
      ref={ref}
      className={`reveal-heading ${inView ? "is-in" : ""} ${className}`}
      aria-label={text.replaceAll("_", "")}
    >
      {words.map(({ word, accent }, index) => (
        <span className="word-mask" aria-hidden="true" key={`${word}-${index}`}>
          <span
            className={`word-inner ${accent ? "word-accent" : ""}`}
            style={{ "--i": index }}
          >
            {word}
          </span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

// Paragraph that "reads in" word by word as you scroll (fully reversible).
// Only words whose opacity actually changed are touched each frame.
export function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const wordsRef = useRef([]);
  const valuesRef = useRef([]);
  const lastProgress = useRef(-1);

  useEffect(() => {
    wordsRef.current = [...ref.current.querySelectorAll(".scroll-word")];
    valuesRef.current = wordsRef.current.map(() => 0.16);
    lastProgress.current = -1;
  }, [text]);

  useScrollEngine(({ vh, motionOff }) => {
    const element = ref.current;
    const words = wordsRef.current;
    if (!element || !words.length) return;

    const rect = element.getBoundingClientRect();
    if (!motionOff && (rect.bottom < -vh || rect.top > vh * 2)) return;

    const progress = motionOff
      ? 1
      : clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.25));

    if (Math.abs(progress - lastProgress.current) < 0.001) return;
    lastProgress.current = progress;

    words.forEach((word, index) => {
      const reveal = clamp((progress - index / words.length) * (words.length / 1.8));
      const value = Math.round(mix(0.16, 1, reveal) * 50) / 50;

      if (value !== valuesRef.current[index]) {
        valuesRef.current[index] = value;
        word.style.setProperty("--wo", String(value));
      }
    });
  });

  return (
    <p ref={ref} className={`scroll-words ${className}`} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`}>
          <span className="scroll-word" aria-hidden="true" style={{ "--wo": 0.16 }}>
            {word}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}

// "01 / About" label with a rule that draws itself in.
export function SectionIndex({ number, label, note }) {
  const [ref, inView] = useInView({ threshold: 0.6, rootMargin: "0px 0px -4% 0px" });

  return (
    <div ref={ref} className={`section-index ${inView ? "is-in" : ""}`}>
      <span>
        {number} / {label}
      </span>
      {note ? <span className="section-index-note">{note}</span> : null}
    </div>
  );
}

// Block that rises into place when it enters the viewport (and resets when it
// leaves through the bottom). `delay` staggers siblings in ms.
export function RiseIn({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const [ref, inView] = useInView({ threshold: 0.15 });

  return (
    <Tag
      ref={ref}
      className={`rise ${inView ? "is-in" : ""} ${className}`}
      style={{ "--rise-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
