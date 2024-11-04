import React, { useState, useEffect } from 'react';

const getCurrentTime = () => {
    const now = new Date();
  
    return [now.getHours(), now.getMinutes(), now.getSeconds()];
};
  
const CurrentTime = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {

            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let seconds = currentTime.getSeconds();

    hours = (hours.toString().length === 2) ? hours : "0" + hours;
    minutes = (minutes.toString().length === 2) ? minutes : "0" + minutes;
    seconds = (seconds.toString().length === 2) ? seconds : "0" + seconds;

    return (
        <div style={{display: "flex", flexDirection: "row"}}>
            <h3>{`${hours}:${minutes}:${seconds}`}</h3>
        </div>
    );
};

export {CurrentTime, getCurrentTime};