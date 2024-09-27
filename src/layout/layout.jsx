import PropTypes from "prop-types";
import ExpandableSidebar from "../components/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      <div className="glow-container">
        <div className="ball" />
        <div className="ball1"></div>
        <div className="ball2"></div>
      </div>

      <div className="flex items-center h-screen w-screen">
        <ExpandableSidebar />
        <div className="flex items-center justify-center h-screen w-full z-10">
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
