import { useState } from "react";
import TextCarousel from "./TextCarousel";

const Features = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featureImageSources = [
    "features.png",
    "feature2.png",
    "features.png",
    "feature2.png",
  ];
  return (
    <div className="flex justify-between h-full w-full items-center  p-10 justify-between pb-2">
      <div className="h-full w-[40%] flex flex-col justify-between">
        <div className="flex tracking-[0.8em] p-8 gap-6 text-[#DE5327] text-[16px] font-normal">
          <div>WHAT</div>
          <div>MARS</div>
          <div>OFFERS</div>
        </div>
        <div
          className="h-full flex justify-center items-center"
          style={{ marginTop: "-40px" }}
        >
          <TextCarousel
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
          />
        </div>
      </div>
      <div className="relative h-[451px] w-[675px] bg-[#403B38] rounded-lg bg-opacity-10">
        <img
          src={featureImageSources[currentSlide]}
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Features;
