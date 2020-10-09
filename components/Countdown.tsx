import styled from "styled-components";
import ReactCountdown from "react-countdown";

import { Header, Body } from "./type";

const Countdown = () => {
  return (
    <Wrapper>
      <Row>
        <CountdownContainer>
          <h2>
            Hacking has concluded! Thanks for coming to HackSC{" "}
            {new Date().getFullYear()}
          </h2>
        </CountdownContainer>
      </Row>
    </Wrapper>
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
