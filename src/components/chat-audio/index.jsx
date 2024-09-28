import PropTypes from "prop-types";

const ChatAudio = ({ onClose }) => {
  return (
    <div className="w-full h-full">
      <div className="h-[calc(100%-300px)] flex items-center justify-center space-x-2 p-6 rounded-lg">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-[80px] bg-white rounded-full"
            style={{
              animation: `wave 1.5s ease-in-out ${index * 0.15}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="w-full flex items-center justify-center ">
        <div
          className="flex items-center justify-center h-[70px] w-[70px] rounded-full bg-[#272727] cursor-pointer hover:bg-[#555454]"
          onClick={onClose}
        >
          <img src="Close.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

ChatAudio.propTypes = {
  onClose: PropTypes.func,
};

export default ChatAudio;
