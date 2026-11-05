const profileData = {
  name: "Abdur Rahman",
  firstName: "Abdur",
  lastName: "Rahman",
  title: "Full-Stack Web Developer & UI/UX Designer",
  shortTitle: "Full-Stack Developer",
  tagline: "I design and build modern digital experiences.",
  description: "I'm a passionate developer focused on creating responsive, user-friendly and scalable web applications.",
  location: "Ajman, UAE",
  availability: "Available for opportunities",
  email: "abdurrah0006@gmail.com",
  resume: {
    file: "/resume/resume.pdf"
  },

  about: {
    eyebrow: "About Me",
    title: "Building digital experiences from idea to reality.",
    description: "I'm a Full-Stack Web Developer and UI/UX Designer who enjoys turning ideas into responsive, functional and visually polished digital products.",
    // Each service appears on the home page panels and the About page.
    services: [
      {
        title: "Full-Stack Development",
        description:
          "Building complete web applications across the frontend, backend, APIs and database layers."
      },
      {
        title: "UI/UX Design",
        description:
          "Designing interfaces that balance visual quality, usability and a clear user experience."
      },
      {
        title: "Responsive Web Applications",
        description:
          "Creating interfaces that adapt smoothly across desktop, tablet and mobile devices."
      },
      {
        title: "Problem Solving",
        description:
          "Breaking a feature into manageable steps, then refining the implementation as the interface and data flow come together."
      },
      {
        title: "API & Database Integration",
        description:
          "Connecting React interfaces to REST APIs and data stores, including MongoDB, so application screens can work with real project data."
      },
      {
        title: "Interactive Experiences",
        description:
          "Building interfaces around user actions, from searchable content and account flows to interactive 3D product previews."
      }
    ]
  },

  // Content for the home page sections. Edit the text here; the project ids
  // must match ids in projectsData.js.
  home: {
    bandWords: [
      "Full-Stack",
      "UI / UX",
      "React",
      "Node.js",
      "MongoDB",
      "Figma",
      "Responsive",
      "REST APIs"
    ],
    marqueeLines: ["Build with care.", "Design with intent."],
    // Loading screen: short status lines shown while the monogram draws itself.
    intro: { lines: ["Opening portfolio", "Composing layout", "Ready"] },
    // Section labels and headings. Wrap words in _underscores_ for the accent style.
    sections: {
      about: { label: "About", note: "A little about me" },
      services: {
        label: "What I do",
        note: "Hover or tap a panel",
        title: "Six things I do _well._"
      },
      work: {
        label: "Selected work",
        note: "Things I've designed and built",
        title: "Work I'm _proud_ of.",
        hint: "Hover a title to preview the project",
        hintTouch: "Tap a title to preview the project",
        moreTitle: "More explorations"
      },
      toolkit: {
        label: "Toolkit",
        note: "Tools I use every day",
        title: "Tools that turn _ideas_ into products."
      },
      journey: {
        label: "Experience",
        note: "Learning by building",
        title: "Experience that shaped how I _build._"
      },
      contact: {
        label: "Contact",
        note: "Let's make it happen",
        action: "Write me a message",
        socialsLabel: "Or find me online"
      }
    },
    selectedProjects: [
      "codealpha-civilcard",
      "codealpha-petconnect",
      "task-manager",
      "messenger-chat",
      "blogify"
    ],
    moreProjectsCount: 5
  },

  heroVisual: {
    label: "BUILD / DESIGN / CREATE",
    technologies: ["React", "Node.js", "MongoDB", "Figma"]
  }
};

export default profileData;
