import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import PageHero from "../../components/common/PageHero/PageHero";
import { RevealHeading, RiseIn, SectionIndex } from "../../components/common/Motion/Motion";
import profileData from "../../data/profileData";
import pagesData from "../../data/pagesData";
import projectsData from "../../data/projectsData";
import skillsData from "../../data/skillsData";
import experienceData from "../../data/experienceData";
import "./About.css";

const page = pagesData.about;

// Reading order: who (hero + facts) > numbers > what I do > tools > path > next step.
function About() {
  const { experience, education, certifications } = experienceData;

  const meta = [
    { label: "Based in", value: profileData.location },
    { label: "Status", value: profileData.availability },
    { label: "Studying", value: education[0].qualification },
    { label: "Email", value: profileData.email }
  ];

  const stats = [
    { value: projectsData.length, label: "Projects built" },
    { value: experience.length, label: "Internships" },
    { value: certifications.length, label: "Certifications" },
    { value: skillsData.categories.length, label: "Skill areas" }
  ];

  return (
    <div className="ui-page about-page">
      <PageHero
        index={page.index}
        label={page.label}
        note={page.note}
        title={`${profileData.shortTitle} _${page.titleAccent}_`}
        kicker={profileData.about.title}
        lead={profileData.about.description}
        meta={meta}
      >
        <Link to={page.actions.primary.to} className="ui-btn">
          {page.actions.primary.label}
          <FiArrowUpRight />
        </Link>
        <Link to={page.actions.secondary.to} className="ui-link">
          {page.actions.secondary.label}
          <FiArrowUpRight />
        </Link>
      </PageHero>

      <section className="about-stats" aria-label={page.glanceLabel}>
        <div className="container">
          <dl>
            {stats.map((stat, index) => (
              <RiseIn className="about-stat" delay={index * 80} key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{String(stat.value).padStart(2, "0")}</dd>
              </RiseIn>
            ))}
          </dl>
        </div>
      </section>

      <section className="ui-section" data-reveal-skip>
        <div className="container">
          <SectionIndex number={page.services.index} label={page.services.label} />
          <RevealHeading className="ui-h2" text={page.services.title} />

          <ol className="about-services">
            {profileData.about.services.map((service, index) => (
              <RiseIn as="li" className="about-service" delay={(index % 3) * 70} key={service.title}>
                <span className="ui-label">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="ui-h3">{service.title}</h3>
                <p>{service.description}</p>
              </RiseIn>
            ))}
          </ol>
        </div>
      </section>

      <section className="ui-section ui-section-alt" data-reveal-skip>
        <div className="container">
          <SectionIndex number={page.toolkit.index} label={page.toolkit.label} />
          <RevealHeading className="ui-h2" text={page.toolkit.title} />

          <div className="about-toolkit">
            {skillsData.categories.map((category, index) => (
              <RiseIn className="about-tool-group" delay={(index % 3) * 70} key={category.id}>
                <h3 className="ui-h3">{category.title}</h3>
                <ul className="ui-chips">
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </RiseIn>
            ))}
          </div>
        </div>
      </section>

      <section className="ui-section" data-reveal-skip>
        <div className="container">
          <SectionIndex number={page.journey.index} label={page.journey.label} />

          <div className="ui-section-head">
            <RevealHeading className="ui-h2" text={page.journey.title} />
            <Link to="/experience" className="ui-link">
              {page.journey.link}
              <FiArrowUpRight />
            </Link>
          </div>

          <div className="about-journey">
            <ul>
              {experience.map((item, index) => (
                <RiseIn as="li" delay={index * 60} key={item.id}>
                  <span className="ui-label">{item.period}</span>
                  <strong>{item.role}</strong>
                  <span>{item.company}</span>
                </RiseIn>
              ))}
            </ul>

            <ul>
              {education.map((item, index) => (
                <RiseIn as="li" delay={index * 60} key={item.id}>
                  <span className="ui-label">{item.period}</span>
                  <strong>{item.qualification}</strong>
                  <span>{item.institution}</span>
                </RiseIn>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ui-section" data-reveal-skip>
        <div className="container">
          <RiseIn className="ui-cta">
            <div>
              <span className="ui-label">{page.cta.eyebrow}</span>
              <RevealHeading className="about-cta-title" text={page.cta.title} />
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

export default About;
