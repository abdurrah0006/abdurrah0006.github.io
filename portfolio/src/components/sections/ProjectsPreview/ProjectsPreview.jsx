import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiPlus } from "react-icons/fi";
import { RevealHeading, SectionIndex } from "../../common/Motion/Motion";
import useMediaQuery from "../../../hooks/useMediaQuery";
import projectsData from "../../../data/projectsData";
import profileData from "../../../data/profileData";
import pagesData from "../../../data/pagesData";
import "./ProjectsPreview.css";

const { home } = profileData;
const FALLBACK_IMAGE = pagesData.projects.imageFallback;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function pickSelected() {
  const byId = new Map(projectsData.map((project) => [project.id, project]));
  const picked = home.selectedProjects.map((id) => byId.get(id)).filter(Boolean);
  return picked.length ? picked : projectsData.filter((project) => project.featured);
}

const onImageError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = FALLBACK_IMAGE;
};

// "03 / Selected work": the projects are set as big headings with the picture
// hidden. Hover (or focus) a title and its image slides out beside your cursor.
// Touch screens have no hover, so tapping a title opens it inline instead.
function ProjectsPreview() {
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");
  const selected = useMemo(pickSelected, []);
  const more = useMemo(
    () => projectsData.filter((project) => !selected.includes(project)).slice(0, home.moreProjectsCount),
    [selected]
  );

  const [active, setActive] = useState(null); // hovered row (mouse)
  const [open, setOpen] = useState(null); // opened row (touch)
  const [openMore, setOpenMore] = useState(null);

  const previewRef = useRef(null);
  const cursor = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // The preview card eases toward the pointer and leans into the motion.
  useEffect(() => {
    if (!fine || active === null) return undefined;

    const preview = previewRef.current;
    let frame = 0;

    const onMove = (event) => {
      cursor.current.targetX = event.clientX;
      cursor.current.targetY = event.clientY;
    };

    const loop = () => {
      const c = cursor.current;
      const reduced = document.documentElement.dataset.motion === "reduced";
      const ease = reduced ? 1 : 0.14;
      const lean = clamp((c.targetX - c.x) * 0.06, -12, 12);

      c.x += (c.targetX - c.x) * ease;
      c.y += (c.targetY - c.y) * ease;

      if (preview) {
        preview.style.transform = `translate3d(${c.x}px, ${c.y}px, 0) translate(-50%, -58%) rotate(${lean}deg)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, [fine, active]);

  const enterRow = (index, event) => {
    if (!fine) return;
    const c = cursor.current;
    if (active === null) {
      // start the card at the pointer so it doesn't fly in from the corner
      c.x = c.targetX = event.clientX;
      c.y = c.targetY = event.clientY;
    }
    setActive(index);
  };

  return (
    <section className="work" id="work" data-reveal-skip>
      <div className="container">
        <SectionIndex
          number="03"
          label={home.sections.work.label}
          note={fine ? home.sections.work.hint : home.sections.work.hintTouch}
        />
        <RevealHeading className="work-title" text={home.sections.work.title} />

        <ol
          className={`feature-list ${active !== null ? "has-active" : ""}`}
          onMouseLeave={() => setActive(null)}
        >
          {selected.map((project, index) => {
            const number = String(index + 1).padStart(2, "0");
            const isActive = fine ? active === index : open === index;

            return (
              <li
                className={`feature-row ${isActive ? "is-active" : ""}`}
                key={project.id}
                onMouseEnter={(event) => enterRow(index, event)}
              >
                {fine ? (
                  <Link
                    to={`/projects/${project.id}`}
                    className="feature-link"
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(null)}
                  >
                    <span className="feature-number">{number}</span>
                    <span className="feature-title">{project.title}</span>
                    <span className="feature-meta">
                      {project.category}
                      <FiArrowUpRight />
                    </span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="feature-link"
                    aria-expanded={isActive}
                    aria-controls={`feature-${project.id}`}
                    onClick={() => setOpen(isActive ? null : index)}
                  >
                    <span className="feature-number">{number}</span>
                    <span className="feature-title">{project.title}</span>
                    <span className="feature-meta">
                      <FiPlus />
                    </span>
                  </button>
                )}

                <div className="feature-detail" id={`feature-${project.id}`}>
                  <div>
                    <p>{project.preview.description}</p>
                    <ul className="ui-chips">
                      {project.technologies.slice(0, 5).map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>

                    {!fine ? (
                      <>
                        <img
                          className="feature-inline-image"
                          src={project.image}
                          alt={`${project.title} preview`}
                          loading="lazy"
                          onError={onImageError}
                        />
                        <Link to={`/projects/${project.id}`} className="ui-link">
                          View project
                          <FiArrowUpRight />
                        </Link>
                      </>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {fine ? (
        <div
          className={`feature-preview ${active !== null ? "is-visible" : ""}`}
          ref={previewRef}
          aria-hidden="true"
        >
          {selected.map((project, index) => (
            <img
              key={project.id}
              className={active === index ? "is-on" : ""}
              src={project.image}
              alt=""
              draggable="false"
              onError={onImageError}
            />
          ))}
        </div>
      ) : null}

      <div className="container work-more">
        <div className="work-more-head">
          <h3>{home.sections.work.moreTitle}</h3>
          <Link to="/projects" className="ui-link">
            View all projects
            <FiArrowUpRight />
          </Link>
        </div>

        <ul className="work-rows">
          {more.map((project) => {
            const isOpen = openMore === project.id;

            return (
              <li className={`work-row ${isOpen ? "is-open" : ""}`} key={project.id}>
                <button
                  type="button"
                  className="work-row-head"
                  aria-expanded={isOpen}
                  aria-controls={`work-row-${project.id}`}
                  onClick={() => setOpenMore(isOpen ? null : project.id)}
                >
                  <span className="work-row-title">{project.title}</span>
                  <span className="work-row-category">{project.category}</span>
                  <span className="work-row-plus" aria-hidden="true">
                    <FiPlus />
                  </span>
                </button>

                <div className="work-row-body" id={`work-row-${project.id}`}>
                  <div>
                    <p>{project.preview.description}</p>
                    <div className="work-row-links">
                      <Link to={`/projects/${project.id}`} className="ui-link">
                        View project
                        <FiArrowUpRight />
                      </Link>
                      {project.links.github ? (
                        <a href={project.links.github} className="ui-link" target="_blank" rel="noreferrer">
                          GitHub
                          <FiArrowUpRight />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ProjectsPreview;
