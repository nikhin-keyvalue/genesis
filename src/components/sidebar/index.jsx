import { useState } from "react";
import PropTypes from "prop-types";
// import { FileText, Sparkles, Trophy } from "lucide-react";

export default function ExpandableSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`z-10 flex flex-col px-4 items-center h-screen pt-[60px] border-r-[0.5px] border-[#403B38] text-white transition-all duration-300 ease-in-out ${
        isExpanded ? "w-[293px]" : "w-[127px]"
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div
        className={`flex items-center clash-display mb-[40px] text-[32px] font-medium justify-start ${
          isExpanded ? "text-[44px]" : "text-[30px] "
        }`}
      >
        {isExpanded ? <span>Mars</span> : <span>M</span>}
        <span className="text-red-500 ml-1 mb-1">.</span>
      </div>

      <div className="border-b-[0.5px] border-[#403B38] w-full" />

      <div className="h-full flex flex-col justify-between">
        <nav
          className={`flex flex-col space-y-[40px] pt-[46px] ${
            isExpanded ? "justify-start" : "justify-center"
          }`}
        >
          <NavItem icon="AI" text="Generate test" isExpanded={isExpanded} />
          <NavItem
            icon="Document"
            text="Your curriculum"
            isExpanded={isExpanded}
          />
        </nav>
        <div className="p-4 flex items-center">
          <img
            src="Avatar.svg"
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
          {isExpanded && (
            <div className="ml-3">
              <p className="font-semibold">Jane Doe</p>
              <p className="text-xs text-gray-400">View profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, text, isExpanded }) {
  return (
    <div
      className={`flex items-center  space-x-4 rounded-lg cursor-pointer1 ${
        isExpanded ? "justify-start" : "justify-center"
      }`}
    >
      <img src={`${icon}.svg`} alt="Sidenav" height="40" width="40" />
      {isExpanded && (
        <span className="overflow-hidden text-nowrap">{text}</span>
      )}
    </div>
  );
}

NavItem.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};
