import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import projectsData from "../../data/projectsData";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { projectId } = useParams();

  const project = projectsData.find(
    (item) => item.id === projectId
  );

  const hasLiveDeployment = isWebUrl(project?.links?.live);

  if (!project) {
    return (
      <main className="project-not-found">
        <h1>Project Not Found</h1>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/projects">Back to Projects</Link>
      </main>
    );
  }

  return (
    <main className="project-details">
      <section className="project-details-hero">
        <div className="container">
          <Link to="/projects" className="project-back-link">
            <FiArrowLeft />
            Back to Projects
          </Link>

          <div className="project-details-meta">
            <span>{project.category}</span>
            <span>{project.year}</span>
            <span>{project.role}</span>
          </div>

          <h1>{project.title}</h1>

          <p className="project-details-intro">
            {project.preview.description}
          </p>

          <div className="project-details-links">
            {hasLiveDeployment ? (
              <a href={project.links.live} target="_blank" rel="noreferrer">
                Live Project
                <FiArrowUpRight />
              </a>
            ) : (
              <p className="project-deployment-note" role="status">
                Sorry, this project isn’t deployed yet. I’ll update this page
                when a live version is available.
              </p>
            )}

            {project.links.github && (
              <a href={project.links.github} target="_blank" rel="noreferrer">
                GitHub
                <FiGithub />
              </a>
            )}
          </div>

          <div className="project-details-cover">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/images/project-placeholder.svg";
              }}
            />
          </div>
        </div>
      </section>

      <section className="project-case-study section">
        <div className="container">
          <div className="project-case-study-grid">
            <aside className="project-case-study-sidebar">
              <span>CASE STUDY</span>
              <h2>{project.title}</h2>
            </aside>

            <div className="project-case-study-content">
              <CaseStudySection
                title="Overview"
                content={project.overview.description}
              />

              <CaseStudySection
                title={project.problem.title}
                content={project.problem.description}
              />

              <CaseStudySection
                title={project.solution.title}
                content={project.solution.description}
              />

              <CaseStudySection
                title={project.development.title}
                content={project.development.description}
              />

              <section className="case-study-section">
                <span className="case-study-label">
                  KEY FEATURES
                </span>

                <h2>What I built</h2>

                <div className="feature-list">
                  {project.features.map((feature, index) => (
                    <div className="feature-item" key={feature}>
                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="case-study-section">
                <span className="case-study-label">
                  TECHNOLOGIES
                </span>

                <h2>Technology Stack</h2>

                <div className="detail-tech-tags">
                  {project.technologies.map((technology) => (
                    <span key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
              </section>

              {project.challenges.length > 0 && (
                <section className="case-study-section">
                  <span className="case-study-label">
                    DESIGN CONSIDERATIONS
                  </span>

                  <h2>Project considerations</h2>

                  <div className="challenge-list">
                    {project.challenges.map((challenge) => (
                      <article
                        className="challenge-card"
                        key={challenge.title}
                      >
                        <h3>{challenge.title}</h3>
                        <p>{challenge.description}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {project.learnings.length > 0 && (
                <section className="case-study-section">
                  <span className="case-study-label">
                    KEY TAKEAWAYS
                  </span>

                  <h2>Key takeaways</h2>

                  <ul className="learning-list">
                    {project.learnings.map((learning) => (
                      <li key={learning}>{learning}</li>
                    ))}
                  </ul>
                </section>
              )}

              {project.screenshots.length > 0 && (
              <section className="case-study-section">
                <span className="case-study-label">
                  PROJECT SCREENSHOTS
                </span>

                <h2>Inside the project</h2>

                <div className="project-screenshots">
                  {project.screenshots.map((screenshot) => (
                    <img
                      key={screenshot}
                      src={screenshot}
                      alt={`${project.title} screenshot`}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/images/project-placeholder.svg";
                      }}
                    />
                  ))}
                </div>
              </section>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseStudySection({ title, content }) {
  return (
    <section className="case-study-section">
      <span className="case-study-label">
        {title}
      </span>

      <h2>{title}</h2>

      <p>{content}</p>
    </section>
  );
}

function isWebUrl(value) {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export default ProjectDetails;
