import styled from "styled-components";
import ReactCountdown from "react-countdown";

import { Header, Body } from "./type";

const Countdown = () => {
  // * Hackathon start date: "2/19/2021"
  // * Hackathon end date: "2/21/2021"
  let hackathon_end_date = new Date("2/21/2021").getTime();
  let todays_date = new Date().getTime();

  let minutes_between = (hackathon_end_date - todays_date) / (60 * 1000); // * Divide by num seconds in a minute * number milliseconds in a second
  let hours_between = minutes_between / 60;

  return (
    <>
      {hours_between < 4 ? (
        <Wrapper>
          <Row>
            <CountdownContainer>
              {minutes_between === 0 || minutes_between < 0 ? (
                <h2>
                  Hacking has concluded! Thanks for coming to HackSC{" "}
                  {new Date().getFullYear()}
                </h2>
              ) : (
                <h2>
                  There are {hours_between}:{minutes_between} left, be sure to
                  start wrapping up your projects!
                </h2>
              )}
            </CountdownContainer>
          </Row>
        </Wrapper>
      ) : (
        <h1></h1>
      )}
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 93.75%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  ${({ theme }) => theme.media.tablet`
    flex-direction: column;
  `}
`;

const CountdownContainer = styled.div`
  background: #ff8379;
  color: #ffffff;
  width: 100%;
  padding: 24px 18px;
  border-radius: 6px;
  text-align: center;
  box-sizing: border-box;

  h2 {
    font-size: 18px;
  }

  span {
    font-size: 48px;
    font-weight: bold;
  }
`;

export default Countdown;
