import PropTypes from 'prop-types';
import { Button, IconButton } from "../../../components/button";

const GenerateHome = ({ onClick }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[40px] font-medium clash-display ">
        Generate your question paper.
      </div>
      <div className="text-[20px] font-light mt-5">
        Mars offers personalised tutoring based on a calculated
        <br />
        assessment of your strong and weak points
      </div>

      <div className="bg-black rounded-[20px] p-5 mt-[50px] border border-[#EAE8E1] w-[40vw] h-[180px] ">
        <textarea
          placeholder="Type in your question paper type, time and topics you want to go through....."
          className="h-[calc(100%-57px)] mb-[5px] p-0 resize-none overflow-auto w-full flex-1 bg-transparent pb-1.5 text-base outline-none ring-0 placeholder:[#EAE8E1]"
        />
        <div className="h-[48px] flex justify-between">
          <IconButton icon="/Attach.svg" size={48} />

          <Button onClick={onClick} className="!w-[190px]">
            <p className="font-medium text-xl">Generate</p>
            <img src="Generate.svg" alt="Generate" className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="font-medium flex items-center mt-[64px]">
        Sample prompts
        <IconButton icon="/Arrows.svg" size={32} className="ml-4" />
      </div>

      <div className="flex items-center gap-4 !text-gray-200 mt-[14px] text-base w-[70vw]">
        <div className=" border text-left border-[#EAE8E1] text-[#EAE8E1] w-1/3 rounded-[8px] p-4">
          Make me a mock test for physics to prepare for JEE Mains. Time limit
          is 30 min with 30 questions
        </div>
        <div className=" border text-left border-[#EAE8E1] text-[#EAE8E1] w-1/3 rounded-[8px] p-4">
          Make me a mock test for physics to prepare for JEE Mains. Time limit
          is 30 min with 30 questions
        </div>
        <div className=" border text-left border-[#EAE8E1] text-[#EAE8E1] w-1/3 rounded-[8px] p-4">
          Make me a mock test for physics to prepare for JEE Mains. Time limit
          is 30 min with 30 questions
        </div>
      </div>
    </div>
  );
};

GenerateHome.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default GenerateHome;
