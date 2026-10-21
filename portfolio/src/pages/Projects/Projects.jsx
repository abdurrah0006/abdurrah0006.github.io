import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import projectsData from "../../data/projectsData";
import "./Projects.css";

const PROJECTS_PER_PAGE = 6;

function Projects() {
  const [activeGroup, setActiveGroup] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const groups = [
    "All",
    "Web Applications",
    "Websites & Portfolios",
    "UI/UX & Design",
    "Utilities & Games",
    "Learning Projects"
  ];

  const filteredProjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return projectsData.filter((project) => {
      const matchesGroup =
        activeGroup === "All" || getProjectGroup(project) === activeGroup;
      const searchableText = [
        project.title,
        project.category,
        project.preview.description,
        ...project.features,
        ...project.technologies
      ].join(" ").toLowerCase();
      const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesGroup && matchesSearch;
    });
  }, [activeGroup, searchQuery]);

  const totalPages = Math.ceil(
    filteredProjects.length / PROJECTS_PER_PAGE
  );

  const visibleProjects = useMemo(() => {
    const startIndex =
      (currentPage - 1) * PROJECTS_PER_PAGE;

    return filteredProjects.slice(
      startIndex,
      startIndex + PROJECTS_PER_PAGE
    );
  }, [filteredProjects, currentPage]);

  const handleGroupChange = (group) => {
    setActiveGroup(group);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  return (
    <div className="projects-page">
      <section className="projects-page-hero">
        <div className="container">
          <motion.div
            className="projects-page-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="page-eyebrow">
              Selected Work
            </span>

            <h1>
              Things I've
              <span> built.</span>
            </h1>

            <p>
              A collection of applications, interfaces and
              digital experiences I've designed and developed.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="projects-section" className="projects-section section">
        <div className="container">
          <div className="projects-toolbar">
            <div className="projects-toolbar-controls">
              <div className="projects-filters" role="group" aria-label="Filter projects by type">
                {groups.map((group) => (
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
                  placeholder="Search projects or technologies"
                  aria-label="Search projects or technologies"
                />
              </label>
            </div>

            <span className="projects-count">
              {filteredProjects.length}{" "}
              {filteredProjects.length === 1
                ? "Project"
                : "Projects"}
            </span>
          </div>

          {visibleProjects.length > 0 ? (
            <motion.div
              className="projects-grid"
              layout
            >
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <div className="projects-empty">
              <p>No projects match these filters. Try another group or search term.</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="projects-pagination">
              <button
                type="button"
                className="pagination-arrow"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
                aria-label="Previous page"
              >
                <FiChevronLeft />
              </button>

              <div className="pagination-pages">
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    type="button"
                    key={page}
                    className={
                      currentPage === page
                        ? "pagination-page active"
                        : "pagination-page"
                    }
                    onClick={() =>
                      setCurrentPage(page)
                    }
                  >
                    {String(page).padStart(2, "0")}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="pagination-arrow"
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
                aria-label="Next page"
              >
                <FiChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

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

function ProjectCard({ project, index }) {
  return (
    <motion.article
      className="project-page-card"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08
      }}
    >
      <Link
        to={`/projects/${project.id}`}
        className="project-page-card-image"
      >
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/images/project-placeholder.svg";
          }}
        />

        <div className="project-page-card-overlay">
          <span>View Project</span>
          <FiArrowUpRight />
        </div>
      </Link>

      <div className="project-page-card-content">
        <div className="project-page-card-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </div>

        <Link
          to={`/projects/${project.id}`}
          className="project-page-card-title"
        >
          <h2>{project.title}</h2>
          <FiArrowUpRight />
        </Link>

        <p>{project.preview.description}</p>

        <div className="project-page-card-tech">
          {project.technologies
            .slice(0, 5)
            .map((technology) => (
              <span key={technology}>
                {technology}
              </span>
            ))}
        </div>
      </div>
    </motion.article>
  );
}

export default Projects;
