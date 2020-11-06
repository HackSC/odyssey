import styled from "styled-components";

import Button from "./Button";

const LinkToSchedule = () => {
  return (
    <Wrapper>
      <Half
        style={{
          textAlign: "center",
        }}
      >
        <h2>Link to Schedule</h2>
        <StyledButton as="a" href="https://hacksc.com/schedule" target="_blank">
          Schedule
        </StyledButton>
      </Half>

      <Half
        style={{
          textAlign: "center",
        }}
      >
        <h2>See Battle Pass Progress</h2>
        <StyledButton as="a" href="https://odyssey.hacksc.com" target="_blank">
          Odyssey
        </StyledButton>
      </Half>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 93.75%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  flex-direction: row;
  padding: 48px 0 24px;
  justify-content: space-between;
`;

const Half = styled.div`
  flex-basis: 48%;

  h2 {
    font-weight: 600;
    margin-bottom: 12px;
  }
`;

const StyledButton = styled(Button)`
  display: block;
`;

export default LinkToSchedule;
