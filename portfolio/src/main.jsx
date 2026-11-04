import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import ThemeProvider from "./context/ThemeContext";
import App from "./App";

import "./styles/variables.css";
import "./styles/themes.css";
import "./styles/global.css";
import "./styles/motion.css";
import "./styles/system.css";
import "./styles/tablet.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </StrictMode>
);