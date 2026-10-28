import {
  FiArrowUpRight,
  FiDroplet,
  FiFeather,
  FiGithub,
  FiHeart,
  FiLinkedin,
  FiMail,
  FiStar,
  FiZap
} from "react-icons/fi";
import { Link } from "react-router-dom";
import profileData from "../../../data/profileData";
import navigationData from "../../../data/navigationData";
import themeData from "../../../data/themeData";
import contactData from "../../../data/contactData";
import { useTheme } from "../../../context/ThemeContext";
import "./Footer.css";

const accentIcons = {
  purple: FiStar,
  rose: FiHeart,
  orange: FiZap,
  blue: FiDroplet,
  green: FiFeather
};

function Footer() {
  const currentYear = new Date().getFullYear();
  const { accent, changeAccent } = useTheme();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              {profileData.firstName}
              <span>.</span>
            </Link>

            <p className="footer-title">
              {profileData.title}
            </p>

            <p className="footer-description">
              {profileData.description}
            </p>

            <div className="footer-status">
              <span className="footer-status-dot" />
              {profileData.availability}
            </div>
          </div>

          <div className="footer-column">
            <span className="footer-column-title">
              Navigation
            </span>

            <nav className="footer-navigation">
              {navigationData.map((item) => (
                <Link
                  to={item.path}
                  key={item.path}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-column">
            <span className="footer-column-title">
              Connect
            </span>

            <div className="footer-socials">
              {contactData.socialLinks.map((social) => {
                const Icon =
                  social.id === "github"
                    ? FiGithub
                    : social.id === "linkedin"
                      ? FiLinkedin
                      : FiMail;

                return (
                  <a
                    href={social.url}
                    key={social.id}
                    target={
                      social.id === "email"
                        ? undefined
                        : "_blank"
                    }
                    rel={
                      social.id === "email"
                        ? undefined
                        : "noreferrer"
                    }
                  >
                    <Icon />
                    {social.label}
                    <FiArrowUpRight />
                  </a>
                );
              })}
            </div>

            <a
              href={`mailto:${contactData.email}`}
              className="footer-email"
            >
              {contactData.email}
            </a>
          </div>

          <div className="footer-column footer-theme">
            <span className="footer-column-title">
              Theme
            </span>

            <div className="accent-picker" role="group" aria-label="Accent colour">
              {themeData.map((item) => {
                const Icon = accentIcons[item.id];

                return (
                <button
                  type="button"
                  key={item.id}
                  className={`accent-swatch ${item.id === accent ? "is-active" : ""}`}
                  style={{
                    "--swatch-from": item.primary,
                    "--swatch-to": item.secondary
                  }}
                  onClick={() => changeAccent(item.id)}
                  aria-pressed={item.id === accent}
                  aria-label={`${item.name} theme`}
                  title={item.name}
                >
                  <Icon aria-hidden="true" />
                </button>
                );
              })}
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} {profileData.name}. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <span>{profileData.location}</span>

            <span className="footer-divider" />

            <span>Built with React</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
