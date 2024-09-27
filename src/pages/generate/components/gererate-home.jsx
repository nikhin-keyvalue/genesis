import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

import { useState } from "react";
import { Button, IconButton } from "../../../components/button";
import ChatBubble from "../../../components/chat-bubble";

const GenerateHome = ({ conversations, onClick, onEventClick }) => {
  const [input, setInput] = useState("");

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
    <div className="flex flex-col items-center">
      <div className="text-[40px] font-medium clash-display">
        Generate your question paper.
      </div>
      <div className="text-[20px] font-light mt-3 text-center">
        Mars offers personalised tutoring based on a calculated
        <br />
        assessment of your strong and weak points
      </div>

      <div
        className={`bg-black rounded-[20px] p-5 mt-[50px] border border-[#403B38] w-[45vw] transition-all duration-500 ease-in-out  ${
          hasConversations ? " h-[280px]" : " h-[180px]"
        }`}
      >
        {!hasConversations && (
          <textarea
            value={input}
            placeholder="Explain your difficulty in any topic or subject..."
            className="h-[calc(100%-57px)] mb-[5px] p-0 resize-none overflow-auto w-full flex-1 bg-transparent pb-1.5 text-base outline-none ring-0 placeholder:[#EAE8E1] text-[#EAE8E1]"
            onChange={(e) => setInput(e.target.value)}
          />
        )}

        <div
          ref={scrollRef}
          className={`transition-all duration-500 ease-in-out overflow-y-auto mb-4 ${
            hasConversations ? "h-[180px]" : "h-0 !m-0"
          }`}
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

        <div className="flex justify-between">
          <IconButton icon="/Attach.svg" size={40} />
          {hasConversations && (
            <input
              value={input}
              placeholder="Explain your difficulty in any topic or subject..."
              className="h-[40px] p-0 mx-2 resize-none overflow-auto w-full flex-1 bg-transparent text-base ring-0 placeholder:[#EAE8E1] text-[#EAE8E1] !outline-none"
              onChange={(e) => setInput(e.target.value)}
            />
          )}
          <Button
            onClick={() => {
              onClick({
                type: "QUESTION",
                message: input,
                time: "12:34 PM",
              });
              setInput("");
            }}
            className="!w-[88px]"
          >
            <img src="Generate.svg" alt="Generate" />
          </Button>
        </div>
      </div>

      <div className="font-medium flex items-center mt-[64px] clash-display">
        Sample prompts
        <IconButton icon="/Arrows.svg" size={32} className="ml-4" />
      </div>

      <div className="flex items-center gap-4 !text-gray-200 mt-[14px] text-base w-[70vw]">
        <div className=" border text-left border-[#403B38] text-[#403B38] w-1/3 rounded-[8px] p-4">
          Make me a mock test for physics to prepare for JEE Mains. Time limit
          is 30 min with 30 questions
        </div>
        <div className=" border text-left border-[#403B38] text-[#403B38] w-1/3 rounded-[8px] p-4">
          Make me a mock test for physics to prepare for JEE Mains. Time limit
          is 30 min with 30 questions
        </div>
        <div className=" border text-left border-[#403B38] text-[#403B38] w-1/3 rounded-[8px] p-4">
          Make me a mock test for physics to prepare for JEE Mains. Time limit
          is 30 min with 30 questions
        </div>
      </div>
    </div>
  );
};

GenerateHome.propTypes = {
  conversations: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default GenerateHome;
