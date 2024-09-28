import { useEffect, useState } from "react";
import Features from "./components/Features";
import { Button } from "../../components/button";
import ExamSelection from "./components/ExamSelection";
import "./styles.css";
import UserForm from "./components/UserForm";
import StartLearning from "./components/StartLearning";
import { useCreateUserMutation } from "../../api";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  const [createUser, { data, isSuccess, isLoading }] = useCreateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/generate-test");
      localStorage.setItem("userDetails", JSON.stringify(data));
    }
  }, [isSuccess]);

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "Amith Kumar",
    proficiency: "NOVICE",
    institution: "",
    expectedRank: 600,
    exam: "",
  });

  const handleInputChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e,
    });
  };

  const goToNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const goToPrevStep = () => {
    setStep((prev) => prev - 1);
  };

  const onGetStartedClick = () => {
    if (!isLoading)
      createUser({
        phone: localStorage.getItem("phoneNumber"),
        ...formData,
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        padding: "32px 68px",
      }}
    >
      <div className="poppins text-[white] text-[38px] text-left font-medium">
        Mars<span className="text-[#DE5327]">.</span>
      </div>
      <div className="custom-border m-[32px_100px_120px_100px] h-full flex flex-col">
        <div className="h-full">
          {step === 1 && <Features />}
          {step === 2 && (
            <ExamSelection handleInputChange={handleInputChange} />
          )}
          {step === 3 && <UserForm handleInputChange={handleInputChange} />}
          {step === 4 && <StartLearning />}
        </div>
        <div className="flex p-[0px_36px_32px_36px] justify-between h-[140px] items-center">
          <div className="w-[82px]">
            {step !== 1 && (
              <Button
                className="button-no-outline gap-2 text-[white] poppins h-[48px] items-center"
                onClick={goToPrevStep}
              >
                <img src="back.png"></img>
                <div>Back</div>
              </Button>
            )}
          </div>
          <div className={`${step === 4 ? "w-[210px]" : "w-[140px]"}`}>
            {step !== 4 ? (
              <Button
                className={`flex gap-2 button-primary poppins h-[48px] items-center ${
                  step === 2 && formData.exam === "" ? "cursor-not-allowed" : ""
                }`}
                onClick={
                  step === 2 && formData.exam === "" ? () => {} : goToNextStep
                }
              >
                <div>Next</div>
                <img src="arrow-right.png"></img>
              </Button>
            ) : (
              <Button
                className="flex gap-2 button-primary poppins h-[48px] items-center"
                onClick={onGetStartedClick}
              >
                <div>Get started</div>
                <img src="arrow-right.png"></img>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
