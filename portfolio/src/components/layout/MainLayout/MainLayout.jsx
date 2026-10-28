import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import CursorGlow from "../../common/CursorGlow/CursorGlow";
import ScrollToTop from "../../common/ScrollToTop/ScrollToTop";
import { CustomCursor, CustomScrollbar } from "../../common/CursorScrollbar/CursorScrollbar";

function MainLayout() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <CursorGlow />
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