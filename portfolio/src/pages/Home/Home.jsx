import Hero from "../../components/sections/Hero/Hero";
import { TickerBand, MarqueeLines } from "../../components/sections/MarqueeBand/MarqueeBand";
import AboutPreview from "../../components/sections/AboutPreview/AboutPreview";
import ServicesPanels from "../../components/sections/ServicesPanels/ServicesPanels";
import ProjectsPreview from "../../components/sections/ProjectsPreview/ProjectsPreview";
import SkillsPreview from "../../components/sections/SkillsPreview/SkillsPreview";
import JourneyPreview from "../../components/sections/JourneyPreview/JourneyPreview";
import ContactCTA from "../../components/sections/ContactCTA/ContactCTA";

function Home() {
  return (
    <>
      <Hero />
      <TickerBand />
      <AboutPreview />
      <ServicesPanels />
      <MarqueeLines />
      <ProjectsPreview />
      <SkillsPreview />
      <JourneyPreview />
      <ContactCTA />
    </>
  );
}

export default Home;
