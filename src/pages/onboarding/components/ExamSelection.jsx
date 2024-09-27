const ExamSelection = () => {
    return (
      <div className="grid grid-cols-2 gap-44 h-full w-full items-center  p-10 justify-between pb-2">
      <div className="h-full flex flex-col justify-between">
        <div className="flex tracking-[0.8em] p-8 gap-6 text-[#DE5327] text-[16px] font-normal">
          <div >CHOOSE</div>
          <div>YOUR</div>
          <div>EXAM</div>
        </div>
        <div className="relative h-full flex justify-center items-center w-full text-center p-8">
        <div className="flex-col">
            <div className="text-[40px] font-medium class-display text-white text-left">Select which competitive exam you’re preparing for</div>
            <div className="text-[20px] font-medium poppins text-white text-left">This will help us tailor your curriculum and generate question paper easily.</div>
        </div>
    </div>
      </div>
      <div className="h-full flex-col justify-center items-center w-full p-4 ">
       <div className="flex justify-between">
        Popular exams
        <div> search bar</div>
       </div>
       <div className="grid grid-cols-2 gap-16">
        <div className="height-[170px] w-[323px]">1</div>
        <div className="height-[170px] w-[323px]">1</div>
        <div className="height-[170px] w-[323px]">1</div>
        <div className="height-[170px] w-[323px]">1</div>
       </div>
      </div>
    </div>
    );
  };
  
  export default ExamSelection;
  