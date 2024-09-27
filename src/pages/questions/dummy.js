const data  = [
        {
          "question": "A particle is projected with a velocity of 20 m/s at an angle of 30° with the horizontal. What is the maximum height reached by the particle?",
          "options": [
            "5 m",
            "10 m",
            "15 m",
            "20 m"
          ],
          "correct_answer": 2,
          "time": 90,
          "subtopics": [
            "Kinematics"
          ],
          "difficulty": "EASY",
          "explanation": "The maximum height (H) reached by a projectile is given by the formula H = (u^2 * sin^2(θ)) / (2g), where u is the initial velocity, θ is the angle of projection, and g is the acceleration due to gravity (9.8 m/s^2). Here, u = 20 m/s, θ = 30°. Therefore, H = (20^2 * sin^2(30°)) / (2 * 9.8) = (400 * 0.25) / 19.6 = 100 / 19.6 ≈ 5.1 m. Hence, the correct answer is 5 m."
        },
        {
          "question": "A 10 Ω resistor and a 20 Ω resistor are connected in parallel. What is the equivalent resistance of the combination?",
          "options": [
            "6.67 Ω",
            "10 Ω",
            "15 Ω",
            "30 Ω"
          ],
          "correct_answer": 1,
          "time": 60,
          "subtopics": [
            "Current Electricity"
          ],
          "difficulty": "MEDIUM",
          "explanation": "For resistors in parallel, the equivalent resistance (R_eq) is given by 1/R_eq = 1/R1 + 1/R2. Here, R1 = 10 Ω and R2 = 20 Ω. Therefore, 1/R_eq = 1/10 + 1/20 = 2/20 + 1/20 = 3/20. Hence, R_eq = 20/3 ≈ 6.67 Ω."
        },
        {
          "question": "A convex lens has a focal length of 10 cm. An object is placed 15 cm from the lens. What is the position of the image formed?",
          "options": [
            "30 cm on the same side as the object",
            "30 cm on the opposite side of the object",
            "6 cm on the same side as the object",
            "6 cm on the opposite side of the object"
          ],
          "correct_answer": 2,
          "time": 90,
          "subtopics": [
            "Optics"
          ],
          "difficulty": "HARD",
          "explanation": "Using the lens formula 1/f = 1/v - 1/u, where f is the focal length, v is the image distance, and u is the object distance. Here, f = 10 cm and u = -15 cm (object distance is taken as negative). Therefore, 1/10 = 1/v + 1/15. Solving for v, we get 1/v = 1/10 - 1/15 = (3 - 2)/30 = 1/30. Hence, v = 30 cm. Since v is positive, the image is formed on the opposite side of the object."
        },
        {
          "question": "A coil of wire with 200 turns and a cross-sectional area of 0.01 m² is placed in a magnetic field that changes from 0.1 T to 0.5 T in 2 seconds. What is the induced EMF in the coil?",
          "options": [
            "0.4 V",
            "0.8 V",
            "1.2 V",
            "1.6 V"
          ],
          "correct_answer": 2,
          "time": 90,
          "subtopics": [
            "Electromagnetic Induction"
          ],
          "difficulty": "MEDIUM",
          "explanation": "The induced EMF (ε) in a coil is given by Faraday's law of electromagnetic induction: ε = -N * (ΔΦ/Δt), where N is the number of turns, ΔΦ is the change in magnetic flux, and Δt is the time interval. Here, N = 200, ΔΦ = A * ΔB = 0.01 m² * (0.5 T - 0.1 T) = 0.01 * 0.4 = 0.004 Wb, and Δt = 2 s. Therefore, ε = -200 * (0.004 / 2) = -200 * 0.002 = -0.4 V. The magnitude of the induced EMF is 0.4 V."
        },
        {
          "question": "A Carnot engine operates between two reservoirs at temperatures 500 K and 300 K. What is the efficiency of the engine?",
          "options": [
            "0.2",
            "0.4",
            "0.6",
            "0.8"
          ],
          "correct_answer": 2,
          "time": 60,
          "subtopics": [
            "Thermodynamics"
          ],
          "difficulty": "HARD",
          "explanation": "The efficiency (η) of a Carnot engine is given by η = 1 - (T_cold / T_hot), where T_cold is the temperature of the cold reservoir and T_hot is the temperature of the hot reservoir. Here, T_cold = 300 K and T_hot = 500 K. Therefore, η = 1 - (300 / 500) = 1 - 0.6 = 0.4. Hence, the efficiency of the engine is 0.4."
        }
]
    
    export default data;