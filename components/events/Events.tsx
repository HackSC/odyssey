import { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";

import moment from "moment";

import Event from "./Event";

import { Button } from "../../styles";

type Props = {
  events: any;
};

const Events = ({ events }: Props) => {
  const eventsRef = useRef(null);

  const isEventActive = event => {
    const start = moment(event.startsAt).add(8, "hour");
    const now = moment(new Date());
    const end = moment(event.endsAt).add(8, "hour");

    return start.valueOf() < now.valueOf() && now.valueOf() < end.valueOf();
  };

  const isEventOver = event => {
    const now = moment(new Date());
    const end = moment(event.endsAt).add(8, "hour");

    return now.valueOf() > end.valueOf();
  };

  const generateSchedule = useMemo(() => {
    if (!events) {
      return <p>No events were found</p>;
    }

    const sortByStart = (a, b) =>
      new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime();

    const eventsSortedByStart = events.sort(sortByStart);

    let firstActiveEventIndex = 0;
    for (let i = 0; i < events.length; i++) {
      if (isEventActive(events[i])) {
        firstActiveEventIndex = i;
        break;
      }
    }

    return eventsSortedByStart.map((event, index) => {
      const isActive = isEventActive(event);
      const isOver = isEventOver(event);
      const formattedStart = moment(event.startsAt)
        .add(8, "hour")
        .format("dddd hh:mm a");
      const formattedEnd = moment(event.endsAt)
        .add(8, "hour")
        .format("dddd hh:mm a");

      return (
        <Event
          event={event}
          isActive={isActive}
          isOver={isOver}
          formattedStart={formattedStart}
          formattedEnd={formattedEnd}
          key={event.id}
          isFirst={index === firstActiveEventIndex}
          eventsRef={eventsRef}
        />
      );
    });
  }, [events]);

  return events ? (
    <Container ref={eventsRef}>
      <h2>Schedule</h2>
      <EventsContainer>{generateSchedule}</EventsContainer>

      <DocLink href="https://hacksc.com/schedule" target="_blank" as="a">
        Click for Document View
      </DocLink>
    </Container>
  ) : (
    <p>Loading schedule...</p>
  );
};

const Container = styled.div`
  flex-direction: column;
  width: 100%;
`;

const EventsContainer = styled.div`
  width: 100%;
  height: 500px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  padding: 32px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

const DocLink = styled(Button)`
  margin-top: 1rem;
  display: block;
`;

export default Events;
