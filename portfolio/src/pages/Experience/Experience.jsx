import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import PageHero from "../../components/common/PageHero/PageHero";
import { RevealHeading, RiseIn, SectionIndex } from "../../components/common/Motion/Motion";
import experienceData from "../../data/experienceData";
import pagesData from "../../data/pagesData";
import "./Experience.css";

const page = pagesData.experience;

function Experience() {
  const { experience, education, certifications } = experienceData;

  return (
    <div className="ui-page experience-page">
      <PageHero
        index={page.index}
        label={page.label}
        note={page.note}
        title={page.title}
        lead={page.lead}
        meta={[
          { label: "Internships", value: String(experience.length) },
          { label: "Certifications", value: String(certifications.length) }
        ]}
      >
        <Link to={page.heroLink.to} className="ui-link">
          {page.heroLink.label}
          <FiArrowUpRight />
        </Link>
      </PageHero>

      <section className="ui-section" data-reveal-skip>
        <div className="container">
          <SectionIndex number={page.roles.index} label={page.roles.label} />
          <RevealHeading className="ui-h2" text={page.roles.title} />

          <ol className="xp-timeline">
            {experience.map((item, index) => (
              <RiseIn as="li" className="xp-item" key={item.id}>
                <span className="xp-marker" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="xp-when">
                  <strong>{item.period}</strong>
                  <span>{item.location}</span>
                </div>

                <div className="xp-what">
                  <span className="ui-label">{item.type}</span>
                  <h3 className="ui-h3 xp-role">{item.role}</h3>
                  <span className="xp-company">{item.company}</span>
                  <p>{item.description}</p>

                  <h4 className="ui-label xp-sub">{page.roles.highlights}</h4>
                  <ul className="xp-points">
                    {item.responsibilities.map((responsibility) => (
                      <li key={responsibility}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              </RiseIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="ui-section ui-section-alt" data-reveal-skip>
        <div className="container">
          <SectionIndex number={page.education.index} label={page.education.label} />
          <RevealHeading className="ui-h2" text={page.education.title} />

          <div className="xp-education">
            {education.map((item) => (
              <RiseIn className="xp-edu-item" key={item.id}>
                <span className="ui-label">{item.period}</span>
                <div>
                  <h3 className="ui-h3">{item.qualification}</h3>
                  <span className="xp-company">{item.institution}</span>
                  <p>{item.description}</p>
                </div>
              </RiseIn>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-section" data-reveal-skip>
        <div className="container">
          <SectionIndex number={page.certifications.index} label={page.certifications.label} />
          <RevealHeading className="ui-h2" text={page.certifications.title} />

          <div className="xp-certs">
            {certifications.map((certification, index) => (
              <RiseIn
                as="article"
                className="xp-cert ui-card"
                delay={(index % 3) * 70}
                key={certification.id}
              >
                <span className="ui-label">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="ui-h3">{certification.title}</h3>
                <p>{certification.issuer}</p>
                {certification.period ? (
                  <small className="ui-label">{certification.period}</small>
                ) : null}
              </RiseIn>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-section" data-reveal-skip>
        <div className="container">
          <RiseIn className="ui-cta">
            <div>
              <span className="ui-label">{page.cta.eyebrow}</span>
              <RevealHeading as="h2" text={page.cta.title} />
            </div>
            <div className="ui-actions">
              <Link to={page.cta.primary.to} className="ui-btn">
                {page.cta.primary.label}
                <FiArrowUpRight />
              </Link>
              <Link to={page.cta.secondary.to} className="ui-link">
                {page.cta.secondary.label}
                <FiArrowUpRight />
              </Link>
            </div>
          </RiseIn>
        </div>
      </section>
    </div>
  );
}

export default Experience;
