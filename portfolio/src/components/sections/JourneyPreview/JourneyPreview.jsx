import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { RevealHeading, RiseIn, SectionIndex } from "../../common/Motion/Motion";
import experienceData from "../../../data/experienceData";
import profileData from "../../../data/profileData";
import "./JourneyPreview.css";

const { journey } = profileData.home.sections;

// "05 / Experience": a ledger of roles, then education.
function JourneyPreview() {
  const { experience, education } = experienceData;

  return (
    <section className="path" id="experience" data-reveal-skip>
      <div className="container">
        <SectionIndex number="05" label={journey.label} note={journey.note} />

        <div className="path-head">
          <RevealHeading className="path-title" text={journey.title} />
          <Link to="/experience" className="statement-link">
            Full journey
            <FiArrowUpRight />
          </Link>
        </div>

        <ol className="path-roles">
          {experience.map((item, index) => (
            <RiseIn as="li" className="path-role" delay={index * 70} key={item.id}>
              <span className="path-period">{item.period}</span>

              <div className="path-main">
                <h3>{item.role}</h3>
                <span className="path-company">
                  {item.company} · {item.type}
                </span>
              </div>

              <div className="path-detail">
                <p>{item.description}</p>
                <ul className="path-tech">
                  {item.technologies.slice(0, 5).map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
              </div>
            </RiseIn>
          ))}
        </ol>

        <div className="path-education">
          <h3>Education</h3>
          <ul>
            {education.map((item, index) => (
              <RiseIn as="li" delay={index * 70} key={item.id}>
                <span className="path-period">{item.period}</span>
                <strong>{item.qualification}</strong>
                <span className="path-company">{item.institution}</span>
              </RiseIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default JourneyPreview;
