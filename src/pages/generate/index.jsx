import { useState } from "react";
import GenerateLoadingScreen from "./components/generate-loader";
import GenerateHome from "./components/gererate-home";

const GenerateQuestion = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen w-screen poppins">
      {loading ? (
        <GenerateLoadingScreen />
      ) : (
        <GenerateHome onClick={() => setLoading(true)} />
      )}
    </div>
  );
};

export default GenerateQuestion;
