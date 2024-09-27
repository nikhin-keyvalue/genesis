import PropTypes from "prop-types";
import { useState, useEffect } from "react";

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

const RecieveChatBubble = ({ message, actions, onEventClick, scrollRef }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (currentIndex <= message.length - 1) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + message[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
        if (currentIndex === message.length - 1) {
          setIsTyping(false);
        }
      }, 20);
    }

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, message, isTyping, scrollRef]);

  return (
    <div className="w-full flex flex-col items-start">
      <div className="max-w-[80%] flex flex-col items-start ">
        <div className="text-[#EAE8E1] text-base">{currentText}</div>
        {!!actions?.length && !isTyping && (
          <div className="flex items-center gap-2 mt-3">
            {actions?.map((action) => (
              <div
                key={action.title}
                onClick={() => onEventClick(action.link)}
                className="flex items-center text-[#DE5327] hover:text-[#DE5327] border-[0.5px] border-[#DE5327] px-3 py-1 rounded-lg font-light"
              >
                {action.title}
                <img src="OrangeArrow.svg" alt="Arrrow" className="ml-2" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingChat = () => (
  <div className="w-full flex flex-col items-start">
    <div className="w-[80px] flex flex-col items-start">
      <div className="bg-[#282828] py-2 px-4 flex items-center rounded-lg">
        <img src="ai.png" alt="AI" width="12px" height="12px" />
        <p className="text-[#EAE8E1] font-medium text-sm m-1">M</p>
      </div>
    </div>
  </div>
);

const ChatBubble = ({ chat, onEventClick, scrollRef }) => {
  switch (chat.type) {
    case "QUESTION":
      return <SendChatBubble message={chat.message} time={chat.time} />;
    case "ANSWER":
      return (
        <RecieveChatBubble
          message={chat.message}
          time={chat.time}
          actions={chat.actions}
          onEventClick={onEventClick}
          scrollRef={scrollRef}
        />
      );
    case "LOADING":
      return <LoadingChat />;
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
  onEventClick: PropTypes.func,
  scrollRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
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
  onEventClick: PropTypes.func,
  scrollRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default ChatBubble;
