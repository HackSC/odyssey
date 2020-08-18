import styled from "styled-components";

import { Header, Body } from "./type";

const DirectoryIntro = () => {
  return (
    <Wrapper>
      <Section>
        <Header>Sponsor API Directory</Header>

        <Body>
          HackSC could not be possible without our sponsors! The following
          sponsors have prepared resources to help you use their technologies or
          learn more about the work they do. Check them out, learn more about
          them, and/or use their tech!
        </Body>
      </Section>
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

const Section = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 16px;
  }
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
    margin-bottom: 12px;
  }

  span {
    font-size: 48px;
    font-weight: bold;
  }
`;

export default DirectoryIntro;
