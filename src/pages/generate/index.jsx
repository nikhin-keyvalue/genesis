import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenerateLoadingScreen from "./components/generate-loader";
import GenerateHome from "./components/gererate-home";
import { useGetUsersQuery } from "./api";

const GenerateQuestion = () => {
  const { data: users, error, isLoading } = useGetUsersQuery();

  console.log(users, error, isLoading);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  return (
    <div className="flex items-center justify-center h-screen w-full poppins">
      {loading ? (
        <GenerateLoadingScreen />
      ) : (
        <GenerateHome
          conversations={conversations}
          onClick={(question) => {
            setConversations((convs) => [...convs, question]);

            setTimeout(() => {
              setConversations((convs) => [
                ...convs,
                {
                  type: "ANSWER",
                  message:
                    "I recommend you take a small test for 5 questions to help you progress...",
                  actions: [
                    {
                      title: "Take Test",
                      link: "/generate-test",
                    },
                    {
                      title: "Refer notes",
                      link: "/curriculum",
                    },
                  ],
                },
              ]);
            }, 3000);
          }}
          onEventClick={(route) => {
            setLoading(true);

            setTimeout(() => {
              navigate(route);
            }, 3000);
          }}
        />
      )}
    </div>
  );
};

export default GenerateQuestion;
