import styled from "styled-components";
import moment from "moment-timezone";
import { useEffect } from "react";

const HackathonEvents = ({ events }) => {
  const currentDate = moment.tz(moment(), "UTC");

  let nextEvent;
  for (let i = 0; i < events.length; i++) {
    nextEvent = events[i].id;
    if (
      moment(events[i].endsAt) > currentDate ||
      moment(events[i].startsAt) > currentDate
    ) {
      break;
    }
  }

  useEffect(() => {
    if (nextEvent) {
      document.getElementById("eventList").scrollTop = document.getElementById(
        nextEvent
      ).offsetTop;
    }
  }, []);

  return (
    <div>
      <h3>Upcoming Events</h3>
      <h4>All in Pacific Standard Time</h4>
      <EventList id="eventList">
        {events.map((e) => (
          <Event
            id={e.id}
            style={
              moment(e.endsAt) > currentDate
                ? { color: "#FFFFFF" }
<<<<<<< HEAD
                : { color: "#7E7E7E" }
=======
                : { color: "#FFFFFF" }
>>>>>>> 708f9ed8be2242bf48c584c84664c4214bea90f6
            }
          >
            <h3
              style={
                moment(e.endsAt) > currentDate
                  ? { color: "#FF8379" }
<<<<<<< HEAD
                  : { color: "#7E7E7E" }
=======
                  : { color: "#FF8379" }
>>>>>>> 708f9ed8be2242bf48c584c84664c4214bea90f6
              }
            >
              {e.name}
            </h3>
            <p>{e.description}</p>
            <p>{moment.utc(e.startsAt).format("MMM D, h:mm a")}</p>
            <p>{moment.utc(e.endsAt).format("MMM D, h:mm a")}</p>
            {e.zoomUrl ? <a href={e.zoomUrl}>Join Zoom Meeting</a> : null}
          </Event>
        ))}
      </EventList>
    </div>
  );
};

const EventList = styled.div`
  border-radius: 4px;
  margin-top: 8px;
  max-height: 400px;
  overflow: scroll;
  position: relative;
`;

const Event = styled.div`
  margin-top: 24px;

  h4,
  h3 {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.peach};
    padding-bottom: 4px;
  }
`;

export default HackathonEvents;
