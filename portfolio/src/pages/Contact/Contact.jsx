import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiSend
} from "react-icons/fi";
import contactData from "../../data/contactData";
import profileData from "../../data/profileData";
import "./Contact.css";

const iconMap = {
  email: FiMail,
  location: FiMapPin
};

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [emailDraftRequested, setEmailDraftRequested] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );

    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    setEmailDraftRequested(true);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero section">
        <div className="container">
          <motion.div
            className="contact-hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="contact-eyebrow">
              {contactData.contactPage.eyebrow}
            </span>

            <h1>
              {contactData.contactPage.title}
            </h1>

            <p>
              {contactData.contactPage.description}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="contact-main section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-information">
              <div className="contact-availability">
                <span className="availability-dot" />

                <div>
                  <strong>
                    {contactData.contactPage.availability.status}
                  </strong>

                  <p>
                    {contactData.contactPage.availability.description}
                  </p>
                </div>
              </div>

              <div className="contact-methods">
                {contactData.contactPage.contactMethods.map(
                  (method) => {
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
                          <span>
                            {method.label}
                          </span>

                          <strong>
                            {method.value}
                          </strong>
                        </div>

                        {method.href && <FiArrowUpRight />}
                      </MethodTag>
                    );
                  }
                )}
              </div>

              <div className="contact-socials">
                <span>FIND ME ONLINE</span>

                <div>
                  {contactData.contactPage.socialLinks.map(
                    (social) => (
                      <a
                        href={social.url}
                        key={social.id}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {social.id === "github" && (
                          <FiGithub />
                        )}

                        {social.id === "linkedin" && (
                          <FiLinkedin />
                        )}

                        {social.id === "email" && (
                          <FiMail />
                        )}

                        <span>{social.label}</span>
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            <motion.div
              className="contact-form-wrapper"
              initial={{
                opacity: 0,
                y: 30
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.2
              }}
              transition={{
                duration: 0.6
              }}
            >
              <div className="contact-form-heading">
                <span>01</span>

                <div>
                  <h2>
                    {contactData.contactPage.form.title}
                  </h2>

                  <p>
                    {contactData.contactPage.form.description}
                  </p>
                </div>
              </div>

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >
                <div className="contact-form-row">
                  {contactData.contactPage.form.fields
                    .slice(0, 2)
                    .map((field) => (
                      <div
                        className="contact-field"
                        key={field.name}
                      >
                        <label htmlFor={field.name}>
                          {field.label}
                        </label>

                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={
                            field.placeholder
                          }
                          value={
                            formData[field.name]
                          }
                          onChange={handleChange}
                          required
                        />
                      </div>
                    ))}
                </div>

                {contactData.contactPage.form.fields
                  .slice(2)
                  .map((field) => (
                    <div
                      className="contact-field"
                      key={field.name}
                    >
                      <label htmlFor={field.name}>
                        {field.label}
                      </label>

                      <input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={
                          field.placeholder
                        }
                        value={
                          formData[field.name]
                        }
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}

                <div className="contact-field">
                  <label htmlFor="message">
                    {contactData.contactPage.form.message.label}
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    rows="7"
                    placeholder={
                      contactData.contactPage.form.message
                        .placeholder
                    }
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="contact-submit"
                >
                  {contactData.contactPage.form.submitLabel}
                  <FiSend />
                </button>

                {emailDraftRequested && (
                  <motion.p
                    className="contact-success"
                    initial={{
                      opacity: 0,
                      y: 5
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                  >
                    Your email app should open with a draft. The message is not sent from this website; review and send it in your email app. If it did not open, email me at {contactData.email}.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="contact-bottom section">
        <div className="container">
          <div className="contact-bottom-card">
            <span className="contact-eyebrow">
              HAVE AN IDEA?
            </span>

            <h2>
              Let's turn it into
              <span> something real.</span>
            </h2>

            <a
              href={`mailto:${profileData.email}`}
              className="contact-bottom-link"
            >
              Send Me an Email
              <FiArrowUpRight />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
