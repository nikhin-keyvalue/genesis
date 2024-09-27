import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import ChatBubble from "../chat-bubble";

const ChatList = ({
  conversations,
  onEventClick,
  className,
}) => {
  const hasConversations = !!conversations.length;

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [conversations]);

  return (
    <div
      ref={scrollRef}
      className={`transition-all duration-500 ease-in-out overflow-y-auto mb-4 ${
        hasConversations ? "h-[180px]" : "h-0 !m-0"
      } ${className}`}
    >
      {conversations.map((conversation) => (
        <div
          className="flex items-center justify-between mb-2"
          key={conversation.message}
        >
          <ChatBubble
            chat={conversation}
            onEventClick={onEventClick}
            scrollRef={scrollRef}
          />
        </div>
      ))}
    </div>
  );
};

ChatList.propTypes = {
  conversations: PropTypes.array,
  onEventClick: PropTypes.func,
  onActionClick: PropTypes.func,
  className: PropTypes.string,
};

export default ChatList;
