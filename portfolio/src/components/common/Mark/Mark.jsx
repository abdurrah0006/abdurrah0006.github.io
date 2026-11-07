import "./Mark.css";

/*
  The site's mark is the plain tag </AR>, set in the active design's display
  font at a heavy weight with a little extra stroke for a thicker, bolder
  look (Fraunces for Atelier, Playfair Display for Formal, Young Serif for Retro).
  It is real text, so it follows the theme automatically and the favicon is
  redrawn from the same font (see hooks/useThemedFavicon.js).

  Used for the navbar logo, the centre of the 3D seal, the loading screen and
  the floating background tags. Colour comes from `currentColor`.
*/
const TAG = "</AR>";

// `animate` splits the tag into letters that rise in one by one (loading screen).
function Mark({ className = "", glow = false, animate = false }) {
  return (
    <span
      className={`mark ${glow ? "mark-glow" : ""} ${className}`}
      aria-hidden="true"
    >
      {animate
        ? [...TAG].map((char, index) => (
            <span className="mark-char" style={{ "--n": index }} key={`${char}-${index}`}>
              {char}
            </span>
          ))
        : TAG}
    </span>
  );
}

// Faint </AR> tags floating behind every page, each drifting on its own path.
export function BackgroundMark() {
  return (
    <div className="bg-mark" aria-hidden="true">
      {["a", "b", "c"].map((id) => (
        <div className={`bg-mark-float bg-mark-${id}`} key={id}>
          <Mark glow />
        </div>
      ))}
    </div>
  );
}

export default Mark;
