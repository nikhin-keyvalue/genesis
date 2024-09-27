import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { Button, IconButton } from "../../../components/button";
import ChatList from "../../../components/chat-list";
import { useGenerateQuestionsMutation } from "../api";

const GenerateHome = ({ onEventClick }) => {
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);

  const [generateQuestions, { data, isLoading, isSuccess, error }] =
    useGenerateQuestionsMutation();

  const hasConversations = !!conversations.length;

  console.log(isLoading, isSuccess, error);

  useEffect(() => {
    if (isLoading) {
      setConversations((convs) => [
        ...convs,
        {
          type: "LOADING",
        },
      ]);
    }
  }, [isLoading]);

  useEffect(() => {
    if ((data, isSuccess)) {
      // const parsedData = JSON.parse(data);
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
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (error) {
      setConversations((convs) => [...convs].slice(0, -1));
      setConversations((convs) => [
        ...convs,
        {
          type: "ANSWER",
          message: "Oh no! Something went wrong.!",
        },
      ]);
    }
  }, [error]);

  const onClick = () => {
    setInput("");

    setConversations((convs) => [
      ...convs,
      {
        type: "QUESTION",
        message: input,
        time: "12:34 PM",
      },
    ]);

    generateQuestions({
      context: {
        user: {
          id: "0f682b27-cff1-46ea-b3f2-85147f8ed7ae",
          name: "Alan Walker",
          phone: "9895149915",
          expectedRank: "100",
          summary: "I want to get rank - 100 in GATE exam",
          institution: "XYLEM",
          exam: "GATE",
          proficiency: "ELITE",
        },
      },
      query: input,
    });
  };

  return (
    <div className="flex flex-col items-center w-[864px]">
      <div className="text-[40px] font-medium clash-display">
        Generate your question paper.
      </div>
      <div className="text-[20px] font-light mt-3 text-center">
        Mars offers personalised tutoring based on a calculated
        <br />
        assessment of your strong and weak points
      </div>

      <div
        className={`bg-black rounded-[20px] p-5 mt-[50px] border border-[#403B38] w-full transition-all duration-500 ease-in-out  ${
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

        <ChatList conversations={conversations} onEventClick={onEventClick} />

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
          <Button onClick={onClick} className="!w-[88px]">
            <img src="Generate.svg" alt="Generate" />
          </Button>
        </div>
      </div>

      <div className="font-medium flex items-center mt-[64px] clash-display">
        Sample prompts
        <IconButton icon="/Arrows.svg" size={32} className="ml-4" />
      </div>

      <div className="flex items-center gap-4 !text-gray-200 mt-[14px] text-base max-w-[70vw] min-w-[864px] w-full">
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
