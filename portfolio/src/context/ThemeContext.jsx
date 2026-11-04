import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import themeData from "../data/themeData";
import { wake } from "../hooks/scrollEngine";
import useThemedFavicon from "../hooks/useThemedFavicon";

/*
  Everything lives on <html> so CSS can react to it:
    data-design = atelier | voltage | studio   (fonts, shapes, palette)
    data-mode   = light | dark                 (independent of the design)
    data-motion = full | reduced               (user toggle or system setting)
    data-intro  = playing | done               (loading screen state)
  index.html applies the saved values before first paint.
*/

const ThemeContext = createContext(null);

const DESIGN_KEY = "portfolio-design";
const MODE_KEY = "portfolio-mode";
const MOTION_KEY = "portfolio-motion";
const INTRO_KEY = "portfolio-intro-seen";
const designIds = themeData.map(({ id }) => id);

function readStored(key, storage = "local") {
  try {
    return (storage === "session" ? sessionStorage : localStorage).getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key, value, storage = "local") {
  try {
    (storage === "session" ? sessionStorage : localStorage).setItem(key, value);
  } catch {
    // Storage can be blocked (private mode); settings still work for this visit.
  }
}

function loadDesignFonts(id) {
  const url = themeData.find((item) => item.id === id)?.fonts;
  if (!url || document.querySelector(`link[href="${url}"]`)) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}

function ThemeProvider({ children }) {
  const [design, setDesign] = useState(() => {
    const saved = readStored(DESIGN_KEY);
    return designIds.includes(saved) ? saved : designIds[0];
  });
  const [mode, setMode] = useState(() =>
    readStored(MODE_KEY) === "dark" ? "dark" : "light"
  );
  const [motionPreference, setMotionPreference] = useState(() =>
    readStored(MOTION_KEY) === "reduced" ? "reduced" : "full"
  );
  const [systemReduced, setSystemReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [introRun, setIntroRun] = useState(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const motionReduced = systemReduced || motionPreference === "reduced";

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.design = design;
    root.dataset.mode = mode;
    root.dataset.motion = motionReduced ? "reduced" : "full";
    writeStored(DESIGN_KEY, design);
    writeStored(MODE_KEY, mode);
    writeStored(MOTION_KEY, motionPreference);
    loadDesignFonts(design);
    wake();
  }, [design, mode, motionReduced, motionPreference]);

  // Tab icon follows the design: same font as the logo, same colours.
  useThemedFavicon(design, mode);

  const changeDesign = useCallback((id) => {
    if (designIds.includes(id)) setDesign(id);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setMode((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const toggleMotion = useCallback(() => {
    setMotionPreference((current) => (current === "reduced" ? "full" : "reduced"));
  }, []);

  const replayIntro = useCallback(() => {
    try {
      sessionStorage.removeItem(INTRO_KEY);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.dataset.intro = "playing";
    setIntroRun((run) => run + 1);
  }, []);

  const value = useMemo(
    () => ({
      design,
      mode,
      motionReduced,
      introRun,
      changeDesign,
      toggleDarkMode,
      toggleMotion,
      replayIntro
    }),
    [design, mode, motionReduced, introRun, changeDesign, toggleDarkMode, toggleMotion, replayIntro]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
