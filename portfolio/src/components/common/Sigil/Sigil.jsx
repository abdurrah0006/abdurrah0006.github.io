import "./Sigil.css";

/*
  The site's mark: a cyber-sigil with the tag </AR> written across its centre.
  One drawing is reused for the navbar logo, the emblem core, the loading
  animation, the favicon (public/favicon.svg) and the faint background glow.

  - THORNS: tapering blades for the top-right quarter, mirrored into the
    other three quarters so the mark is perfectly symmetrical (filled).
  - GLYPHS: the letters of </AR>, drawn as strokes so they never depend on a
    font and stay crisp at small sizes.
  Colour comes from `currentColor`.
*/
const QUARTER = [
  "M54 37C60 24 72 14 90 4C80 18 72 28 62 38Z", // main sweeping thorn
  "M62 36C70 31 78 30 94 20C84 34 74 38 66 40Z", // secondary curl
  "M58 35C60 28 62 22 60 12C64 22 64 30 62 37Z", // short upright thorn
  "M88 46C92 44 96 42 99 38C96 44 92 48 88 50Z" // barb at the end of the tag
];

const AXIS = [
  "M50 3L53 31L50 37L47 31Z", // top spike
  "M50 97L53 69L50 63L47 69Z" // bottom spike
];

const GLYPHS = [
  "M28 40L17 50L28 60", // <
  "M32 60L38 40", // /
  "M42 60L48 40L54 60M44.2 53.5H51.8", // A
  "M57.5 60V40H63.7a4.8 4.8 0 0 1 0 9.6H57.5M63 49.6L68.5 60", // R
  "M72 40L83 50L72 60" // >
];

const MIRRORS = [
  "",
  "translate(100 0) scale(-1 1)",
  "translate(0 100) scale(1 -1)",
  "translate(100 100) scale(-1 -1)"
];

// The mark as raw SVG shapes, so it can sit inside any other <svg>
// (the loading screen draws it stroke by stroke with `animate`).
export function SigilShapes({ animate = false }) {
  return (
    <>
      {MIRRORS.map((transform) => (
        <g transform={transform || undefined} key={transform || "base"}>
          {QUARTER.map((d, index) => (
            <path
              className={animate ? "sigil-thorn" : undefined}
              style={animate ? { "--n": index } : undefined}
              d={d}
              key={d}
            />
          ))}
        </g>
      ))}

      {AXIS.map((d) => (
        <path className={animate ? "sigil-thorn" : undefined} style={animate ? { "--n": 4 } : undefined} d={d} key={d} />
      ))}

      <g className="sigil-tag">
        {GLYPHS.map((d, index) => (
          <path
            className={animate ? "sigil-glyph" : undefined}
            style={animate ? { "--n": index } : undefined}
            pathLength="1"
            d={d}
            key={d}
          />
        ))}
      </g>
    </>
  );
}

function Sigil({ className = "", glow = false, animate = false }) {
  return (
    <svg
      className={`sigil ${glow ? "sigil-glow" : ""} ${className}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <SigilShapes animate={animate} />
    </svg>
  );
}

// Huge faint sigil fixed behind every page, slowly breathing.
export function BackgroundSigil() {
  return (
    <div className="bg-sigil" aria-hidden="true">
      <Sigil glow />
    </div>
  );
}

export default Sigil;
