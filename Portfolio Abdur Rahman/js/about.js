const certificatesData = [
    { year: "2024", provider: "UDEMY LEARNING", name: "FULL STACK WEB DEVELOPMENT COURSE" },
    { year: "2024", provider: "UDEMY LEARNING", name: "FULL STACK WEB DEVELOPMENT COURSE" },
    { year: "2024", provider: "UDEMY LEARNING", name: "FULL STACK WEB DEVELOPMENT COURSE" },
    { year: "2024", provider: "UDEMY LEARNING", name: "FULL STACK WEB DEVELOPMENT COURSE" },
    { year: "2024", provider: "UDEMY LEARNING", name: "FULL STACK WEB DEVELOPMENT COURSE" },
    { year: "2024", provider: "UDEMY LEARNING", name: "FULL STACK WEB DEVELOPMENT COURSE" }
];

function renderAbout() {
    const target = document.getElementById('about-target');
    if (!target) return;

    target.innerHTML = `
        <div class="about-container">
            <div class="aboutme">
                <div class="heading">
                    <h2 class="header-small">ABOUT</h2>
                    <h1 class="header-giant">ME.</h1>
                    <p class="bio-text">
                        Hi, I'm <strong>Abdur Rahman</strong>, a full stack web developer and designer passionate about creating clean, functional, and visually engaging web experiences. I started coding for fun, and quickly fell in love with solving problems and building things people actually use. As a <strong>student seeking internship opportunities</strong>, I’ve gained hands-on experience with <strong>HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, PostgreSQL, REST APIs, authentication, and web security.</strong> I focus on clean design, creative animations, and intuitive user experiences, leveraging my drawing skills to bring an artistic edge to my projects. I’ve built <strong>10+ projects</strong>, including portfolios, landing pages, calculators, clocks, weather apps, login systems, and project management tools. While I currently focus on full stack development, my long-term goal is blockchain and Ethereum-based Web3 applications. I’m eager to contribute to projects and teams that value creativity, problem-solving, and modern web development, working with both clients and recruiters.
                    </p>
                </div>
                <div class="about-image-column">
                    <img src="./image/profile-me.png" alt="Abdur Rahman" class="portrait-img-about">
                </div>
                <div class="about-links">
                    <a href="#" class="social-item"><img src="github-icon.svg" alt=""> GITHUB</a>
                    <a href="#" class="social-item"><img src="linkedin-icon.svg" alt=""> LINKED IN</a>
                    <a href="#" class="social-item"><img src="dribbble-icon.svg" alt=""> DRIBBBLE</a>
                    <div class="resume-button">
                        <a href="#" class="resume"><img src="instagram-icon.svg" alt=""> RESUME</a>
                    </div>
                    <a href="mailto:abdurrah2511@gmail.com" class="email-item">
                        <img src="linkedin-small.svg" alt=""> abdurrah2511@gmail.com
                    </a>
                </div>
            </div>
            
            <div class="cert-container">
                <h2 class="header-small">CERTIFICATES</h2>
                <div class="cert-grid">
                    ${certificatesData.map(cert => `
                        <div class="cert-item">
                            <span class="cert-meta">${cert.provider} - ${cert.year}</span>
                            <h3 class="cert-name">${cert.name}</h3>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}