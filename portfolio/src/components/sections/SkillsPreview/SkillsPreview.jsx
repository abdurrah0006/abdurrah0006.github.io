import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { RevealHeading, RiseIn, SectionIndex } from "../../common/Motion/Motion";
import skillsData from "../../../data/skillsData";
import profileData from "../../../data/profileData";
import "./SkillsPreview.css";

const { toolkit } = profileData.home.sections;

// "04 / Toolkit": every skill category as an editorial column.
function SkillsPreview() {
  return (
    <section className="toolkit" id="toolkit" data-reveal-skip>
      <div className="container">
        <SectionIndex number="04" label={toolkit.label} note={toolkit.note} />

        <div className="toolkit-head">
          <RevealHeading className="toolkit-title" text={toolkit.title} />
          <Link to="/about" className="statement-link">
            View all skills
            <FiArrowUpRight />
          </Link>
        </div>

        <div className="toolkit-grid">
          {skillsData.categories.map((category, index) => (
            <RiseIn
              as="article"
              className="toolkit-group"
              delay={(index % 3) * 90}
              key={category.id}
            >
              <span className="toolkit-number">{String(index + 1).padStart(2, "0")}</span>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <ul>
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </RiseIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsPreview;
