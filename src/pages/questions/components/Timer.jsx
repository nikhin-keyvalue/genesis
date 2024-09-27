import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours} : ${minutes} : ${secs}`;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#EAE8E1', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src="./timer.png" alt="timer" />
            </div>
            <span style={{
                width: '160px',
                fontSize: '30px',
                fontWeight: 500,
                color: '#EAE8E1',
                fontFamily: 'Poppins, sans-serif',
                marginLeft: '19px',
            }}>
                {formatTime(timeLeft)}
            </span>
            <span style={{ fontSize: '24px', marginLeft: '10px', color: '#5D5C5A' }}>
                left
            </span>
        </div >
    );
};

export default Timer;
