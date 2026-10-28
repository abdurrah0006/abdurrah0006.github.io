import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import profileData from "../../../data/profileData";
import contactData from "../../../data/contactData";
import Button from "../../common/Button/Button";
import projectsData from "../../../data/projectsData";
import experienceData from "../../../data/experienceData";
import { useTheme } from "../../../context/ThemeContext";
import "./Hero.css";

const HeroScene = lazy(() => import("../../3d/HeroScene/HeroScene"));
const socialLinks = Array.isArray(contactData?.socialLinks)
  ? contactData.socialLinks
  : [];
const projectCount = Array.isArray(projectsData) ? projectsData.length : 0;
const internshipCount = Array.isArray(experienceData?.experience)
  ? experienceData.experience.length
  : 0;
const heroStats = [
  { value: `${projectCount}`, label: "Projects" },
  { value: `${internshipCount}`, label: "Internships" },
  { value: "2", label: "Year of Experience" }
];

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  mail: FiMail
};

function Hero() {
  const { accent } = useTheme();
  return (
    <section className="hero">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="hero-grid" />
      </div>

      <div className="container hero-container">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="hero-availability">
            <span className="availability-dot" />
            <span>{profileData.availability}</span>
          </div>

          <p className="hero-eyebrow">
            {profileData.heroVisual?.label || "BUILD / DESIGN / CREATE"}
          </p>

          <p className="hero-greeting">Hello, I'm</p>

          <h1 className="hero-name">
            {profileData.firstName}
            <span> {profileData.lastName}</span>
          </h1>

          <h2 className="hero-title">{profileData.title}</h2>

          <p className="hero-tagline">{profileData.tagline}</p>

          <p className="hero-description">{profileData.description}</p>

          <div className="hero-actions">
            <Button to="/projects">
              View My Work
              <FiArrowUpRight />
            </Button>

            <Button to="/contact" variant="secondary">
              Let's Connect
            </Button>
          </div>

          
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          <div className="hero-visual-label">
            <span className="hero-visual-label-dot" />
            {profileData.heroVisual?.label || "DIGITAL EXPERIENCE"}
          </div>

          <Suspense
            fallback={
              <div
                className="hero-scene hero-scene-loading"
                aria-label="Loading 3D portfolio visual"
              />
            }
          >
            <HeroScene
              accent={accent}
              technologies={profileData.heroVisual?.technologies || []}
            />
          </Suspense>
        </motion.div>
      </div>

      <div className="container hero-bottom">
        {socialLinks.length > 0 && (
            <div className="hero-socials">
              {socialLinks.map((social) => {
                const Icon = socialIcons[social.id] || socialIcons[social.icon];

                return (
                  <a
                    key={social.id}
                    href={social.href || social.url}
                    target={social.id === "email" ? undefined : "_blank"}
                    rel={social.id === "email" ? undefined : "noreferrer"}
                    aria-label={social.label}
                    className="hero-social"
                  >
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>
          )}

        <div className="hero-stats">
          {heroStats.map((stat) => (
            <div className="hero-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

export default Hero;
