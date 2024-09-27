import TextCarousel from "./TextCarousel";

const Features = () => {

  return (
    <div className="grid grid-cols-2 gap-44 h-full w-full items-center  p-10 justify-between pb-2">
      <div className="h-full flex flex-col justify-between">
        <div className="flex tracking-[0.8em] p-8 gap-6 text-[#DE5327] text-[16px] font-normal">
          <div >WHAT</div>
          <div>MARS</div>
          <div>OFFERS</div>
        </div>
        <div className="h-full flex justify-center items-center">
        <TextCarousel />
        </div>
      </div>
      <div className="relative h-[451px] w-[675px] bg-[#403B38] rounded-lg bg-opacity-10">
       <img src="features.png" className="absolute inset-0 object-cover w-full h-full"/>
      </div>
    </div>
  );
};

export default Features;
