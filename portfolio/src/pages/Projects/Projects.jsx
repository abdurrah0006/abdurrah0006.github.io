import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import projectsData from "../../data/projectsData";
import "./Projects.css";

const PROJECTS_PER_PAGE = 6;

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(projectsData.map((project) => project.category))
    ];

    return ["All", ...uniqueCategories];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projectsData;
    }

    return projectsData.filter(
      (project) => project.category === activeCategory
    );
  }, [activeCategory]);

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

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
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

      <section className="projects-section section">
        <div className="container">
          <div className="projects-toolbar">
            <div className="projects-filters">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    activeCategory === category
                      ? "project-filter active"
                      : "project-filter"
                  }
                  onClick={() =>
                    handleCategoryChange(category)
                  }
                >
                  {category}
                </button>
              ))}
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
              <p>No projects found in this category.</p>
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