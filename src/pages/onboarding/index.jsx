import { useState } from "react";
import Features from "./components/Features";
import { Button } from "../../components/button";
import ExamSelection from "./components/ExamSelection";
import './styles.css'
import UserForm from "./components/userForm";

const Onboarding = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    proficiency: 'Novice',
    institution: '',
    rank: 600
  });

  const handleInputChange = (e, name) => {
    setFormData({
      ...formData,
      [name]: e.target.value,
    });
  };

  const goToNextStep = () => {
    setStep(prev => prev + 1)
  }

  const goToPrevStep = () => {
    setStep(prev => prev - 1)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%', padding: '32px 68px' }}>
      <div className="poppins text-[white] text-[38px] text-left font-medium">
        Mars<span className="text-[#DE5327]">.</span>
      </div>
      <div className="custom-border m-[32px_100px_120px_100px] h-full flex flex-col">
        <div className="h-full">
          {step === 1 && <Features />}
          {step === 2 && <ExamSelection />}
          {step === 3 && <UserForm handleInputChange={handleInputChange} />}
        </div>
        <div className="flex p-[0px_36px_32px_36px] justify-between h-[140px] items-center">
          <div className="w-[82px]">
            {step !== 1 &&
              <Button className='button-no-outline gap-2 text-[white] poppins h-3 items-center' onClick={goToPrevStep}>
                <img src="back.png"></img>
                <div>Back</div>
              </Button>}
          </div>
          <div className={`${step === 3 ? 'w-[210px]' : 'w-[140px]'}`}>
            {step !== 4 ?
              <Button className='flex gap-2 button-primary poppins h-3 items-center' onClick={goToNextStep}>
                <div>Next</div>
                <img src="arrow-right.png"></img>
              </Button> :
              <Button className='flex gap-2 button-primary poppins h-3 items-center' onClick={goToNextStep}>
                <div>Get started</div>
                <img src="arrow-right.png"></img>
              </Button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
