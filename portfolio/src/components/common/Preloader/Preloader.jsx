import { useEffect, useState } from "react";
import Mark from "../Mark/Mark";
import profileData from "../../../data/profileData";
import "./Preloader.css";

const PLAY_MS = 2800;
const LINE_MS = 900;
const SEEN_KEY = "portfolio-intro-seen";
const { lines } = profileData.home.intro;

// Loading screen: a seam draws across the screen, the </AR> tag rises
// in letter by letter inside two rings, the name rises letter by letter, then the
// screen splits open top and bottom. Plays once per session (Replay intro in
// the footer runs it again) and is skipped for reduced motion.
function Preloader() {
  const [phase, setPhase] = useState(() =>
    document.documentElement.dataset.intro === "playing" ? "play" : "done"
  );
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    if (phase !== "play") return undefined;

    window.__introMounted = true;
    const finish = window.setTimeout(() => setPhase("exit"), PLAY_MS);
    const cycle = window.setInterval(
      () => setLineIndex((index) => Math.min(index + 1, lines.length - 1)),
      LINE_MS
    );

    return () => {
      window.clearTimeout(finish);
      window.clearInterval(cycle);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "exit") return undefined;

    // The page starts animating as the screen opens.
    document.documentElement.dataset.intro = "done";
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore
    }

    const timer = window.setTimeout(() => setPhase("done"), 1200);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`preloader ${phase === "exit" ? "is-exit" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div className="preloader-half preloader-half-top" />
      <div className="preloader-half preloader-half-bottom" />
      <span className="preloader-seam" aria-hidden="true" />

      <div className="preloader-stage">
        <div className="preloader-badge">
          <svg className="preloader-mark" viewBox="0 0 120 120" aria-hidden="true">
            <circle className="pl-draw pl-ring" cx="60" cy="60" r="55" pathLength="1" style={{ "--d": "0.5s" }} />
            <circle className="pl-ring-dashed" cx="60" cy="60" r="47" />
            <g className="pl-orbit">
              <circle cx="60" cy="5" r="3.2" />
            </g>
          </svg>
          <Mark animate className="preloader-text" />
        </div>

        <p className="preloader-name" aria-hidden="true">
          {[...profileData.name].map((char, index) => (
            <span key={`${char}-${index}`} style={{ "--i": index }}>
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        <p className="preloader-status" key={lineIndex}>
          {lines[lineIndex]}
        </p>
      </div>

      <button type="button" className="preloader-skip" onClick={() => setPhase("exit")}>
        Skip intro
      </button>
    </div>
  );
}

export default Preloader;
