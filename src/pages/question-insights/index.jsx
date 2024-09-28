import { useState } from "react";
import OverAllAccuracy from "./components/OverAllAccuracy";
import PerformanceFeedback from "./components/OverallAnalysis";
import QuestionInsights from "./components/QuestionInsights";
import "./styles.css";

const Insights = () => {
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
          categorySplit={{
            EASY: "1/1",
            HARD: "2/2",
            MEDIUM: "1/2",
          }}
          performanceComment="You're on the right track! Your grasp on core physics concepts is strong"
          suggestion="You're on the right track! Your grasp on core physics concepts is strong"
        />
      </div>
      <QuestionInsights
        currentQuestion={currentQuestion}
        handleQuestionNumberClick={setCurrentQuestion}
        questions={questions}
        testSummary={testSummary}
      />
    </div>
  );
};

export default Insights;
