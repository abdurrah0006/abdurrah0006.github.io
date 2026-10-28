import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import themeData from "../data/themeData";

/*
  Two independent settings, both stored on <html>:
    data-accent = purple | blue | rose   (brand colour)
    data-mode   = light | dark           (surfaces and text)
  index.html applies the saved values before first paint to avoid a flash.
*/

const ThemeContext = createContext(null);

const ACCENT_KEY = "portfolio-accent";
const MODE_KEY = "portfolio-mode";
const accentIds = themeData.map(({ id }) => id);

function readStored(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStored(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage can be blocked (private mode); the theme still works for this visit.
  }
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}

function ThemeProvider({ children }) {
  const [accent, setAccent] = useState(() => {
    const saved = readStored(ACCENT_KEY);
    return accentIds.includes(saved) ? saved : accentIds[0];
  });
  const [mode, setMode] = useState(() =>
    readStored(MODE_KEY) === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.accent = accent;
    root.dataset.mode = mode;
    writeStored(ACCENT_KEY, accent);
    writeStored(MODE_KEY, mode);
  }, [accent, mode]);

  const changeAccent = useCallback((id) => {
    if (accentIds.includes(id)) setAccent(id);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setMode((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(
    () => ({ mode, accent, changeAccent, toggleDarkMode }),
    [mode, accent, changeAccent, toggleDarkMode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
