import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiSend
} from "react-icons/fi";
import { RevealHeading } from "../../components/common/Motion/Motion";
import contactData from "../../data/contactData";
import profileData from "../../data/profileData";
import pagesData from "../../data/pagesData";
import "./Contact.css";

const iconMap = {
  email: FiMail,
  location: FiMapPin
};

const page = pagesData.contact;

// The one page with the message form. Other sections link here and pass
// state.scrollTo = "contact-form" to land on it.
function Contact() {
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [emailDraftRequested, setEmailDraftRequested] = useState(false);

  useEffect(() => {
    if (state?.scrollTo !== "contact-form") return undefined;

    const timer = window.setTimeout(() => {
      document
        .getElementById("contact-form")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 450);

    return () => window.clearTimeout(timer);
  }, [state]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // The site has no server, so submitting opens a pre-filled email draft.
  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );

    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    setEmailDraftRequested(true);
  };

  const { contactPage } = contactData;

  // Same heading treatment as every other page: last word in the accent style.
  const heroTitle = contactPage.title.replace(/(\S+)$/, "_$1_");

  return (
    <div className="contact-page">
      <section className="contact-hero" data-reveal-skip>
        <div className="container">
          <div className="contact-hero-content">
            <span className="contact-eyebrow">{contactPage.eyebrow}</span>

            <RevealHeading as="h1" className="ui-hero-title" text={heroTitle} />

            <p>{contactPage.description}</p>
          </div>
        </div>
      </section>

      <section className="contact-main" data-reveal-skip>
        <div className="container">
          <div className="contact-layout">
            <div className="contact-information">
              <div className="contact-availability">
                <div>
                  <span className="availability-dot" />
                  <strong>{contactPage.availability.status}</strong>

                  <p>{contactPage.availability.description}</p>
                </div>
              </div>

              <div className="contact-methods">
                {contactPage.contactMethods.map((method) => {
                  const Icon = iconMap[method.id] || FiMail;
                  const MethodTag = method.href ? "a" : "div";

                  return (
                    <MethodTag
                      className="contact-method"
                      {...(method.href ? { href: method.href } : {})}
                      key={method.id}
                    >
                      <div className="contact-method-icon">
                        <Icon />
                      </div>

                      <div>
                        <span>{method.label}</span>

                        <strong>{method.value}</strong>
                      </div>

                      {method.href && <FiArrowUpRight />}
                    </MethodTag>
                  );
                })}
              </div>

              <div className="contact-socials">
                <span>{page.socialsLabel}</span>

                <div>
                  {contactPage.socialLinks.map((social) => (
                    <a
                      href={social.url}
                      key={social.id}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.id === "github" && <FiGithub />}
                      {social.id === "linkedin" && <FiLinkedin />}
                      {social.id === "email" && <FiMail />}

                      <span>{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper" id="contact-form">
              <div className="contact-form-heading">
                <span>01</span>

                <div>
                  <h2 className="ui-h3">{contactPage.form.title}</h2>

                  <p>{contactPage.form.description}</p>
                </div>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="contact-form-row">
                  {contactPage.form.fields.slice(0, 2).map((field) => (
                    <div className="contact-field" key={field.name}>
                      <label htmlFor={field.name}>{field.label}</label>

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                </div>

                {contactPage.form.fields.slice(2).map((field) => (
                  <div className="contact-field" key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>

                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                    />
                  </div>
                ))}

                <div className="contact-field">
                  <label htmlFor="message">{contactPage.form.message.label}</label>

                  <textarea
                    id="message"
                    name="message"
                    rows="7"
                    placeholder={contactPage.form.message.placeholder}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="contact-submit">
                  {contactPage.form.submitLabel}
                  <FiSend />
                </button>

                {emailDraftRequested && (
                  <p className="contact-success" role="status">
                    {page.draftNote} {contactData.email}.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-bottom" data-reveal-skip>
        <div className="container">
          <div className="contact-bottom-card">
            <span className="contact-eyebrow">{page.bottom.eyebrow}</span>

            <RevealHeading
              as="h2"
              className="ui-h2 contact-bottom-title"
              text={`${page.bottom.lead} _${page.bottom.accent}_`}
            />

            <a href={`mailto:${profileData.email}`} className="contact-bottom-link">
              {page.bottom.link}
              <FiArrowUpRight />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
