// Site designs. Each design has its own fonts, shape language, palettes
// (light + dark in styles/themes.css) and loading-screen colours.
// Keep the ids and font URLs in sync with index.html (first-paint font loader).
const themeData = [
  {
    id: "atelier",
    name: "Atelier",
    description: "Warm editorial serif",
    primary: "#cf4520",
    secondary: "#e8a13a",
    fonts:
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Instrument+Sans:wght@400..700&display=swap"
  },
  {
    id: "futuristic",
    name: "Futuristic",
    description: "Green, condensed and clean",
    primary: "#1fb872",
    secondary: "#0e9f9a",
    fonts:
      "https://fonts.googleapis.com/css2?family=Agdasima:wght@400;700&family=Manrope:wght@400..700&family=JetBrains+Mono:wght@400..600&display=swap"
  },
  {
    id: "retro",
    name: "Retro",
    description: "Brown and cream, typewriter feel",
    primary: "#8b4a22",
    secondary: "#c98b3a",
    fonts:
      "https://fonts.googleapis.com/css2?family=Young+Serif&family=Work+Sans:wght@400..700&family=Space+Mono:wght@400;700&display=swap"
  }
];

export default themeData;
