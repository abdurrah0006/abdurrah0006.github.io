import { Link } from "react-router-dom";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import PageHero from "../../components/common/PageHero/PageHero";
import { RevealHeading, RiseIn, SectionIndex } from "../../components/common/Motion/Motion";
import profileData from "../../data/profileData";
import pagesData from "../../data/pagesData";
import "./Resume.css";

const page = pagesData.resume;

function Resume() {
  return (
    <div className="ui-page resume-page">
      <PageHero
        index={page.index}
        label={page.label}
        note={page.note}
        title={`${profileData.name} _${profileData.shortTitle}_`}
        lead={profileData.description}
        meta={[
          { label: "Location", value: profileData.location },
          { label: "Email", value: profileData.email },
          { label: "Status", value: profileData.availability }
        ]}
      >
        <a href={profileData.resume.file} download className="ui-btn">
          {page.download}
          <FiDownload />
        </a>
      </PageHero>

      <section className="ui-section" data-reveal-skip>
        <div className="container">
          <SectionIndex number="01" label={page.overview.eyebrow} />

          <div className="resume-intro">
            <RevealHeading className="ui-h2" text={page.overview.title} />
            <p className="ui-lead">{page.overview.text}</p>
          </div>

          <ul className="resume-links">
            {page.links.map((item, index) => (
              <RiseIn as="li" delay={index * 80} key={item.number}>
                <Link to={item.to} className="resume-link">
                  <span className="ui-label">
                    {item.number} / {item.label}
                  </span>
                  <div>
                    <h3 className="ui-h3">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <FiArrowUpRight />
                </Link>
              </RiseIn>
            ))}
          </ul>

          <Link to={page.contact.to} className="ui-btn resume-contact">
            {page.contact.label}
            <FiArrowUpRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Resume;
