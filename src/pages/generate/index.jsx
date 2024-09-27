import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenerateLoadingScreen from "./components/generate-loader";
import GenerateHome from "./components/gererate-home";
import { useGetUsersQuery, useGenerateQuestionsMutation } from "./api";

//i want to learn organic checmistry

const GenerateQuestion = () => {
  const navigate = useNavigate();
  const useDetails = JSON.parse(localStorage.getItem("userDetails"));

  const [loading, setLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [conversations, setConversations] = useState([]);

  const { data: users } = useGetUsersQuery();
  const [generateQuestions, { data, isLoading, isSuccess, error }] =
    useGenerateQuestionsMutation();

  console.log(users);

  const getPayload = (question, generateQuestions = false) => {
    return {
      context: {
        user: useDetails,
      },
      query: question || selectedQuestion,
      ...(generateQuestions && { takeTest: true }),
    };
  };

  const getFormattedActions = (actions) => {
    const formattedActionsList = [];

    actions.forEach((action) => {
      if (action === "ATTEND_EXAM") {
        formattedActionsList.push({
          title: "Take Test",
          action,
        });
      } else if (action === "REFER_NOTES") {
        formattedActionsList.push({
          title: "Refer notes",
          action,
        });
      }
    });

    return formattedActionsList;
  };

  const updateConversations = (conversation) => {
    setConversations((convs) => [...convs, conversation]);
  };

  const removeLoader = () => {
    setConversations((convs) => [...convs].slice(0, -1));
  };

  const onActionClick = (action) => {
    if (action === "ATTEND_EXAM") {
      setLoading(null, true);
      generateQuestions(getPayload(true));
    } else if (action === "REFER_NOTES") {
      navigate("/curriculum");
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

      if (data?.question) {
        updateConversations({
          type: "ANSWER",
          message: data.question,
          actions: getFormattedActions(data.actions),
        });
      } else {
        updateConversations({
          type: "ANSWER",
          message: "Oh no! Something went wrong.!",
        });
      }
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

  const onClick = (question) => {
    setSelectedQuestion(question);
    setConversations((convs) => [
      ...convs,
      {
        type: "QUESTION",
        message: question,
        time: "12:34 PM",
      },
    ]);

    generateQuestions(getPayload(question));
  };

  return (
    <div className="flex items-center justify-center h-screen w-full poppins">
      {loading ? (
        <GenerateLoadingScreen title="Generating your exam..." subtitle="Make sure you are at the top of your game for this!" />
      ) : (
        <GenerateHome
          conversations={conversations}
          onClick={onClick}
          onEventClick={onActionClick}
        />
      )}
    </div>
  );
};

export default GenerateQuestion;
