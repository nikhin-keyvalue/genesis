import PropTypes from "prop-types";
import "./styles.css";

const Input = ({ type = "text", placeholder, className, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`login-input poppins h-[64px] mt-2 p-[4px_12px] w-full bg-transparent border border-[rgba(234,232,225,0.2)] rounded-md text-[20px] box-border ${className}`}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Input;
