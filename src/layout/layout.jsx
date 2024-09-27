import Landing from "../pages/login";

const Layout = () => {
  return (
    <div className="relative">
      <div className="glow-container">
        <div className="ball" />
        <div className="ball1"></div>
        <div className="ball2"></div>
      </div>
      <div className="w-screen h-screen flex items-center justify-center z-10 fixed top-0 left-0">
        <Landing />
      </div>
    </div>
  );
};

export default Layout;
