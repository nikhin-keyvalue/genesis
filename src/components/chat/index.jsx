import PropTypes from "prop-types";

import { useState, useEffect } from "react";
import { IconButton } from "../button";

import ChatList from "../chat-list";
import { useGenerateAssessmentQuestionsMutation } from "../../pages/generate/api";
import useVoiceAssistant from "../../hooks/useVoiceAssistant";

const Chat = ({ context }) => {
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const useDetails = JSON.parse(localStorage.getItem("userDetails"));
  const { isRecording, startRecording, stopRecording, messages } =
    useVoiceAssistant();

  useEffect(() => {
    console.log(isRecording, messages);
  }, [messages]);

  const [generateAssessmentQuestions, { data, isLoading, isSuccess, error }] =
    useGenerateAssessmentQuestionsMutation();

  const updateConversations = (conversation) => {
    setConversations((convs) => [...convs, conversation]);
  };

  const removeLoader = () => {
    setConversations((convs) => [...convs].slice(0, -1));
  };

  const getPayload = () => {
    return {
      context: {
        user: useDetails,
        questionWithAnswer: context,
      },
      query: input,
    };
  };

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

      generateAssessmentQuestions(getPayload());
    }
  };

  useEffect(() => {
    if (isLoading) {
      updateConversations({
        type: "LOADING",
      });
    }
  }, [isLoading]);

  useEffect(() => {
    if ((data, isSuccess)) {
      removeLoader();

      if (!data) {
        updateConversations({
          type: "ANSWER",
          message: "Oh no! Something went wrong.!",
        });
      }

      updateConversations({
        type: "ANSWER",
        message: data,
      });
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (error) {
      removeLoader();
      updateConversations({
        type: "ANSWER",
        message: "Oh no! Something went wrong.!",
      });
    }
  }, [error]);

  return (
    <div className="h-screen p-4 border-l border-[#eae8e126]">
      <div className="mt-[44px] ml-[24px] mb-[20px]">
        <img src="Logo.svg" alt="Chat Logo" />
        <div className="text-sm text-[#a89b94] mt-1 ml-[36px]">Chat away!</div>
      </div>

      <div className="p-5 bg-[rgba(17,17,17,1)] mb-2 rounded-lg text-sm backdrop-blur-lg">
        {context.question}
      </div>

      <div className="h-[calc(100%-370px)]">
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
            placeholder="Ask anything related to what you want to know about this question or topic..."
            className="h-[calc(100%-57px)] mb-[5px] p-0 resize-none overflow-auto w-full flex-1 bg-transparent pb-1.5 text-base outline-none ring-0 placeholder:[#EAE8E1] text-[#EAE8E1]"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
          />
        </div>

        <IconButton
          icon="/Attach.svg"
          size={40}
          onClick={() => {
            startRecording();
          }}
        />
      </div>
    </div>
  );
};

Chat.propTypes = {
  context: PropTypes.any,
};

export default Chat;
