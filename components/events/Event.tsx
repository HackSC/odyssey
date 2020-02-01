import React, { useEffect, useRef } from "react";
import moment from "moment";
import styled from "styled-components";

import { Flex, Column } from "../../styles";

type Props = {
  event: any;
  isActive?: boolean;
  formattedStart: string;
  formattedEnd: string;
  isFirst: boolean;
  eventsRef: any;
  isOver: boolean;
};

const Event = (props: Props) => {
  const {
    event,
    isActive,
    formattedStart,
    formattedEnd,
    eventsRef,
    isFirst,
    isOver
  } = props;

  const currEventRef = useRef(null);

  useEffect(() => {
    if (eventsRef.current && currEventRef.current) {
      if (isFirst) {
        currEventRef.current.scrollIntoView(-30);
      }
    }
  }, [currEventRef]);

  const renderTimesRight = () => {
    return (
      <TimesBox>
        <Flex direction="row" tabletVertical justify="space-between">
          <Column flexBasis={48}>
            <p>
              <b>Start:</b> {formattedStart}
            </p>
          </Column>

          <Column flexBasis={48}>
            <p>
              <b>End:</b> {formattedEnd}
            </p>
          </Column>
        </Flex>
      </TimesBox>
    );
  };
  return (
    <EventBox isActive={isActive} isOver={isOver} ref={currEventRef}>
      <h3>
        {event.name} {isActive && <Live>Live</Live>}
      </h3>

      <p>{event.description}</p>

      {renderTimesRight()}
    </EventBox>
  );
};

type EventBoxProps = {
  isActive?: boolean;
  isOver?: boolean;
};

const EventBox = styled.div<EventBoxProps>`
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

  h3 {
    vertical-align: middle;
    line-height: 30px;
  }

  ${({ isActive, theme }) =>
    isActive &&
    `
        border-width: 2px;
        border-color: ${theme.colors.peach};
      `}
  }

  ${({ isOver }) =>
    isOver &&
    `
        opacity: 0.4;
      `}
  }
`;

const TimesBox = styled.div`
  padding: 16px 12px 16px;
  border: 1px solid #cfcfcf;
  margin-top: 16px;
  border-radius: 4px;
`;

const Live = styled.span`
  padding: 8px 10px;
  font-size: 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.peach};
  color: white;
`;

export default Event;
