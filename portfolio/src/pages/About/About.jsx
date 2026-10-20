import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import profileData from "../../data/profileData";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-page-hero">
        <div className="container">
          <motion.div
            className="about-page-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="page-eyebrow">
              {profileData.about.eyebrow}
            </span>

            <h1>
              {profileData.shortTitle}
              <span> from idea to launch.</span>
            </h1>
            <p>{profileData.about.description}</p>
            <div className="about-hero-actions">
              <Link to="/projects" className="resume-button">Explore Projects <FiArrowUpRight /></Link>
              <Link to="/contact" className="resume-contact-link">Get in touch <FiArrowUpRight /></Link>
            </div>
          </motion.div>

        </div>
      </section>

      <section className="about-services section">
        <div className="container">
          <div className="about-section-heading">
            <div className="about-section-label">
              <span>01</span>
              <p>WHAT I DO</p>
            </div>

            <h2>
              Turning ideas into
              <span> working products.</span>
            </h2>
          </div>

          <div className="about-services-grid">
            {profileData.about.highlights.map(
              (highlight, index) => (
                <motion.article
                  className="about-service-card"
                  key={highlight}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08
                  }}
                >
                  <span className="about-service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{highlight}</h3>

                  <p>
                    {getHighlightDescription(highlight)}
                  </p>
                </motion.article>
              )
            )}
          </div>
        </div>
      </section>

      <section className="about-resume section">
        <div className="container">
          <div className="about-resume-card">
            <div>
              <span className="page-eyebrow">
                WANT THE FULL STORY?
              </span>

              <h2>
                Explore my experience and education.
              </h2>
            </div>

            <div className="about-resume-actions">
              <Link
                to="/experience"
                className="resume-button"
              >
                View Experience
                <FiArrowUpRight />
              </Link>

              <Link
                to="/contact"
                className="resume-contact-link"
              >
                Let's Talk
                <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getHighlightDescription(highlight) {
  const descriptions = {
    "Full-Stack Development":
      "Building complete web applications across the frontend, backend, APIs and database layers.",

    "UI/UX Design":
      "Designing interfaces that balance visual quality, usability and a clear user experience.",

    "Responsive Web Applications":
      "Creating interfaces that adapt smoothly across desktop, tablet and mobile devices.",

    "Problem Solving":
      "Breaking complex technical problems into practical solutions and continuously improving the implementation."
  };

  return (
    descriptions[highlight] ||
    "Creating thoughtful digital experiences with a focus on quality and usability."
  );
}

export default About;
