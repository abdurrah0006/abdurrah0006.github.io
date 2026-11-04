import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { RevealHeading, SectionIndex } from "../../common/Motion/Motion";
import profileData from "../../../data/profileData";
import "./ServicesPanels.css";

const { about, home } = profileData;
const { services: copy } = home.sections;

// "02 / What I do": a row of panels. Hover, focus or tap one and it opens up
// to show the description; on small screens they stack as an accordion.
function ServicesPanels() {
  const [active, setActive] = useState(0);

  return (
    <section className="services" id="services" data-reveal-skip>
      <div className="container">
        <SectionIndex number="02" label={copy.label} note={copy.note} />
        <RevealHeading className="services-title" text={copy.title} />

        <div className="services-row" role="list">
          {about.services.map((service, index) => {
            const open = index === active;

            return (
              <article
                className={`services-panel ${open ? "is-open" : ""}`}
                key={service.title}
                role="listitem"
                onMouseEnter={() => setActive(index)}
              >
                <button
                  type="button"
                  className="services-trigger"
                  aria-expanded={open}
                  aria-controls={`service-${index}`}
                  onClick={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className="services-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="services-name">{service.title}</span>
                </button>

                <div className="services-body" id={`service-${index}`}>
                  <p>{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        <Link to="/about" className="ui-link services-link">
          More about how I work
          <FiArrowUpRight />
        </Link>
      </div>
    </section>
  );
}

export default ServicesPanels;
