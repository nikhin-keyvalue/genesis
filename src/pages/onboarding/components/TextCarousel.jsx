import { useState, useEffect } from "react";

const features = [{
 title: "1 Ace your toughest exam with ease!",
 subTitle: "Mars offers personalised tutoring based on a calculated assessment of your strong and weak points"},
 {
    title: "2 Ace your toughest exam with ease!",
    subTitle: "Mars offers personalised tutoring based on a calculated assessment of your strong and weak points"},
    {
        title: "3 Ace your toughest exam with ease!",
        subTitle: "Mars offers personalised tutoring based on a calculated assessment of your strong and weak points"},
        {
            title: "4 Ace your toughest exam with ease!",
            subTitle: "Mars offers personalised tutoring based on a calculated assessment of your strong and weak points"},
];

const TextCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="relative w-full text-center p-8">
        <div className="flex-col">
            <div className="text-[40px] font-medium class-display text-white text-left">{features[currentSlide].title}</div>
            <div className="text-[20px] font-medium poppins text-white text-left">{features[currentSlide].subTitle}</div>
        </div>
      <div className="flex justify-left items-center gap-2 mt-4">
        <div className="text-sm w-[40px] bg-[rgba(234,232,225,0.5)] rounded-lg text-white font-normal">{`${currentSlide + 1}/${features.length}`}</div>

        {features.map((_, index) => (
          <div
            key={index}
            className={`h-4 w-4 rounded-full ${
              index === currentSlide ? "bg-[#DE5327]" : "bg-none border border-[rgba(234, 232, 225, 0.5)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TextCarousel;
