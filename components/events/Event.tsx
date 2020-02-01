import moment from "moment";
import styled from "styled-components";

const Event = ({ event }) => {
  const renderTimesRight = () => {
    const formattedStart = moment(event.startsAt).format("dddd hh:mm a");
    const formattedEnd = moment(event.endsAt).format("dddd hh:mm a");
    return (
      <span>
        <p>{formattedStart}</p>
        <p>{formattedEnd}</p>`
      </span>
    );
  };
  return (
    <EventBox>
      <h3>{event.name}</h3>

      <p>{event.description}</p>

      {renderTimesRight()}
    </EventBox>
  );
};

const EventBox = styled.div`
  border: 1px solid #cfcfcf;
  padding: 18px;
  border-radius: 4px;
  margin-bottom: 1rem;
  background: #ffffff;

  &:last-child {
    margin-bottom: 0;
  }

  p {
    margin: 0;
  }
`;

export default Event;
