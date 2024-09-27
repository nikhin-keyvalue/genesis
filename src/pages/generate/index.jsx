import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenerateLoadingScreen from "./components/generate-loader";
import GenerateHome from "./components/gererate-home";
import { useGetUsersQuery, useGenerateQuestionsMutation } from "./api";

const GenerateQuestion = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const { data: users } = useGetUsersQuery();
  const [generateQuestions, { data, isLoading, isSuccess, error }] =
    useGenerateQuestionsMutation();

  console.log(users);
  console.log(isLoading, isSuccess, error);

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
      setLoading(true);
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

      if (data.question) {
        updateConversations({
          type: "ANSWER",
          message: data.question,
          actions: getFormattedActions(data.actions),
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
    setConversations((convs) => [
      ...convs,
      {
        type: "QUESTION",
        message: question,
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
      query: question,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen w-full poppins">
      {loading ? (
        <GenerateLoadingScreen />
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
