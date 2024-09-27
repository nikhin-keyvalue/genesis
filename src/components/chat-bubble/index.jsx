import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SendChatBubble = ({ message, time }) => (
  <div className="w-full flex flex-col items-end ">
    <div className="max-w-[80%] flex flex-col items-end ">
      <div className="bg-[#262626] px-[12px] py-[10px] rounded-lg">
        <p>{message}</p>
      </div>
      <p className="text-[#EAE8E1] text-[10px]">{time}</p>
    </div>
  </div>
);

const RecieveChatBubble = ({ message, actions }) => (
  <div className="w-full flex flex-col items-start">
    <div className="max-w-[80%] flex flex-col items-start ">
      <div className="text-[#EAE8E1] text-base">{message}</div>
      {!!actions?.length && (
        <div className="flex items-center gap-2 mt-3">
          {actions?.map((action) => (
            <Link
              to={action.link}
              key={action.title}
              className="flex items-center text-[#DE5327] hover:text-[#DE5327] border-[0.5px] border-[#DE5327] px-3 py-1 rounded-lg font-light"
            >
              {action.title}
              <img src="OrangeArrow.svg" alt="Arrrow" className="ml-2" />
            </Link>
          ))}
        </div>
      )}
    </div>
  </div>
);

const LoadingChat = ({ message, time }) => (
  <div className="bg-[#262626]">
    <p>{message}</p>
    <p>{time}</p>
  </div>
);

const ChatBubble = ({ chat }) => {
  switch (chat.type) {
    case "QUESTION":
      return <SendChatBubble message={chat.message} time={chat.time} />;
    case "ANSWER":
      return (
        <RecieveChatBubble
          message={chat.message}
          time={chat.time}
          actions={chat.actions}
        />
      );
    case "LOADING":
      return <LoadingChat message={chat.message} time={chat.time} />;
    default:
      return null;
  }
};

SendChatBubble.propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string,
};

RecieveChatBubble.propTypes = {
  message: PropTypes.string.isRequired,
  actions: PropTypes.array,
};

LoadingChat.propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string,
};

ChatBubble.propTypes = {
  chat: {
    message: PropTypes.string.isRequired,
    time: PropTypes.string,
    actions: PropTypes.array,
  },
};

export default ChatBubble;
