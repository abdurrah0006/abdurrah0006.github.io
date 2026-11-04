import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Button from "../../common/Button/Button";
import Emblem from "../../common/Emblem/Emblem";
import { SplitChars } from "../../common/Motion/Motion";
import useScrollEngine from "../../../hooks/useScrollEngine";
import profileData from "../../../data/profileData";
import "./Hero.css";

function Hero() {
  const nameRef = useRef(null);
  const emblemRef = useRef(null);
  const footRef = useRef(null);

  // Parallax: the name sinks, the footer rises, the emblem drifts and fades.
  useScrollEngine(({ y, vh, motionOff }) => {
    const name = nameRef.current;
    const emblem = emblemRef.current;
    const foot = footRef.current;
    if (!name || !emblem || !foot) return;

    if (motionOff || y > vh * 1.3) {
      if (motionOff) {
        name.style.transform = "";
        emblem.style.transform = "";
        emblem.style.opacity = "";
        foot.style.transform = "";
      }
      return;
    }

    const p = Math.min(y / vh, 1);
    name.style.transform = `translate3d(0, ${y * 0.16}px, 0)`;
    foot.style.transform = `translate3d(0, ${-y * 0.1}px, 0)`;
    emblem.style.transform = `translate3d(0, ${y * 0.22}px, 0) scale(${1 - p * 0.14})`;
    emblem.style.opacity = String(1 - p * 0.85);
  });

  const scrollToNext = () => {
    document.getElementById("statement")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" id="home" data-reveal-skip>
      <div className="hero-top">
        <span className="hero-status">
          <i aria-hidden="true" />
          {profileData.availability}
        </span>
        <span>{profileData.location}</span>
        <span className="hero-year">Portfolio {new Date().getFullYear()}</span>
      </div>

      <div className="hero-body">
        <div className="hero-emblem" ref={emblemRef}>
          <Emblem />
        </div>

        <h1 className="hero-name" ref={nameRef} aria-label={profileData.name}>
          <span className="hero-line">
            <SplitChars text={profileData.firstName} />
          </span>
          <span className="hero-line hero-line-last">
            <SplitChars text={profileData.lastName} offset={profileData.firstName.length} />
          </span>
        </h1>
      </div>

      <div className="hero-foot" ref={footRef}>
        <div className="hero-copy">
          <p className="hero-role">{profileData.title}</p>
          <p className="hero-tagline">{profileData.tagline}</p>
        </div>

        <div className="hero-actions">
          <Button to="/projects">
            View My Work
            <FiArrowUpRight />
          </Button>
          <Button to="/contact" variant="secondary">
            Let's Connect
          </Button>
        </div>

        <button type="button" className="hero-cue" onClick={scrollToNext}>
          <span className="hero-cue-line" aria-hidden="true" />
          Scroll
        </button>
      </div>
    </section>
  );
}

export default Hero;
