import { useState } from "react";
import { useEffect } from "react";

const OverAllAccuracy = ({ accuracy, percentile }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [correct, total] = accuracy.split("/").map(Number);
  const percentage = (correct / total) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full h-full overflow-hidden rounded-lg bg-cover bg-center bg-no-repeat bg-[url('feedback-bg.png')] bg-[#403B38] rounded-lg bg-opacity-10">
      <div className="flex flex-col h-full justify-around p-6 rounded-lg relative overflow-hidden">
        <div className="flex tracking-[0.8em] gap-6 text-[#DE5327] text-[16px] poppins font-normal">
          <div>TEST</div>
          <div>FEEDBACK</div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="ml-6">
              <div className=" poppins font-normal text-[#808080] text-[16px]">
                Your percentile
              </div>
              <div className="text-white text-[40px] font-medium poppins">
                {percentile}
              </div>
            </div>
          </div>
          <div className="w-[1px] h-[50%] bg-[#3A3A3A]" />
          <div className="">
            <div className="poppins font-normal text-[#808080] text-[16px]">
              Overall accuracy
            </div>
            <div className="flex justify-center items-center gap-2">
              <div className="relative w-10 h-10 flex">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-[#DE532723]"
                    strokeWidth="14"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-[#DE5327] transition-all duration-1000 ease-out"
                    strokeWidth="14"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - animatedPercentage / 100)}
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                  />
                </svg>
              </div>
              <div className="text-white text-[40px] font-medium poppins">
                {Math.round((animatedPercentage / 100) * total)}
                <span className="text-[24px] font-normal text-gray-500 poppins">
                  /{total}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverAllAccuracy;
