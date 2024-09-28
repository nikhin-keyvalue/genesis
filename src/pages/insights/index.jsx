/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import Chat from "../../components/chat";

export default function Sample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <button onClick={() => setOpen(!open)}>click</button>
      <div
        className={`w-[500px] transition-all duration-500 ease-in-out  shadow-lg fixed top-0 ${
          open ? "right-0" : "right-[-500px]"
        } `}
      >
        <Chat
          context={{
            question:
              "A particle is projected with a velocity of 20 m/s at an angle of 30° with the horizontal. What is the maximum height reached by the particle?",
            options: ["5 m", "10 m", "15 m", "20 m"],
            correct_answer: 2,
            time: 90,
            subtopics: ["Kinematics"],
            difficulty: "EASY",
            explanation:
              "The maximum height (H) reached by a projectile is given by the formula H = (u^2 * sin^2(θ)) / (2g), where u is the initial velocity, θ is the angle of projection, and g is the acceleration due to gravity (9.8 m/s^2). Here, u = 20 m/s, θ = 30°. Therefore, H = (20^2 * sin^2(30°)) / (2 * 9.8) = (400 * 0.25) / 19.6 = 100 / 19.6 ≈ 5.1 m. Hence, the correct answer is 5 m.",
            index: 1,
            isAnswered: true,
            selected_answer: "10 m",
            time_took: 1.013,
          }}
          onCloseClick={() => setOpen(false)}
        />
      </div>
    </div>
  );
}
