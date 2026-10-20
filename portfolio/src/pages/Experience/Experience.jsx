import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import experienceData from "../../data/experienceData";
import "./Experience.css";

function Experience() {
  return (
    <div className="experience-page">
      <section className="experience-page-hero">
        <div className="container">
          <motion.div
            className="experience-page-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="page-eyebrow">PROFESSIONAL EXPERIENCE · 2025</span>

            <h1>
              Practical work.
              <span> Continuous learning.</span>
            </h1>

            <p>
              Three remote development internships alongside formal education and continued study. This page focuses on the roles, responsibilities and credentials behind my full-stack work.
            </p>
            <Link to="/projects" className="experience-cta-primary experience-hero-link">See selected projects <FiArrowUpRight /></Link>
          </motion.div>
        </div>
      </section>

      <section id="experience-timeline" className="experience-timeline section">
        <div className="container">
          <div className="experience-section-heading">
            <div className="experience-section-label">
              <span>01</span>
              <p>PROFESSIONAL EXPERIENCE</p>
            </div>

            <div>
              <h2>Internship roles and responsibilities.</h2>
            </div>
          </div>

          <div className="experience-list">
            {experienceData.experience.map(
              (experience, index) => (
                <ExperienceItem
                  key={experience.id}
                  experience={experience}
                  index={index}
                />
              )
            )}
          </div>
        </div>
      </section>

      <section className="experience-education section">
        <div className="container">
          <div className="experience-section-heading">
            <div className="experience-section-label">
              <span>02</span>
              <p>EDUCATION</p>
            </div>

            <div>
              <h2>
                Building the
                <span> foundation.</span>
              </h2>
            </div>
          </div>

          <div className="education-list">
            {experienceData.education.map((item) => (
              <article
                className="education-item"
                key={item.id}
              >
                <div className="education-period">
                  {item.period}
                </div>

                <div>
                  <h3>{item.qualification}</h3>

                  <h4>{item.institution}</h4>

                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="experience-certifications section">
        <div className="container">
          <div className="experience-section-heading">
            <div className="experience-section-label">
              <span>03</span>
              <p>CERTIFICATIONS</p>
            </div>

            <div>
              <h2>
                Learning beyond
                <span> the classroom.</span>
              </h2>
            </div>
          </div>

          <div className="certifications-grid">
            {experienceData.certifications.map(
              (certification, index) => (
                <motion.article
                  className="experience-certification-card"
                  key={certification.id}
                  initial={{
                    opacity: 0,
                    y: 25
                  }}
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
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{certification.title}</h3>

                  <p>{certification.issuer}</p>
                </motion.article>
              )
            )}
          </div>
        </div>
      </section>

      <section className="experience-cta section">
        <div className="container">
          <div className="experience-cta-card">
            <div>
              <span className="page-eyebrow">
                SEE WHAT I BUILD
              </span>

              <h2>
                Experience is best shown
                <span> through the work.</span>
              </h2>
            </div>

            <div className="experience-cta-actions">
              <Link
                to="/projects"
                className="experience-cta-primary"
              >
                View Projects
                <FiArrowUpRight />
              </Link>

              <Link
                to="/contact"
                className="experience-cta-secondary"
              >
                Get In Touch
                <FiArrowUpRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ExperienceItem({ experience, index }) {
  return (
    <motion.article
      className="experience-item"
      initial={{
        opacity: 0,
        y: 30
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        amount: 0.15
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.08
      }}
    >
      <div className="experience-item-marker">
        <span>{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="experience-item-period">
        <span>{experience.period}</span>
        <small>{experience.location}</small>
      </div>

      <div className="experience-item-content">
        <div className="experience-item-header">
          <div>
            <span className="experience-type">
              {experience.type}
            </span>

            <h3>{experience.role}</h3>

            <h4>{experience.company}</h4>
          </div>
        </div>

        <p className="experience-item-description">
          {experience.description}
        </p>

        <div className="experience-detail-grid">
          <div>
            <h5>Work Highlights</h5>
            <ul>
              {experience.responsibilities.map((responsibility) => (
                <li key={responsibility}>{responsibility}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default Experience;
