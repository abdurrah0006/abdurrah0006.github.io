const toolsData = [
    { name: "HTML", icon: "html-icon.png", progress: "95%" },
    { name: "TAILWIND", icon: "tailwind-icon.png", progress: "90%" },
    { name: "GIT", icon: "git-icon.png", progress: "85%" },
    { name: "PYTHON", icon: "python-icon.png", progress: "70%" },
    { name: "SASS", icon: "sass-icon.png", progress: "85%" },
    { name: "PHOTOSHOP", icon: "ps-icon.png", progress: "95%" },
    { name: "ILLUSTRATOR", icon: "ai-icon.png", progress: "80%" },
    { name: "NEXT.JS", icon: "nextjs-icon.png", progress: "75%" },
    { name: "SQL", icon: "sql-icon.png", progress: "80%" },
    { name: "TYPESCRIPT", icon: "ts-icon.png", progress: "70%" }
];

function renderTools() {
    const target = document.getElementById('tools-target');
    if (!target) return;

    target.innerHTML = `
        <div class="tools-container">
            <div class="heading">
                <h2 class="header-small">DEVELOPMENT</h2>
                <h1 class="header-giant">TOOLS<span>.</span></h1>
            </div>
            <div class="tools-grid">
                ${toolsData.map(tool => `
                    <div class="tool-card">
                        <img src="${tool.icon}" alt="${tool.name}" class="tool-icon">
                        <h3 class="tool-name">${tool.name}</h3>
                        <div class="progress-container">
                            <div class="progress-bar" style="width: ${tool.progress};"></div>
                            <span class="progress-text">${tool.progress}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}