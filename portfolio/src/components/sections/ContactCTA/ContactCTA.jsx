import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { RevealHeading, RiseIn, SectionIndex } from "../../common/Motion/Motion";
import contactData from "../../../data/contactData";
import profileData from "../../../data/profileData";
import "./ContactCTA.css";

const { contact } = profileData.home.sections;

// "06 / Contact": the closing statement, set on an inverted panel.
function ContactCTA() {
  // Highlight the last word of the title in the accent style.
  const title = contactData.title.replace(/(\S+)$/, "_$1_");

  return (
    <section className="cta" id="contact" data-reveal-skip>
      <div className="cta-panel">
        <div className="container">
          <SectionIndex number="06" label={contact.label} note={contact.note} />

          <div className="cta-grid">
            <div className="cta-copy">
              <RevealHeading as="h2" className="cta-title" text={title} />

              <RiseIn className="cta-body">
                <p>{contactData.description}</p>

                <Link
                  to="/contact"
                  state={{ scrollTo: "contact-form" }}
                  className="cta-button"
                >
                  {contact.action}
                  <FiArrowUpRight />
                </Link>
              </RiseIn>
            </div>

            <RiseIn className="cta-links" delay={140}>
              <div>
                <span className="cta-status">{contactData.availability}</span>
                <a href={`mailto:${contactData.email}`} className="cta-email">
                  {contactData.email}
                </a>
              </div>

              <div>
                <span className="cta-status">{contact.socialsLabel}</span>
                <div className="cta-socials">
                  {contactData.socialLinks.map((social) => (
                    <a
                      href={social.url}
                      key={social.id}
                      target={social.id === "email" ? undefined : "_blank"}
                      rel="noreferrer"
                    >
                      {social.label}
                      <FiArrowUpRight />
                    </a>
                  ))}
                </div>
              </div>
            </RiseIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactCTA;
