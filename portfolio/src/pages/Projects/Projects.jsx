import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import PageHero from "../../components/common/PageHero/PageHero";
import projectsData from "../../data/projectsData";
import pagesData from "../../data/pagesData";
import "./Projects.css";

const PROJECTS_PER_PAGE = 6;
const page = pagesData.projects;

function getProjectGroup(project) {
  const category = project.category.toLowerCase();

  if (category.includes("learning") || category.includes("python application")) {
    return "Learning Projects";
  }
  if (category.includes("ui/ux") || category.includes("design")) {
    return "UI/UX & Design";
  }
  if (
    category.includes("utility") ||
    category.includes("game") ||
    category.includes("ui component")
  ) {
    return "Utilities & Games";
  }
  if (category.includes("website") || category.includes("portfolio")) {
    return "Websites & Portfolios";
  }
  return "Web Applications";
}

function Projects() {
  const [activeGroup, setActiveGroup] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const scrollAfterPageChange = useRef(false);

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return projectsData.filter((project) => {
      const matchesGroup = activeGroup === "All" || getProjectGroup(project) === activeGroup;
      const searchable = [
        project.title,
        project.category,
        project.preview.description,
        ...project.features,
        ...project.technologies
      ]
        .join(" ")
        .toLowerCase();

      return matchesGroup && (!query || searchable.includes(query));
    });
  }, [activeGroup, searchQuery]);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
  const visibleProjects = filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);

  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // Pagination scrolls back to the start of the list; filtering does not.
  const goToPage = (target) => {
    scrollAfterPageChange.current = true;
    setCurrentPage(Math.min(Math.max(target, 1), totalPages));
  };

  useEffect(() => {
    if (!scrollAfterPageChange.current) return;
    scrollAfterPageChange.current = false;

    document
      .getElementById("projects-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  return (
    <div className="ui-page projects-page">
      <PageHero
        index={page.index}
        label={page.label}
        note={page.note}
        title={page.title}
        lead={page.lead}
        meta={[
          { label: "Total projects", value: String(projectsData.length) },
          { label: "Showing", value: String(filteredProjects.length) }
        ]}
      />

      <section id="projects-section" className="projects-section">
        <div className="container">
          <div className="projects-toolbar">
            <div className="projects-filters" role="group" aria-label="Filter projects by type">
              {page.groups.map((group) => (
                <button
                  type="button"
                  key={group}
                  className={activeGroup === group ? "project-filter active" : "project-filter"}
                  aria-pressed={activeGroup === group}
                  onClick={() => handleGroupChange(group)}
                >
                  {group}
                </button>
              ))}
            </div>

            <label className="projects-search">
              <FiSearch aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={page.searchPlaceholder}
                aria-label={page.searchPlaceholder}
              />
            </label>
          </div>

          {visibleProjects.length > 0 ? (
            <div className="projects-grid">
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  number={startIndex + index + 1}
                />
              ))}
            </div>
          ) : (
            <p className="projects-empty">{page.emptyText}</p>
          )}

          {totalPages > 1 && (
            <nav className="projects-pagination" aria-label="Project pages">
              <button
                type="button"
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Previous page"
              >
                <FiChevronLeft />
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                  <button
                    type="button"
                    key={number}
                    className={currentPage === number ? "pagination-page active" : "pagination-page"}
                    onClick={() => goToPage(number)}
                    aria-current={currentPage === number ? "page" : undefined}
                  >
                    {String(number).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Next page"
              >
                <FiChevronRight />
              </button>
            </nav>
          )}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project, number }) {
  return (
    <article className="project-card ui-card">
      <Link to={`/projects/${project.id}`} className="project-card-media" tabIndex={-1} aria-hidden="true">
        <img
          src={project.image}
          alt=""
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = page.imageFallback;
          }}
        />
        <span className="project-card-number">{String(number).padStart(2, "0")}</span>
      </Link>

      <div className="project-card-body">
        <div className="project-card-meta ui-label">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <Link to={`/projects/${project.id}`} className="project-card-title">
          <h2 className="ui-h3">{project.title}</h2>
          <FiArrowUpRight />
        </Link>

        <p>{project.preview.description}</p>

        <ul className="ui-chips">
          {project.technologies.slice(0, 4).map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default Projects;
