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

  return (
    <div className="flex items-center justify-center h-screen w-full poppins">
      {loading ? (
        <GenerateLoadingScreen />
      ) : (
        <GenerateHome
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
