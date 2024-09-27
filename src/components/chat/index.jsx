// import PropTypes from "prop-types";

import { useState } from "react";
import { IconButton } from "../button";

import ChatList from "../chat-list";

const Chat = () => {
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([
    {
      type: "ANSWER",
      message:
        "I recommend you take a small test for 5 questions to help you progress...",
      actions: [
        {
          title: "Take Test",
          link: "/questions",
        },
        {
          title: "Refer notes",
          link: "/curriculum",
        },
      ],
    },
  ]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setConversations((convs) => [
        ...convs,
        {
          type: "QUESTION",
          message: input,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setInput("");

      setTimeout(() => {
        setConversations((convs) => [
          ...convs,
          {
            type: "LOADING",
          },
        ]);
      }, 300);

      setTimeout(() => {
        setConversations((convs) => [...convs].slice(0, -1));
        setConversations((convs) => [
          ...convs,
          {
            type: "ANSWER",
            message:
              "I recommend you take a small test for 5 questions to help you progress...",
            actions: [
              {
                title: "Take Test",
                link: "/questions",
              },
              {
                title: "Refer notes",
                link: "/curriculum",
              },
            ],
          },
        ]);
      }, 3000);
    }
  };

  return (
    <div className="h-screen p-4 border-l border-[#eae8e126]">
      <div className="mt-[44px] ml-[24px]">
        <img src="Logo.svg" alt="Chat Logo" />
        <div className="text-sm text-[#a89b94] mt-1 ml-[36px]">Chat away!</div>
      </div>

      <div className="h-[calc(100%-227px)]">
        <ChatList
          conversations={conversations}
          onEventClick={() => {
            // onEventClick
          }}
          className="h-[calc(100%-20px)]"
        />
      </div>

      <div className="p-4 bg-[#5555554d] rounded-xl border border-[#1111111a]">
        <div className="flex items-center">
          <textarea
            value={input}
            placeholder="Explain your difficulty in any topic or subject..."
            className="h-[calc(100%-57px)] mb-[5px] p-0 resize-none overflow-auto w-full flex-1 bg-transparent pb-1.5 text-base outline-none ring-0 placeholder:[#EAE8E1] text-[#EAE8E1]"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>

        <IconButton icon="/Attach.svg" size={40} />
      </div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
