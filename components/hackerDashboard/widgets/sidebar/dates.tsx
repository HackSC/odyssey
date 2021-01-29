import styled from "styled-components";

const HackathonDates = () => {
  return (
    <div>
      <h3>Upcoming Dates</h3>

      <Dates>
        <DateText>
          <h3>Applications Open</h3>
          <p>December 1st, 2020</p>
        </DateText>

        <DateText>
          <h3>Applications Close</h3>
          <p>December 21st, 2020</p>
        </DateText>

        <DateText>
          <h3>HackSC 2021</h3>
          <p>February 19 - 21, 2021</p>
        </DateText>
      </Dates>
    </div>
  );
};

const Dates = styled.div`
  border-radius: 4px;
`;

const DateText = styled.div`
  margin-top: 24px;

  :first-child {
    margin-top: 0;
  }

  h3 {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.peach};
    padding-bottom: 4px;
  }
`;

export default HackathonDates;
