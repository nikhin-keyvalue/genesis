import PropTypes from "prop-types";
import "./questionBox.css";
import Timer from "./Timer";

const QuestionBox = ({
  question,
  handlePrevBtn,
  handleNextBtn,
  answer,
  handleOptionChange,
  isLastQuestion,
  isFirstQuestion,
  percentage,
}) => {
  const onChange = (e) => {
    handleOptionChange(e.target.value);
  };

  const handleClearClick = () => {
    handleOptionChange("");
  };

  return (
    <div className="question-box">
      <div className="question-header">
        <p>{`Q${question.index}`}</p>
        <Timer initialTime={240}/>
      </div>
      <p className="question">{question.question}</p>
      <div className="options-list">
        {question.options?.map((option, index) => (
          <div key={index} className="option">
            <label key={index} className="radio-container">
              <input
                type="radio"
                value={option}
                checked={answer === option}
                onChange={onChange}
              />
              <span className="custom-radio">
                <span
                  className={`radio-inner ${
                    answer === option ? "selected" : ""
                  }`}
                ></span>
              </span>
              {option}
            </label>
          </div>
        ))}
      </div>
      <div className="buttons">
        <button className="clear" onClick={handleClearClick}>
          Clear Selection
        </button>
        <div className="prev-next-btns">
          <button
            className="prev"
            onClick={handlePrevBtn}
            disabled={isFirstQuestion}
          >
            <img src="/arrow-left.png" alt="arrow" />
            <span>Prev</span>
          </button>
          <button
            className="next"
            onClick={handleNextBtn}
          >
            <span>{isLastQuestion ? "Submit" : "Next"}</span>
            <img src="/arrow-left.png" alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};
QuestionBox.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  handlePrevBtn: PropTypes.func.isRequired,
  handleNextBtn: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  isLastQuestion: PropTypes.bool.isRequired,
  isFirstQuestion: PropTypes.bool.isRequired,
  percentage: PropTypes.number.isRequired,
};

export default QuestionBox;
