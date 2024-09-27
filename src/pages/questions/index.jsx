import { useState, useRef, useEffect } from "react";
import QuestionBox from "./components/questionBox";

import "./questions.css";
import ProgressBar from "./components/progressBar";
import data from "./dummy";
import Modal from "./components/Modal";

const Questions = () => {

    const [questions, setQuestions] = useState(data);
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [percentage, setPercentage] = useState(0)
    const [answers, setAnswers] = useState([]);
    const [timeStamp, setTimeStamp] = useState([]);
    const [openModal, setOpenModal] = useState(false)

    const accuracy = useRef({
        totalAccuracy: 0,
        subtopicAccuracy: {
            EASY: 0,
            MEDIUM: 0,
            HARD: 0
        }
    });

    useEffect(() => {
        if (data.length) {
            console.log({ data });
            const mappedList = data.map((item, index) => ({ ...item, index: index + 1 }))
            setQuestions(mappedList);
            setCurrentQuestion(mappedList[0]);
        }
    }, [data])

    let startTime = new Date();

    const getTimeStamp = () => {
        const timeSpent = new Date().getTime() - startTime.getTime();
        const buffCurrent = { ...currentQuestion, time_took: (timeSpent / 1000) };
        const buffQuestions = [...questions];
        buffQuestions[currentQuestion.index - 1] = buffCurrent;
        setQuestions(buffQuestions);
        startTime = new Date();
    }

    const handleNextBtn = () => {
        getTimeStamp()
        updateAccuracy(currentQuestion)
        console.log('handleNext');
        if (currentQuestion.index === questions.length) {
            setOpenModal(true);
        } else setCurrentQuestion(questions[currentQuestion.index]);
    }

    const handlePrevBtn = () => {
        getTimeStamp()
        updateAccuracy(currentQuestion)
        setCurrentQuestion(questions[currentQuestion.index - 2]);
    }

    const handleSetAnswer = (selectedOption) => {
        let updatedQuestion = { ...currentQuestion };

        if (selectedOption) {
            updatedQuestion.isAnswered = true;
        } else {
            updatedQuestion.isAnswered = false;
        }

        updatedQuestion = {
            ...updatedQuestion,
            selected_answer: selectedOption,
            time_took: '',
        }
        const buffList = [...questions];
        buffList[currentQuestion.index - 1] = updatedQuestion;
        setCurrentQuestion(updatedQuestion);
        setQuestions(buffList)
        const newPercentage = (buffList.filter((item) => item.isAnswered).length / buffList.length) * 100;
        setPercentage(newPercentage);
    }

    const handleQuestionNumberClick = (number) => {
        getTimeStamp();
        updateAccuracy(currentQuestion);
        setCurrentQuestion(questions[number.index - 1]);
    }

    const updateAccuracy = (current) => {
        if (current.selected_answer) {
            if (current.selected_answer === current.options[current.correct_answer]) {
                accuracy.current.totalAccuracy += 1;
                accuracy.current.subtopicAccuracy[current.difficulty] += 1;
            } else {
                accuracy.current.totalAccuracy -= 1;
                accuracy.current.subtopicAccuracy[current.difficulty] -= 1;
            }
        }
    }

    const calculateAccuracy = () => {
        const { totalAccuracy, subtopicAccuracy } = accuracy.current;
        let category = {}

        questions.forEach(element => {
            if (category[element.difficulty]) {
                category[element.difficulty] += 1;
            } else {
                category[element.difficulty] = 1;
            }
        });

        let accuracyFin = `${totalAccuracy} / ${questions.length}`;
        let categorySplit = {
            EASY: `${subtopicAccuracy.EASY} / ${category.EASY}`,
            MEDIUM: `${subtopicAccuracy.MEDIUM} / ${category.MEDIUM}`,
            HARD: `${subtopicAccuracy.HARD} / ${category.HARD}`,
        };

        return { accuracyFin, categorySplit }
    }

    const submitAnswers = () => {debugger
        // category wise logic
        const { accuracyFin, categorySplit } = calculateAccuracy();
        console.log({ accuracyFin, categorySplit, questions });
        alert(JSON.stringify({ accuracyFin, categorySplit, questions }));
        setOpenModal(false);
    }

    const handleClose = () => { setOpenModal(false) }

    const getAnsweredCount = () => {
        const answered = questions.filter((item) => item.isAnswered).length;
        return answered;
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
                    answer={currentQuestion?.selected_answer}
                    handleOptionChange={handleSetAnswer}
                    isLastQuestion={currentQuestion?.index === questions.length}
                    isFirstQuestion={currentQuestion?.index === 1}
                    percentage={percentage}
                />
            </div>
            <div className="question-numbers">
                <h2>Questions</h2>
                <div className="question-number-container">
                    {questions.map((item) =>
                        <button
                            className={`question-number ${currentQuestion?.index === item.index && 'current-question'} ${item.isAnswered && 'completed-question'}`}
                            key={item.index}
                            onClick={() => handleQuestionNumberClick(item)}
                        >
                            {item.index}
                        </button>
                    )}
                </div>
            </div>
            {openModal && <Modal handleClose={handleClose} handleSubmit={submitAnswers} total={questions.length} answered={getAnsweredCount()} />}
        </div>
    );
};

export default Questions;