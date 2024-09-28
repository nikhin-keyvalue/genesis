import { useState } from "react";
import OverAllAccuracy from "./components/OverAllAccuracy";
import PerformanceFeedback from "./components/OverallAnalysis";
import QuestionInsights from "./components/QuestionInsights";
import "./styles.css";
import Chat from "../../components/chat";

const Insights = () => {
  const [openChat, setOpenChat] = useState(false);
  const answeredData = JSON.parse(localStorage.getItem("submitedData"));
  const testSummary = JSON.parse(localStorage.getItem("testSummary"));
  const accuracyData = JSON.parse(localStorage.getItem("accuracy"));
  const questions = answeredData?.context?.question_answers || [];

  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  return (
    <div className="w-full h-full p-24 flex gap-4">
      <div className="h-full flex flex-col gap-8">
        <OverAllAccuracy
          accuracy={accuracyData.totalAccuracy}
          percentile="86.23"
        />
        <PerformanceFeedback
          categorySplit={accuracyData.categoryAccuracy}
          performanceComment={
            testSummary?.properties?.overall_feedback?.description ||
            "You're on the right track! Your grasp on core physics concepts is strong"
          }
        />
      </div>
      <QuestionInsights
        currentQuestion={currentQuestion}
        handleQuestionNumberClick={setCurrentQuestion}
        questions={questions}
        testSummary={testSummary}
        onOpenChat={() => setOpenChat(true)}
      />

      <div
        className={`w-[500px] transition-all duration-500 ease-in-out  shadow-lg fixed top-0 ${
          openChat ? "right-0" : "right-[-500px]"
        }`}
      >
        <Chat isUserExplainFlow={false} context={{}} />
      </div>
    </div>
  );
};

export default Insights;
