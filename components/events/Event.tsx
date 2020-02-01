import React, { useEffect } from "react";
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
};

const Event = (props: Props) => {
  const { event, isActive, formattedStart, formattedEnd, eventsRef } = props;

  useEffect(() => {
    if (eventsRef.current) {
      eventsRef.current.scrollTo(300);
    }
  }, []);

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
    <EventBox isActive={isActive}>
      <h3>{event.name}</h3>

      <p>{event.description}</p>

      {renderTimesRight()}
    </EventBox>
  );
};

type EventBoxProps = {
  isActive?: boolean;
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

  ${({ isActive, theme }) =>
    isActive &&
    `
        border-width: 2px;
        border-color: ${theme.colors.peach};
      `}
  }
`;

const TimesBox = styled.div`
  padding: 16px 12px 16px;
  border: 1px solid #cfcfcf;
  margin-top: 16px;
  border-radius: 4px;
`;

export default Event;
