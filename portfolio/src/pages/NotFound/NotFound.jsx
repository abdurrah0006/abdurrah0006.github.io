import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <section className="not-found-section">
        <div className="container">
          <div className="not-found-content">
            <motion.div
              className="not-found-code"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <span>4</span>
              <span className="not-found-zero">0</span>
              <span>4</span>
            </motion.div>

            <motion.div
              className="not-found-copy"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <span className="not-found-eyebrow">
                ERROR / PAGE NOT FOUND
              </span>

              <h1>
                Looks like this page
                <span> wandered off.</span>
              </h1>

              <p>
                The page you're looking for doesn't exist,
                may have moved, or the URL might be incorrect.
              </p>
            </motion.div>

            <motion.div
              className="not-found-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/" className="not-found-primary">
                <ArrowLeft />
                Back Home
              </Link>

              <Link to="/projects" className="not-found-secondary">
                View Projects
                <FiArrowUpRight />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;