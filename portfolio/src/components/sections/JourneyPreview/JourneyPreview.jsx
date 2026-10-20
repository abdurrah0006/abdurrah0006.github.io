import { motion } from "framer-motion";
import { FiArrowUpRight, FiBriefcase } from "react-icons/fi";
import { LuGraduationCap } from "react-icons/lu";
import { Link } from "react-router-dom";
import experienceData from "../../../data/experienceData";
import SectionTitle from "../../common/SectionTitle/SectionTitle";
import "./JourneyPreview.css";

function JourneyPreview() {
  const { experience, education } = experienceData;

  return (
    <section className="journey-preview section">
      <div className="container">
        <div className="journey-header">
          <SectionTitle
            eyebrow="My Journey"
            title="Experience that shaped how I build."
            description="A snapshot of my professional development, education and experience in technology."
          />

          <Link to="/experience" className="journey-view-link">
            View Full Journey
            <FiArrowUpRight />
          </Link>
        </div>

        <div className="journey-grid">
          <div className="journey-column">
            <div className="journey-column-heading">
              <span className="journey-icon">
                <FiBriefcase />
              </span>

              <div>
                <span>EXPERIENCE</span>
                <h3>Professional Experience</h3>
              </div>
            </div>

            <div className="timeline">
              {experience.map((item, index) => (
                <motion.article
                  className="timeline-item"
                  key={item.id}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                >
                  <div className="timeline-marker" />

                  <div className="timeline-content">
                    <div className="timeline-top">
                      <span className="timeline-period">
                        {item.period}
                      </span>

                      <span className="timeline-type">
                        {item.type}
                      </span>
                    </div>

                    <h4>{item.role}</h4>

                    <span className="timeline-company">
                      {item.company}
                    </span>

                    <p>{item.description}</p>

                    <div className="timeline-technologies">
                      {item.technologies.map((technology) => (
                        <span key={technology}>
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="journey-column education-column">
            <div className="journey-column-heading">
              <span className="journey-icon">
                <LuGraduationCap />
              </span>

              <div>
                <span>EDUCATION</span>
                <h3>Academic Background</h3>
              </div>
            </div>

            {education.map((item) => (
              <motion.article
                className="education-card"
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                <span className="education-period">
                  {item.period}
                </span>

                <h4>{item.qualification}</h4>

                <span className="education-institution">
                  {item.institution}
                </span>

                <p>{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default JourneyPreview;