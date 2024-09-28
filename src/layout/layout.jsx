import PropTypes from "prop-types";
import ExpandableSidebar from "../components/sidebar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const path = useLocation();
  const { pathname } = path;
  return (
    <div className="relative">
      <div className="glow-container">
        <div className="ball" />
        <div className="ball1"></div>
        <div className="ball2"></div>
      </div>

      <div className="flex items-center h-screen w-screen">
        {!(pathname.includes("login") || pathname.includes("onboarding")) && (
          <ExpandableSidebar />
        )}
        <div className="flex items-center justify-center h-screen w-[calc(100%-127px)] z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
