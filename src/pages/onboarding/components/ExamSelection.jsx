import { useEffect, useState } from "react";
import ExamCards from "./ExamCards";

const ExamSelection = ({ handleInputChange }) => {
  const [exam, setExam] = useState("");

  useEffect(() => {
    handleInputChange(exam, "exam");
  }, [exam]);

  return (
    <div className="flex justify-between  h-full w-full items-center  p-10 justify-between pb-2">
      <div className="h-full w-full flex flex-col justify-between">
        <div className="flex tracking-[0.8em] p-8 gap-6 text-[#DE5327] text-[16px] font-normal">
          <div>CHOOSE</div>
          <div>YOUR</div>
          <div>EXAM</div>
        </div>
        <div className="relative h-full flex justify-center items-center w-full text-center p-8">
          <div className="flex-col">
            <div className="text-[40px] font-medium clash-display text-white text-left">
              Select which competitive exam you’re preparing for
            </div>
            <div className="text-[20px] font-light poppins text-white text-left">
              This will help us tailor your curriculum and generate question
              paper easily.
            </div>
          </div>
        </div>
      </div>
      <ExamCards exam={exam} setExam={setExam} />
    </div>
  );
};

export default ExamSelection;
