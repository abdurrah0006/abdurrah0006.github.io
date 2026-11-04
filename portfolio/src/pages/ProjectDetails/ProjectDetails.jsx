import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight, FiGithub } from "react-icons/fi";
import PageHero from "../../components/common/PageHero/PageHero";
import projectsData from "../../data/projectsData";
import pagesData from "../../data/pagesData";
import "./ProjectDetails.css";

const copy = pagesData.projectDetails;
const FALLBACK = pagesData.projects.imageFallback;

function isWebUrl(value) {
  if (typeof value !== "string") return false;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const onImageError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = FALLBACK;
};

// The case-study sections that exist for this project, in reading order.
function buildSections(project) {
  return [
    { id: "overview", label: copy.sections.overview },
    { id: "problem", label: project.problem.title },
    { id: "solution", label: project.solution.title },
    { id: "development", label: project.development.title },
    { id: "features", label: copy.sections.features },
    { id: "stack", label: copy.sections.stack },
    project.challenges.length > 0 && { id: "challenges", label: copy.sections.challenges },
    project.learnings.length > 0 && { id: "takeaways", label: copy.sections.takeaways },
    project.screenshots.length > 0 && { id: "screenshots", label: copy.sections.screenshots }
  ].filter(Boolean);
}

function ProjectDetails() {
  const { projectId } = useParams();
  const index = projectsData.findIndex((item) => item.id === projectId);
  const project = projectsData[index];
  const next = projectsData[(index + 1) % projectsData.length];

  const sections = useMemo(() => (project ? buildSections(project) : []), [project]);
  const [activeId, setActiveId] = useState(null);
  const currentId = sections.some((section) => section.id === activeId)
    ? activeId
    : sections[0]?.id;

  // Scroll-spy: highlight the contents entry for the section being read.
  useEffect(() => {
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          setActiveId(visible[0].target.id.replace("case-", ""));
        }
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(`case-${section.id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (!project) {
    return (
      <div className="ui-page case-missing">
        <div className="container">
          <h1 className="ui-h2">{copy.notFound.title}</h1>
          <p className="ui-lead">{copy.notFound.text}</p>
          <Link to="/projects" className="ui-btn">
            {copy.notFound.back}
          </Link>
        </div>
      </div>
    );
  }

  const scrollToSection = (id) => {
    document
      .getElementById(`case-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const textBlocks = {
    overview: project.overview.description,
    problem: project.problem.description,
    solution: project.solution.description,
    development: project.development.description
  };

  const renderSection = (section) => {
    switch (section.id) {
      case "features":
        return (
          <ol className="case-features">
            {project.features.map((feature, featureIndex) => (
              <li key={feature}>
                <span className="ui-label">{String(featureIndex + 1).padStart(2, "0")}</span>
                <p>{feature}</p>
              </li>
            ))}
          </ol>
        );
      case "stack":
        return (
          <ul className="ui-chips case-stack">
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        );
      case "challenges":
        return (
          <div className="case-challenges">
            {project.challenges.map((challenge) => (
              <article className="ui-card" key={challenge.title}>
                <h3 className="ui-h3">{challenge.title}</h3>
                <p>{challenge.description}</p>
              </article>
            ))}
          </div>
        );
      case "takeaways":
        return (
          <ul className="case-takeaways">
            {project.learnings.map((learning) => (
              <li key={learning}>{learning}</li>
            ))}
          </ul>
        );
      case "screenshots":
        return (
          <div className="case-shots">
            {project.screenshots.map((screenshot) => (
              <img
                key={screenshot}
                src={screenshot}
                alt={`${project.title} screenshot`}
                loading="lazy"
                onError={onImageError}
              />
            ))}
          </div>
        );
      default:
        return <p className="case-text">{textBlocks[section.id]}</p>;
    }
  };

  return (
    <div className="ui-page case-page">
      <PageHero
        index="03"
        label={project.category}
        note={`${project.year} · ${project.role}`}
        title={project.title}
        lead={project.preview.description}
        meta={[
          { label: "Role", value: project.role },
          { label: "Year", value: project.year },
          { label: "Category", value: project.category },
          { label: "Stack", value: `${project.technologies.length} technologies` }
        ]}
      >
        {isWebUrl(project.links?.live) ? (
          <a className="ui-btn" href={project.links.live} target="_blank" rel="noreferrer">
            {copy.live}
            <FiArrowUpRight />
          </a>
        ) : (
          <p className="case-note" role="status">
            {copy.notDeployed}
          </p>
        )}

        {project.links?.github ? (
          <a className="ui-link" href={project.links.github} target="_blank" rel="noreferrer">
            <FiGithub />
            {copy.github}
          </a>
        ) : null}

        <Link to="/projects" className="ui-link">
          <FiArrowLeft />
          {copy.back}
        </Link>
      </PageHero>

      <section className="case-cover-section">
        <div className="container">
          <figure className="case-cover">
            <img src={project.image} alt={`${project.title} preview`} onError={onImageError} />
          </figure>
        </div>
      </section>

      <section className="case-body" data-reveal-skip>
        <div className="container case-layout">
          <aside className="case-nav" aria-label={copy.contents}>
            <span className="ui-label">{copy.contents}</span>
            <ol>
              {sections.map((section, sectionIndex) => (
                <li key={section.id}>
                  <button
                    type="button"
                    className={section.id === currentId ? "is-active" : ""}
                    aria-current={section.id === currentId ? "true" : undefined}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <span>{String(sectionIndex + 1).padStart(2, "0")}</span>
                    {section.label}
                  </button>
                </li>
              ))}
            </ol>
          </aside>

          <div className="case-content">
            {sections.map((section, sectionIndex) => (
              <section className="case-block" id={`case-${section.id}`} key={section.id}>
                <span className="ui-label">{String(sectionIndex + 1).padStart(2, "0")}</span>
                <h2 className="ui-h2 case-title">{section.label}</h2>
                {renderSection(section)}
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="case-next" data-reveal-skip>
        <div className="container">
          <Link to={`/projects/${next.id}`} className="case-next-link">
            <span className="ui-label">{copy.nextLabel}</span>
            <strong>{next.title}</strong>
            <FiArrowUpRight />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default ProjectDetails;
