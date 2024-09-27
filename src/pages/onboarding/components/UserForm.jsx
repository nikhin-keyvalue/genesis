import "./userForm.css";
import RankInput from "./RankInput";
import Dropdown from "./Dropdown";

const UserForm = ({ handleInputChange }) => {
  const handleRankChange = (e) => {
    handleInputChange(Number(e.target.value), "expectedRank");
  };

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
              Select your proficiency and rank expectation
            </div>
          </div>
        </div>
      </div>
      <div className="form-wrapper text-white w-[45%]">
        <Dropdown
          title="How proficient are you with the syllabus?"
          handleInputChange={(val) => handleInputChange(val, "proficiency")}
        />
        <div className="w-full input-wrapper">
          <h2>Are you enrolled with any coaching institute?</h2>
          <input
            type="text"
            placeholder="Institution"
            onChange={(e) => handleInputChange(e.target.value, "institution")}
          />
        </div>

        <RankInput handleRankChange={handleRankChange} />
      </div>
    </div>
  );
};

export default UserForm;
