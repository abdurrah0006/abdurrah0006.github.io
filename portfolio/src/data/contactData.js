const contactData = {
  eyebrow: "Let's Work Together",
  title: "Let's build something meaningful.",
  description: "Have a project, opportunity, or idea? I'd love to hear about it and explore how we can turn it into something real.",

  email: "abdurrah0006@gmail.com",

  availability: "Available for freelance projects and opportunities",

  socialLinks: [
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
      url: "https://www.linkedin.com/in/abdurrah0006/"
    },
    {
      id: "email",
      label: "Email",
      icon: "mail",
      url: "mailto:abdurrah0006@gmail.com"
    }
  ],
 
  contactPage: {
    eyebrow: "GET IN TOUCH",

    title: "Let's build something meaningful.",

    description:
      "Whether you have a project in mind, an opportunity, or simply want to connect, feel free to reach out.",

    availability: {
      status: "Available for opportunities",
      description:
        "I'm currently open to freelance projects, internships and suitable development opportunities."
    },

    contactMethods: [
      {
        id: "email",
        label: "Email",
        value: "jhondoe@gmail.com",
        href: "mailto:jhondoe@gmail.com"
      },
      {
        id: "phone",
        label: "Phone",
        value: "+971 XX XXX XXXX",
        href: "tel:+971XXXXXXXXX"
      },
      {
        id: "whatsapp",
        label: "WhatsApp",
        value: "Chat on WhatsApp",
        href: "https://wa.me/971XXXXXXXXX"
      },
      {
        id: "location",
        label: "Location",
        value: "UAE",
        href: "#"
      }
    ],

    socialLinks: [
      {
        id: "github",
        label: "GitHub",
        href: "#"
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        href: "#"
      },
      {
        id: "email",
        label: "Email",
        href: "mailto:abdurrah0006@gmail.com"
      }
    ],

    form: {
      title: "Tell me about your project.",

      description:
        "Have an idea, project or opportunity? Send me a message and I'll get back to you as soon as possible.",

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

      submitLabel: "Send Message"
    }
  }
};

export default contactData;