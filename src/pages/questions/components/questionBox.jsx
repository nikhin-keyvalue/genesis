import { useState } from "react";
import "./questionBox.css";


const QuestionBox = ({ question, handlePrevBtn, handleNextBtn, answer, handleOptionChange, isLastQuestion, isFirstQuestion, percentage }) => {

    const onChange = (e) => {
        handleOptionChange(e.target.value)
    };

    const handleClearClick = () => {
        handleOptionChange('')
    }


    return (
        <div className="question-box">
            <div className="question-header">
                <p>Q1</p>
                <p>20:21 <span>left</span></p>
            </div>
            <p className="question">{question.question}</p>
            <div className="options-list">
                {question.options.map((option, index) => (
                    <div key={index} className="option">
                        <label key={index} className="radio-container">
                            <input
                                type="radio"
                                value={option}
                                checked={answer === option}
                                onChange={onChange}
                            />
                            <span className="custom-radio">
                                <span className={`radio-inner ${answer === option ? 'selected' : ''}`}></span>
                            </span>
                            {option}
                        </label>
                    </div>
                ))}
            </div>
            {/* TODO: disable for last and first question */}
            <div className="buttons">
                <button className="clear" onClick={handleClearClick}>
                    Clear Selection
                </button>
                <div className="prev-next-btns">
                    <button className="prev" onClick={handlePrevBtn} disabled={isFirstQuestion}>
                        <img src="/arrow-left.png" alt="arrow" />
                        <span>Prev</span>
                    </button>
                    <button className="next" onClick={handleNextBtn} disabled={isLastQuestion && percentage !== 100}>
                        <span>{isLastQuestion ? 'Submit' : 'Next'}</span>
                        <img src="/arrow-left.png" alt="next" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionBox;