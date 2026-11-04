import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { ScrollWords, SectionIndex } from "../../common/Motion/Motion";
import profileData from "../../../data/profileData";
import "./AboutPreview.css";

const { about, home } = profileData;

// "01 / About", in three clear tiers: a huge headline that reads in as you
// scroll, a supporting paragraph, then small tags and a link.
function AboutPreview() {
  return (
    <section className="statement" id="statement" data-reveal-skip>
      <div className="container">
        <SectionIndex
          number="01"
          label={home.sections.about.label}
          note={home.sections.about.note}
        />

        <div className="statement-grid">
          <ScrollWords className="statement-title" text={about.title} />

          <div className="statement-side">
            <p className="statement-lead">{about.description}</p>

            <ul className="statement-pills" aria-label="Services">
              {about.services.map((service) => (
                <li key={service.title}>{service.title}</li>
              ))}
            </ul>

            <Link to="/about" className="statement-link">
              More about me
              <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
