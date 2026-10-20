import { motion } from "framer-motion";
import { FiArrowUpRight, FiDownload, FiMapPin, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import profileData from "../../data/profileData";
import "./Resume.css";

function Resume() {
  const resume = profileData.resume;
  const sections = [
    { number: "01", label: "EXPERIENCE", title: "Professional background", description: "Review my roles, responsibilities, outcomes and the technologies used in my work.", to: "/experience" },
    { number: "02", label: "SELECTED WORK", title: "Projects and case studies", description: "Explore the applications I have built, the problems they address and the tools behind them.", to: "/projects" },
    { number: "03", label: "ABOUT", title: "How I work", description: "Learn more about my approach to product design, full-stack development and collaboration.", to: "/about" }
  ];

  return (
    <main className="resume-page resume-compact">
      <section className="resume-hero section">
        <div className="container">
          <motion.div className="resume-hero-top" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div>
              <span className="resume-eyebrow">PROFESSIONAL RESUME</span>
              <h1>{profileData.name}<span>{profileData.shortTitle}</span></h1>
              <p>{profileData.description}</p>
            </div>
            <a href={resume.file} download className="resume-download">Download Resume <FiDownload /></a>
          </motion.div>
          <div className="resume-contact-bar">
            <span><FiMapPin />{profileData.location}</span>
            <a href={`mailto:${profileData.email}`}><FiMail />{profileData.email}</a>
            <span className="resume-availability">{profileData.availability}</span>
          </div>
        </div>
      </section>

      <section className="resume-section section">
        <div className="container resume-compact-content">
          <div className="resume-compact-intro">
            <span className="resume-eyebrow">A QUICK OVERVIEW</span>
            <h2>One place to get the full picture.</h2>
            <p>The PDF is the concise offline version. Use the links for focused details about my work, experience and approach.</p>
          </div>
          <div className="resume-compact-links">
            {sections.map((section) => (
              <Link to={section.to} className="resume-compact-link" key={section.number}>
                <span>{section.number} / {section.label}</span>
                <div><h3>{section.title}</h3><p>{section.description}</p></div>
                <FiArrowUpRight />
              </Link>
            ))}
          </div>
          <Link to="/contact" className="resume-compact-contact">Get in touch <FiArrowUpRight /></Link>
        </div>
      </section>
    </main>
  );
}

export default Resume;
