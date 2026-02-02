import { useState, useEffect } from 'react';
import { getRemainingTimeUntilMsTimestamp } from '@/Utils/CountdownTimerUtils';


const CountdownTimer = ({ countdownTimestampMs, subject, auth, handleSubmit }) => {
    const [remainingTime, setRemainingTime] = useState({
        seconds: '00',
        minutes: '00',
        hours: '00',
        days: '00'
    });

    if (localStorage.getItem("timestamp"+subject+auth.user.name) != null) {
        var tempCountdown = parseInt(localStorage.getItem("timestamp"+subject+auth.user.name))
    } else {
        var tempCountdown = countdownTimestampMs
    }


    if (localStorage.getItem("timestamp"+subject+auth.user.name) != null) {
        var timestampForLocalPerma = parseInt(localStorage.getItem("timestamp"+subject+auth.user.name))
    } else {
        var timestampForLocalPerma = countdownTimestampMs
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    }, [countdownTimestampMs]);

    function updateRemainingTime(countdown) {        
        if(localStorage.getItem("timestamp"+subject+auth.user.name) == null) {
            setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
            if(                
                getRemainingTimeUntilMsTimestamp(countdown).seconds == 0 && getRemainingTimeUntilMsTimestamp(countdown).minutes == 0 && getRemainingTimeUntilMsTimestamp(countdown).hours == 0 && getRemainingTimeUntilMsTimestamp(countdown).days == 0 
                ) {
                    handleSubmit()
                }
        } else {
            setRemainingTime(getRemainingTimeUntilMsTimestamp(timestampForLocalPerma));
            if(                
                getRemainingTimeUntilMsTimestamp(timestampForLocalPerma).seconds == 0 && getRemainingTimeUntilMsTimestamp(timestampForLocalPerma).minutes == 0 && getRemainingTimeUntilMsTimestamp(timestampForLocalPerma).hours == 0 && getRemainingTimeUntilMsTimestamp(timestampForLocalPerma).days == 0 
                ) {
                    handleSubmit()
                }

        }
        tempCountdown = tempCountdown - 250
        localStorage.setItem("timestamp" + subject + auth.user.name, tempCountdown)
    }

    return (
        <p className='font-semibold'>{remainingTime.hours}:{remainingTime.minutes}:{remainingTime.seconds}</p>

    );
}

export default CountdownTimer;