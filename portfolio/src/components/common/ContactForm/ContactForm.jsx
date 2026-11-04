import { useState } from "react";
import { FiSend } from "react-icons/fi";
import contactData from "../../../data/contactData";
import pagesData from "../../../data/pagesData";
import "./ContactForm.css";

const { form } = contactData.contactPage;

function Field({ field, value, onChange, idPrefix }) {
  const id = `${idPrefix}-${field.name}`;

  return (
    <div className="cf-field">
      <label htmlFor={id}>{field.label}</label>
      <input
        id={id}
        name={field.name}
        type={field.type}
        placeholder={field.placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}

// The site has no server, so submitting opens a pre-filled email draft.
// `idPrefix` keeps field ids unique when the form appears twice on one page.
function ContactForm({ idPrefix = "contact", showHeading = true }) {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [draftRequested, setDraftRequested] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = encodeURIComponent(values.subject);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`
    );

    window.location.href = `mailto:${contactData.email}?subject=${subject}&body=${body}`;
    setDraftRequested(true);
  };

  return (
    <div className="cf">
      {showHeading ? (
        <div className="cf-head">
          <h2>{form.title}</h2>
          <p>{form.description}</p>
        </div>
      ) : null}

      <form className="cf-form" onSubmit={handleSubmit}>
        <div className="cf-row">
          {form.fields.slice(0, 2).map((field) => (
            <Field
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={handleChange}
              idPrefix={idPrefix}
            />
          ))}
        </div>

        {form.fields.slice(2).map((field) => (
          <Field
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={handleChange}
            idPrefix={idPrefix}
          />
        ))}

        <div className="cf-field">
          <label htmlFor={`${idPrefix}-message`}>{form.message.label}</label>
          <textarea
            id={`${idPrefix}-message`}
            name="message"
            rows="5"
            placeholder={form.message.placeholder}
            value={values.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="cf-submit">
          {form.submitLabel}
          <FiSend />
        </button>

        {draftRequested ? (
          <p className="cf-note" role="status">
            {pagesData.contact.draftNote} {contactData.email}.
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default ContactForm;
