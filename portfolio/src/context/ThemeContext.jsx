import { createContext, useContext, useEffect, useState } from "react";
import themeData from "../data/themeData";

export const ThemeContext = createContext(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}

const accents = themeData.map(({ id }) => id);

function ThemeProvider({ children }) {
  const [accent, setAccent] = useState(() => {
    const savedAccent = localStorage.getItem("portfolio-accent");
    const legacyTheme = localStorage.getItem("portfolio-theme");
    const initialAccent = savedAccent || legacyTheme;
    return accents.includes(initialAccent) ? initialAccent : "rose";
  });
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("portfolio-mode");
    const legacyTheme = localStorage.getItem("portfolio-theme");
    return savedMode === "dark" || (!savedMode && legacyTheme === "dark")
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-mode", mode);
    root.setAttribute("data-accent", accent);
    localStorage.setItem("portfolio-mode", mode);
    localStorage.setItem("portfolio-accent", accent);
  }, [accent, mode]);

  const changeAccent = (newAccent) => {
    if (!accents.includes(newAccent)) return;
    setAccent(newAccent);
    document.documentElement.setAttribute("data-accent", newAccent);
    localStorage.setItem("portfolio-accent", newAccent);
  };

  const toggleDarkMode = () => {
    setMode((currentMode) =>
      currentMode === "dark" ? "light" : "dark"
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        accent,
        accents,
        changeAccent,
        toggleDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;

