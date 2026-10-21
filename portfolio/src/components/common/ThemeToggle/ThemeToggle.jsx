import { useTheme } from "../../../context/ThemeContext";
import { FiDroplet, FiFeather, FiHeart, FiSun, FiZap } from "react-icons/fi";
import "./ThemeToggle.css";

const accentOptions = [
  { id: "purple", name: "Purple", color: "#7c3aed", Icon: FiZap },
  { id: "orange", name: "Orange", color: "#ea580c", Icon: FiSun },
  { id: "rose", name: "Rose", color: "#e11d48", Icon: FiHeart },
  { id: "green", name: "Green", color: "#16a34a", Icon: FiFeather },
  { id: "blue", name: "Blue", color: "#2563eb", Icon: FiDroplet }
];

function ThemeToggle() {
  const { accent, changeAccent } = useTheme();

  return (
    <div className="theme-selector">
      <div
        className="theme-toggle-options"
        role="group"
        aria-label="Choose accent color"
      >
        {accentOptions.map(({ id, name, color, Icon }) => (
            <button
              key={id}
              type="button"
              className={`theme-option theme-option-${id}${accent === id ? " active" : ""}`}
              style={{ "--theme-swatch": color }}
              onClick={() => changeAccent(id)}
              aria-label={`Use ${name.toLowerCase()} accent color`}
              aria-pressed={accent === id}
              title={`${name} accent`}
            >
              <Icon aria-hidden="true" />
            </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeToggle;
