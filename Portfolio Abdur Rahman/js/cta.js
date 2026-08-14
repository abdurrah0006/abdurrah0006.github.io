function renderCTA() {
    const target = document.getElementById('cta-target');
    if (!target) return;

    target.innerHTML = `
        <div class="cta-container">
            <div class="heading">
                <h2 class="header-small">LETS</h2>
                <h1 class="header-giant">START.</h1>
                <p class="cta-description">
                    Currently seeking Internship opportunities<br>
                    and open to working on Real-World projects.
                </p>
            </div>
            <div class="cta-actions">
                <a href="mailto:abdurrah2511@gmail.com" class="btn-primary">Get In Touch</a>
                <a href="https://github.com/yourprofile" class="btn-secondary">
                    <img src="github-icon.svg" alt="GitHub" class="social-icon"> Github
                </a>
                <a href="https://linkedin.com/in/yourprofile" class="btn-secondary">
                    <img src="linkedin-icon.svg" alt="LinkedIn" class="social-icon"> Linked In
                </a>
            </div>
        </div>
    `;
}