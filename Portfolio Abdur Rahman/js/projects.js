const projectsData = [
    {
        number: "01",
        title: "PORTFOLIO<br>WEBSITE.",
        tags: ["REACT", "CSS", "JS"],
        desc: "A personal portfolio showcasing my projects, skills and experience in technology, coding and designing with a focus on practical development and continuous learning.",
        demoLink: "#",
        githubLink: "#",
        imgSrc: "./image/19051.png"
    },
    {
        number: "02",
        title: "PORTFOLIO<br>WEBSITE.",
        tags: ["REACT", "CSS", "JS"],
        desc: "A personal portfolio showcasing my projects, skills and experience in technology, coding and designing with a focus on practical development and continuous learning.",
        demoLink: "#",
        githubLink: "#",
        imgSrc: "./image/19051.png"
    },
    {
        number: "03",
        title: "PORTFOLIO<br>WEBSITE.",
        tags: ["REACT", "CSS", "JS"],
        desc: "A personal portfolio showcasing my projects, skills and experience in technology, coding and designing with a focus on practical development and continuous learning.",
        demoLink: "#",
        githubLink: "#",
        imgSrc: "./image/19051.png"
    }
];

function renderProjects() {
    const target = document.getElementById('projects-target');
    if (!target) return;

    target.innerHTML = `
        <div class="projects-container">
            <div class="heading">
                <h2 class="header-small">MY</h2>
                <h1 class="header-giant">PROJECT.</h1>
            </div>
            <div class="project-list">
                ${projectsData.map(proj => `
                    <div class="project-card">
                        <div class="project-info">
                            <span class="label">NAME</span>
                            <h2 class="project-title">${proj.title}</h2>
                            <div class="tech-stack">
                                ${proj.tags.map(tag => `<span>${tag}</span>`).join('')}
                            </div>
                            <p class="project-desc">${proj.desc}</p>
                            <div class="project-links">
                                <a href="${proj.demoLink}" class="btn-demo">Demo Link</a>
                                <a href="${proj.githubLink}" class="btn-github">
                                    <img src="github-icon.png" alt=""> GitHub
                                </a>
                            </div>
                        </div>
                        <div class="project-visual">
                            <div class="screenshot-wrapper">
                                <img src="${proj.imgSrc}" alt="Project Preview">
                            </div>
                            <span class="project-number">${proj.number}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="view-more-container">
                <div class="scroll-text">VIEW MORE</div>
                <div class="line">
                    <div class="circle"></div>
                    <div class="arrow"></div>
                </div>
            </div>
        </div>
    `;
}