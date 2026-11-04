// Copy for every inner page. Edit the text here, not in the page files.
// Wrap words in _underscores_ to set them in the accent style.
const pagesData = {
  about: {
    index: "02",
    label: "About",
    note: "Who is behind the work",
    titleAccent: "from idea to launch.",
    actions: {
      primary: { label: "Explore projects", to: "/projects" },
      secondary: { label: "Get in touch", to: "/contact" }
    },
    glanceLabel: "At a glance",
    services: {
      index: "01",
      label: "What I do",
      title: "Turning ideas into _working products._"
    },
    toolkit: {
      index: "02",
      label: "Toolkit",
      title: "The tools I _build with._"
    },
    journey: {
      index: "03",
      label: "Journey",
      title: "Where I've _learned and worked._",
      link: "Full experience"
    },
    cta: {
      eyebrow: "Want the full story?",
      title: "Explore my experience and _education._",
      primary: { label: "View experience", to: "/experience" },
      secondary: { label: "Let's talk", to: "/contact" }
    }
  },

  projects: {
    index: "03",
    label: "Projects",
    note: "Selected work",
    title: "Things I've _built._",
    lead: "A collection of applications, interfaces and digital experiences I've designed and developed.",
    groups: [
      "All",
      "Web Applications",
      "Websites & Portfolios",
      "UI/UX & Design",
      "Utilities & Games",
      "Learning Projects"
    ],
    searchPlaceholder: "Search projects or technologies",
    emptyText: "No projects match these filters. Try another group or search term.",
    imageFallback: "/images/project-placeholder.svg"
  },

  projectDetails: {
    back: "Back to projects",
    live: "Live project",
    github: "GitHub",
    notDeployed:
      "Sorry, this project isn’t deployed yet. I’ll update this page when a live version is available.",
    nextLabel: "Next project",
    contents: "Contents",
    notFound: {
      title: "Project not found",
      text: "The project you're looking for doesn't exist.",
      back: "Back to projects"
    },
    sections: {
      overview: "Overview",
      features: "What I built",
      stack: "Technology stack",
      challenges: "Project considerations",
      takeaways: "Key takeaways",
      screenshots: "Inside the project"
    }
  },

  experience: {
    index: "04",
    label: "Experience",
    note: "Professional experience · 2026",
    title: "Practical work. _Continuous learning._",
    lead: "Four remote internships across full-stack development and UI/UX design, alongside a Bachelor of Computer Science at London South Bank University, Ajman.",
    heroLink: { label: "See selected projects", to: "/projects" },
    roles: {
      index: "01",
      label: "Professional experience",
      title: "Internship roles and _responsibilities._",
      highlights: "Work highlights"
    },
    education: {
      index: "02",
      label: "College education",
      title: "Studying _computer science._"
    },
    certifications: {
      index: "03",
      label: "Certifications",
      title: "Learning beyond _the classroom._"
    },
    cta: {
      eyebrow: "See what I build",
      title: "Experience is best shown _through the work._",
      primary: { label: "View projects", to: "/projects" },
      secondary: { label: "Get in touch", to: "/contact" }
    }
  },

  resume: {
    index: "05",
    label: "Resume",
    note: "Professional resume",
    download: "Download resume",
    overview: {
      eyebrow: "A quick overview",
      title: "One place to get the _full picture._",
      text: "The PDF is the concise offline version. Use the links for focused details about my work, experience and approach."
    },
    links: [
      {
        number: "01",
        label: "Experience",
        title: "Professional background",
        description:
          "Review my roles, responsibilities, outcomes and the technologies used in my work.",
        to: "/experience"
      },
      {
        number: "02",
        label: "Selected work",
        title: "Projects and case studies",
        description:
          "Explore the applications I have built, the problems they address and the tools behind them.",
        to: "/projects"
      },
      {
        number: "03",
        label: "About",
        title: "How I work",
        description:
          "Learn more about my approach to product design, full-stack development and collaboration.",
        to: "/about"
      }
    ],
    contact: { label: "Get in touch", to: "/contact" }
  },

  contact: {
    index: "06",
    label: "Contact",
    note: "Let's make it happen",
    socialsLabel: "Find me online",
    bottom: {
      eyebrow: "Have an idea?",
      lead: "Let's turn it into",
      accent: "something real.",
      link: "Send me an email"
    },
    bottom: {
      eyebrow: "Have an idea?",
      titleStart: "Let's turn it into",
      titleAccent: "something real.",
      link: "Send me an email"
    },
    draftNote:
      "Your email app should open with a draft. The message is not sent from this website; review and send it in your email app. If it did not open, email me at"
  },

  notFound: {
    code: "404",
    eyebrow: "Error / page not found",
    title: "Looks like this page _wandered off._",
    text: "The page you're looking for doesn't exist, may have moved, or the URL might be incorrect.",
    home: "Back home",
    projects: "View projects"
  }
};

export default pagesData;
