import { useState, useEffect } from "react";
import styled from "styled-components";
import hackathonConstants from "../../../../lib/hackathonConstants";

const HackathonCountdown = () => {
  const [countdownDate, setCountdownDate] = useState(
    new Date(hackathonConstants.hackathonDate).getTime()
  );
  const [state, setState] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const tick = setInterval(() => updateCountdown(), 1000);
    return () => clearInterval(tick);
  }, []);

  const updateCountdown = () => {
    if (countdownDate) {
      // Get the current time
      const currentTime = new Date().getTime();

      // Get the time remaining until the countdown date
      const distanceToDate = countdownDate - currentTime;

      // Calculate days, hours, minutes and seconds remaining
      let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      hours = parseInt(("0" + hours).slice(-2));
      minutes = parseInt(("0" + minutes).slice(-2));
      seconds = parseInt(("0" + seconds).slice(-2));

      // Set the state to each new time
      setState({ days: days, hours: hours, minutes, seconds });
    }
  };

  return (
    <div>
      <h3>Hacking starts in</h3>
      <CountdownWrapper>
        <TimeSection>
          <Time>{state.days || "0"}</Time>
          <Small>Days</Small>
        </TimeSection>
        <TimeSection>
          <Time>:</Time>
        </TimeSection>
        <TimeSection>
          <Time>{state.hours || "00"}</Time>
          <Small>Hours</Small>
        </TimeSection>
        <TimeSection>
          <Time className="time">:</Time>
        </TimeSection>
        <TimeSection>
          <Time>{state.minutes || "00"}</Time>
          <Small>Minutes</Small>
        </TimeSection>
        <TimeSection>
          <Time>:</Time>
        </TimeSection>
        <TimeSection>
          <Time>{state.seconds || "00"}</Time>
          <Small>Seconds</Small>
        </TimeSection>
      </CountdownWrapper>
    </div>
  );
};

const CountdownWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const TimeSection = styled.div`
  padding: 0px 2px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Time = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const Small = styled.small`
  font-size: 12px;
`;

export default HackathonCountdown;
