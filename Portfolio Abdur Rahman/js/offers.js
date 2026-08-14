const offersData = [
    {
        title: "FULL STACK <br/> DEVELOPMENT",
        desc: "I develop complete web applications from frontend to backend, ensuring smooth communication between user interface and the server. My goal is to build scalable, well-structured applications that are easy to maintain and optimized for performance."
    },
    {
        title: "UI/UX <br/> DESIGN",
        desc: "I create intuitive and visually appealing interfaces that prioritize user experience. From wireframing to high-fidelity prototypes, I ensure that every design decision serves a purpose and delights the end user."
    },
    {
        title: "BRAND <br/> IDENTITY",
        desc: "Developing unique visual languages for brands. This includes logo design, color theory application, and typography selection to ensure your brand stands out and tells a consistent story across all platforms."
    },
    {
        title: "API <br/> INTEGRATION",
        desc: "Connecting your application with third-party services smoothly. Whether it's payment gateways, social media feeds, or custom data sources, I ensure data flows securely and efficiently."
    },
    {
        title: "RESPONSIVE <br/> OPTIMIZATION",
        desc: "Ensuring your digital products look and work perfectly on every device. I specialize in mobile-first development that scales beautifully to tablets and ultra-wide desktop monitors."
    },
    {
        title: "MAINTENANCE <br/> & SUPPORT",
        desc: "Providing ongoing technical support and updates to keep your applications running at peak performance. I handle bug fixes, security patches, and feature enhancements as your business grows."
    }
];

function renderOffers() {
    const target = document.getElementById('offers-target');
    if (!target) return;

    target.innerHTML = `
        <div class="offer-container">
            <div class="heading">
                <h2 class="header-small">WHAT I</h2>
                <h1 class="header-giant">OFFER.</h1>
            </div>
            <div class="services-grid">
                ${offersData.map(item => `
                    <div class="service-card">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}