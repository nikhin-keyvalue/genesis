import { useEffect, useState } from "react";

import { Button } from "../../../components/button";
import { useNavigate } from "react-router-dom";

const DifficultyBar = ({ difficulty, score, color }) => {
  const navigate = useNavigate();

  const [correct, total] = score.split("/").map(Number);
  const percentage = (correct / total) * 100;

  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="flex mb-4 w-full items-end">
      <div className="w-full flex flex-col justify-between mb-1">
        <span className="clash-display text-xl font-medium text-[#EAE8E1] capitalize">
          {difficulty.toLowerCase()}
        </span>
        <div className="w-full bg-[#FFFFFF10] rounded-full h-1">
          <div
            className={`h-1 rounded-full ${color} transition-all duration-1000 ease-out`}
            style={{ width: `${animatedPercentage}%` }}
          ></div>
        </div>
      </div>
      <span className="text-xl poppins text-[#EAE8E1] pr-2 pl-8">
        {correct}
        <span className="text-[#808080]">{`/${total}`}</span>
      </span>
    </div>
  );
};

export default function PerformanceFeedback({
  categorySplit,
  performanceComment,
  handleBtn
}) {
  return (
    <div className="w-full h-full">
      <div className="bg-[#A0A0A00D] p-6 rounded-[10px] backdrop-blur-[30px] flex flex-col justify-between h-full">
        <div>
          <h2 className=" bg-[#FFFFFF1A] p-[4px_8px] text-[#EAE8E1] text-xs font-normal mb-4 flex items-center gap-[8px] rounded-[22px] w-fit">
            <img src="info.png" />
            Difficulty categories
          </h2>
          <DifficultyBar
            difficulty="Easy"
            score={categorySplit.EASY}
            color="bg-teal-500"
          />
          <DifficultyBar
            difficulty="Medium"
            score={categorySplit.MEDIUM}
            color="bg-orange-500"
          />
          <DifficultyBar
            difficulty="Hard"
            score={categorySplit.HARD}
            color="bg-red-500"
          />
        </div>

        <div className=" flex flex-col gap-8">
          <div className="bg-[#0E0E0ECC] border border-[#A0A0A029] p-6 rounded-[10px] backdrop-blur-[30px] p-4">
            <h3 className="text-[#DE5327] text-[14px] font-normal  mb-2 flex gap-2 items-center">
              <img src="overall-perfomance.png" />
              Overall performance
              <img className="small-icon" src="ai.png" />
            </h3>
            <p className="text-[#EAE8E1] text-[14px] font-light ">
              {performanceComment}
            </p>
          </div>
          <Button className="font-medium text-[16px] clash-display text-[#EAE8E1] gap-2 h-[48px]" onClick={handleBtn}>
            <img className="h-[25px]" src="white-ai.png" />
            Your curated curriculum
            <img src="arrow-right.png" />
          </Button>
        </div>
      </div>
    </div>
  );
}
