import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { RevealHeading } from "../../components/common/Motion/Motion";
import pagesData from "../../data/pagesData";
import "./NotFound.css";

const page = pagesData.notFound;

function NotFound() {
  return (
    <div className="ui-page not-found-page">
      <section className="not-found" data-reveal-skip>
        <div className="container">
          <p className="not-found-code" aria-hidden="true">
            {[...page.code].map((digit, index) => (
              <span key={`${digit}-${index}`} style={{ "--i": index }}>
                {digit}
              </span>
            ))}
          </p>

          <span className="ui-label">{page.eyebrow}</span>
          <RevealHeading as="h1" className="ui-h2 not-found-title" text={page.title} />
          <p className="ui-lead">{page.text}</p>

          <div className="ui-actions">
            <Link to="/" className="ui-btn">
              <FiArrowLeft />
              {page.home}
            </Link>
            <Link to="/projects" className="ui-link">
              {page.projects}
              <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NotFound;
