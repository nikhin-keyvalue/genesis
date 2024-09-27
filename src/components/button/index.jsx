import PropTypes from "prop-types";

const Button = ({ className, children, onClick }) => (
  <button
    className={`w-full h-[48px] bg-[#DE5327] color-white flex items-center justify-center  outline-none ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const IconButton = ({ className, icon, onClick, size = 48 }) => (
  <button
    className={`flex p-0 justify-center items-center border border-[#EAE8E11A] rounded-lg cursor-pointer bg-[#111111] ${className}`}
    onClick={onClick}
    style={{ width: size, height: size }}
  >
    <img src={icon} alt="Attach" />
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.number || PropTypes.string,
  onClick: PropTypes.func,
};

export { Button, IconButton };
