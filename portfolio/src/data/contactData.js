import profileData from "./profileData";

const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    icon: "github",
    url: "https://github.com/abdurrah0006"
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "linkedin",
    url: "https://linkedin.com/in/abdurrah0006"
  },
  {
    id: "email",
    label: "Email",
    icon: "mail",
    url: `mailto:${profileData.email}`
  }
];

const contactData = {
  eyebrow: "Let's Work Together",
  title: "Let's build something meaningful.",
  description: "Have a project, opportunity, or idea? I'd love to hear about it and explore how we can turn it into something real.",

  email: profileData.email,

  availability: "Available for freelance projects and opportunities",

  socialLinks,
 
  contactPage: {
    eyebrow: "GET IN TOUCH",

    title: "Let's build something meaningful",

    description:
      "Whether you have a project in mind, an opportunity, or simply want to connect, feel free to reach out.",

    availability: {
      status: profileData.availability,
      description:
        "I'm currently open to freelance projects, internships and suitable development opportunities."
    },

    contactMethods: [
      {
        id: "email",
        label: "Email",
        value: profileData.email,
        href: `mailto:${profileData.email}`
      },
      {
        id: "location",
        label: "Location",
        value: profileData.location
      }
    ],

    socialLinks,

    form: {
      title: "Tell me about your project.",

      description:
        "Fill in the fields to open your email app with a prefilled draft. Review the details and send the message from your email app.",

      fields: [
        {
          name: "name",
          label: "Your Name",
          type: "text",
          placeholder: "John Doe"
        },
        {
          name: "email",
          label: "Email Address",
          type: "email",
          placeholder: "john@example.com"
        },
        {
          name: "subject",
          label: "Subject",
          type: "text",
          placeholder: "Project inquiry"
        }
      ],

      message: {
        name: "message",
        label: "Message",
        placeholder: "Tell me a little about your project..."
      },

      submitLabel: "Open Email App"
    }
  }
};

export default contactData;
