import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { BackgroundMark } from "../../common/Mark/Mark";
import Preloader from "../../common/Preloader/Preloader";
import ScrollToTop from "../../common/ScrollToTop/ScrollToTop";
import { CustomCursor, CustomScrollbar } from "../../common/CursorScrollbar/CursorScrollbar";
import { useTheme } from "../../../context/ThemeContext";
import useAutoReveal from "../../../hooks/useAutoReveal";

function MainLayout() {
  const { pathname } = useLocation();
  const { introRun, motionReduced } = useTheme();

  // Inner pages get the same scroll-in motion automatically.
  useAutoReveal(`${pathname}-${motionReduced}`);

  return (
    <>
      <Preloader key={introRun} />
      <BackgroundMark />
      <Navbar />
      <ScrollToTop />
      <CustomCursor />
      <CustomScrollbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
