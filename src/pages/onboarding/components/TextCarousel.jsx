import { useEffect } from "react";

const features = [
  {
    title: "Ace your toughest exam with ease!",
    subTitle:
      "Mars offers personalised tutoring based on a calculated assessment of your strong and weak points",
  },
  {
    title: "Achieve your targets easily",
    subTitle:
      "With our personalised feedback and mentoring features, you can achieve the goals in a short time",
  },
  {
    title: "Ace your toughest exam with ease!",
    subTitle:
      "Mars offers personalised tutoring based on a calculated assessment of your strong and weak points",
  },
  {
    title: "Achieve your targets easily",
    subTitle:
      "With our personalised feedback and mentoring features, you can achieve the goals in a short time",
  },
];

const TextCarousel = ({ currentSlide, setCurrentSlide }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative w-full h-full text-center p-8"
      style={{ marginTop: "-200px" }}
    >
      <div className="flex-col h-full flex justify-end ">
        <div className="text-[40px] font-medium clash-display text-white text-left">
          {features[currentSlide].title}
        </div>
        <div className="text-[20px] font-light poppins text-white text-left">
          {features[currentSlide].subTitle}
        </div>
      </div>
      <div className="flex justify-left items-center gap-2 mt-4">
        {features.map((_, index) =>
          index === currentSlide ? (
            <div
              key={index}
              className="text-sm w-[40px] bg-[rgba(234,232,225,0.5)] rounded-lg text-white font-normal"
            >{`${currentSlide + 1}/${features.length}`}</div>
          ) : (
            <div
              key={index}
              className={`h-4 w-4 rounded-full ${
                index === currentSlide
                  ? "bg-[#DE5327]"
                  : "bg-none border border-[rgba(234, 232, 225, 0.5)]"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TextCarousel;
