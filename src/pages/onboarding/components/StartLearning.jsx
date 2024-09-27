const StartLearning = () => {
  return (
    <div className="flex justify-between h-full w-full items-center  p-10 justify-between pb-2">
      <div className="h-full w-[50%] flex flex-col justify-between">
        <div className="flex tracking-[0.8em] p-8 gap-6 text-[#DE5327] text-[16px] font-normal">
          <div>START</div>
          <div>YOUR</div>
          <div>LEARNING</div>
        </div>
        <div className="h-full flex justify-center items-center">
          <div className="flex-col">
            <div className="text-[40px] font-medium clash-display text-white text-left">
              All set!
            </div>
            <div className="text-[20px] font-light poppins text-white text-left">
              Are you ready to begin your learning path to Ace your toughest
              exams? We are all set to help and guide you through the journey...
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-[451px] w-[675px] bg-[#403B38] rounded-lg bg-opacity-10">
        <img
          src="get-started.png"
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default StartLearning;
