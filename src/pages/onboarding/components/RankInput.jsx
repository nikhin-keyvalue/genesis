import { useState } from "react";

export default function RankInput({ handleRankChange }) {
  const [rank, setRank] = useState(600);

  const handleChange = (e) => {
    setRank(Number(e.target.value));
    handleRankChange(Number(e));
  };

  return (
    <div className="rank-input">
      <h2 style={{ marginBottom: "14px" }}>
        What rank are you aspiring to achieve?
      </h2>
      <div
        className="relative"
        style={{
          height: "40px",
          padding: "3.5px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="range"
          min="1"
          max="10000"
          value={rank}
          onChange={handleChange}
          className="w-full bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="rank-text-box">{rank}</div>
      </div>
    </div>
  );
}
