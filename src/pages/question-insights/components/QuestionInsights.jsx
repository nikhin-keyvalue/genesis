import { Button } from "../../../components/button";
import Chat from "../../../components/chat";

const QuestionInsights = ({
  currentQuestion,
  testSummary,
  handleQuestionNumberClick,
  questions,
  onOpenChat,
}) => {
  const optionAlphabet = {
    0: "a",
    1: "b",
    2: "c",
    3: "d",
  };

  const pdfNames = [
    "Chemistry_thermodynamics.pdf",
    "Chemistry_general_chemistry.pdf",
    "Chemical_inorganic_chemistry.pdf",
    "Chemistry_thermodynamics.pdf",
    "Chemistry_general_chemistry.pdf",
    "Chemical_inorganic_chemistry.pdf",
    "Chemistry_thermodynamics.pdf",
    "Chemistry_general_chemistry.pdf",
    "Chemical_inorganic_chemistry.pdf",
    "Chemistry_thermodynamics.pdf",
    "Chemistry_general_chemistry.pdf",
    "Chemical_inorganic_chemistry.pdf",
    "Chemistry_thermodynamics.pdf",
    "Chemistry_general_chemistry.pdf",
    "Chemical_inorganic_chemistry.pdf",
  ];

  return (
    <div className="px-10 !py-8 !h-full insights-question-container w-full  bg-[#A0A0A010] backdrop-blur-[30px] flex flex-col rounded-[24px] justify-between">
      <div className="poppins font-normal text-[16px] text-[#808080]">
        Question review
      </div>
      <div className="flex items-center justify-start">
        <div className="clash-display font-medium text-[16px] text-[#EAE8E1]">{`Q${currentQuestion.index}`}</div>
        <div className="w-[2px] h-[70%] bg-[#3A3A3A] mx-4" />
        <div className="poppins font-normal text-[14px] text-[#EAE8E1]">
          {currentQuestion.question}
        </div>
      </div>
      <div className="flex items-center">
        {currentQuestion.selected_answer ===
        currentQuestion.options[currentQuestion.correct_answer] ? (
          <div className="flex gap-3  items-center w-[200px]">
            <img className="w-[20px] h-[20px]" src="correct.png" />
            <div className="flex flex-col">
              <div className="text-[#DE5327] text-[14px] poppins font-normal">
                Your answer is correct
              </div>
              <div className="poppins font-normal text-[18px] text-[#EAE8E1]">
                {`(${
                  optionAlphabet[
                    currentQuestion.options.findIndex(
                      (item) => item === currentQuestion.selected_answer
                    )
                  ]
                }) ${currentQuestion.selected_answer}`}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-6">
            <div className="flex gap-3  items-center w-[144px]">
              <img className="w-[20px] h-[20px]" src="wrong.png" />
              <div className="flex flex-col">
                <div className="text-[#DE5327] text-[14px] poppins font-normal">
                  Your answer
                </div>
                <div className="poppins font-normal text-[18px] text-[#EAE8E1]">
                  {`(${
                    optionAlphabet[
                      currentQuestion.options.findIndex(
                        (item) => item === currentQuestion.selected_answer
                      )
                    ]
                  }) ${currentQuestion.selected_answer}`}
                </div>
              </div>
            </div>
            <div className="flex gap-3  items-center w-[144px] ">
              <img className="w-[20px] h-[20px]" src="correct.png" />
              <div className="flex flex-col">
                <div className="text-[#DE5327] text-[14px] poppins font-normal">
                  Correct answer
                </div>
                <div className="poppins font-normal text-[18px] text-[#EAE8E1]">
                  {`(${optionAlphabet[currentQuestion.correct_answer]}) ${
                    currentQuestion.options[currentQuestion.correct_answer]
                  }`}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="w-[1px] h-[48px] bg-[#3A3A3A] mx-4" />
        <div className="flex gap-3  items-center ">
          <img className="w-[20px] h-[20px]" src="time.png" />
          <div className="flex flex-col">
            <div className="text-[#DE5327] text-[14px] poppins font-normal">
              Time spent
            </div>
            <div className="poppins font-normal text-[18px] text-[#EAE8E1]">
              {currentQuestion.time_took}
              <span className="text-[16px] text-[#EAE8E180] pl-1">sec</span>
            </div>
          </div>
        </div>
        <div className="w-[1px] h-[48px] bg-[#3A3A3A] mx-4" />

        <Button
          className="font-medium text-[16px] clash-display text-[#DE5327] gap-2 h-[48px] button-no-outline max-w-[220px]"
          onClick={onOpenChat}
        >
          <img className="h-[25px]" src="ai.png" />
          Explain with AI
          <img src="arrow-right-orange.png" />
        </Button>
      </div>
      <div className="w-full h-[2px] bg-[#3A3A3A]" />
      <div className="flex flex-col gap-3">
        <div className="poppins font-normal text-[16px] text-[#808080] flex gap-2 items-center">
          Reference material
          <img className="small-icon" src="white-ai.png" />
        </div>
        <div className="poppins font-normal text-[14px] text-[#EAE8E1]">
          I suggest you go through this section for enhancing your knowledge in
          this topic...
        </div>
        <div className="bg-[#DE532726] flex justify-between w-[374px] text-[#EAE8E1] p-[12px] rounded-[6px]">
          <div className="flex gap-1">
            <img className="w-[20px] h-[20px]" src="Document.svg" />
            {pdfNames[currentQuestion.index]}
          </div>
          <img className="w-[20px] h-[20px]" src="open-link.png" />
        </div>
      </div>
      <div className="bg-[#2929294D] backdrop-blur-[30px] p-[24px_32px] flex items-center gap-4 justify-start poppins font-light text-[#EAE8E1] text-[14px] rounded-[9px]">
        <img src="ai.png" />
        {testSummary.question_specific_feedback[currentQuestion.index - 1]}
      </div>
      <div className="text-[#EAE8E1] w-full flex flex-col gap-8">
        <div className="w-full h-[2px] bg-[#3A3A3A]" />
        <div>
          <h2 className="clash-display font-medium text-[24px]">Questions</h2>
          <div className="question-number-container w-full">
            {questions.map((item) => (
              <button
                className={`${
                  currentQuestion?.index === item.index &&
                  "bg-[#DE5327] current-question"
                } question-number `}
                key={item.index}
                onClick={() => handleQuestionNumberClick(item)}
              >
                {item.index}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionInsights;
