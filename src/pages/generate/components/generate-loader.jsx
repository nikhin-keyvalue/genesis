const GenerateLoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="loader"></div>
      <h4 className="mt-2 clash-display text-[40px]">Generating your exam...</h4>
      <p className="mt-5">
        Make sure you are at the top of your game for this!
      </p>
    </div>
  );
};

export default GenerateLoadingScreen;
