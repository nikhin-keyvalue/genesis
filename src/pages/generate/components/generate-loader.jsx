const GenerateLoadingScreen = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <div className="container-loader palette-1">
          <div className="blobs">
            <svg viewBox="0 0 1200 1200">
              <g className="blob blob-1">
                <path />
              </g>
              <g className="blob blob-2">
                <path />
              </g>
              <g className="blob blob-3">
                <path />
              </g>
              <g className="blob blob-4">
                <path />
              </g>
              <g className="blob blob-1 alt">
                <path />
              </g>
              <g className="blob blob-2 alt">
                <path />
              </g>
              <g className="blob blob-3 alt">
                <path />
              </g>
              <g className="blob blob-4 alt">
                <path />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <h4 className="mt-2 clash-display text-[40px] z-10">
        {title}
      </h4>
      <p className="mt-5">
        {subtitle}
      </p>
    </div>
  );
};

export default GenerateLoadingScreen;
