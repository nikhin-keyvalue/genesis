import { useState } from "react";
import QuestionBox from "./components/questionBox";

import "./questions.css";
import ProgressBar from "./components/progressBar";

const questionsList = [{
    index: 1,
    question: 'Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
},
{
    index: 2,
    question: '2.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
},
{
    index: 3,
    question: '3.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
},
{
    index: 4,
    question: '3.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
},
{
    index: 5,
    question: '3.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
},
{
    index: 6,
    question: '3.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
},
{
    index: 7,
    question: '3.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
}, {
    index: 8,
    question: '3.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
},
{
    index: 9,
    question: '3.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
}, {
    index: 10,
    question: '3.Naranathu Hill, 100 meters tall, posed a challenge to Naranathu Pranthan as he rolled a 100 kg stone uphill with a 500N force. What is the slanting height of the hill as the rock moves steadily upward?',
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    isAnswered: false,
    isCurrent: false,
}];

const Questions = () => {

    const [questions, setQuestions] = useState(questionsList);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [percentage, setPercentage] = useState(0)
    const [answers, setAnswers] = useState([]);
    const [timeStamp, setTimeStamp] = useState([]);

    let startTime = new Date();

    const handleNextBtn = () => {
        const timeSpent = new Date() - startTime;
        const buffTimeStamp = [...timeStamp];
        buffTimeStamp[currentQuestion.index - 1] = timeSpent;
        setTimeStamp(buffTimeStamp);
        setCurrentQuestion(questions[currentQuestion.index]);
        startTime = new Date();
    }

    const handlePrevBtn = () => setCurrentQuestion(questions[currentQuestion.index - 2]);

    const handleSetAnswer = (selectedOption) => {
        const updatedQuestion = { ...currentQuestion };
        if (selectedOption) {
            updatedQuestion.isAnswered = true;
        } else {
            updatedQuestion.isAnswered = false;
        }
        const buffList = [...questions];
        const buffAnswers = [...answers];
        buffList[currentQuestion.index - 1] = updatedQuestion;
        buffAnswers[currentQuestion.index - 1] = selectedOption;
        setAnswers(buffAnswers);
        setCurrentQuestion(updatedQuestion);
        setQuestions(buffList)
        const newPercentage = (buffList.filter((item) => item.isAnswered).length / buffList.length) * 100;
        setPercentage(newPercentage);
    }

    return (
        <div className="question-container">
            <div className="progressbar-question-container">
                <div className="progressbar-container">
                    <ProgressBar percentage={percentage} />
                </div>
                <QuestionBox
                    question={currentQuestion}
                    handleNextBtn={handleNextBtn}
                    handlePrevBtn={handlePrevBtn}
                    answer={answers[currentQuestion.index - 1]}
                    handleOptionChange={handleSetAnswer}
                    isLastQuestion={currentQuestion.index === questions.length}
                    isFirstQuestion={currentQuestion.index === 1}
                    percentage={percentage}
                />
            </div>
            <div className="question-numbers">
                <h2>Questions</h2>
                <div className="question-number-container">
                    {questions.map((item) =>
                        <button
                            className={`question-number ${currentQuestion.index === item.index && 'current-question'} ${item.isAnswered && 'completed-question'}`}
                            key={item.index}
                            onClick={() => setCurrentQuestion(item)}
                        >
                            {item.index}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Questions;