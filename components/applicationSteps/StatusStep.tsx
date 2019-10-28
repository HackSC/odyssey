import * as React from "react";

import styled from "styled-components";

import { Flex, Column } from "../../styles";

type Props = {
  user: User;
};

const StatusStep: React.FunctionComponent<Props> = props => {
  const { user } = props;

  return (
    <Flex>
      <StatusColumn>
        <h1>Hello there!</h1>

        <Status>
          <StatusHeader>Current Status</StatusHeader>

          <StatusLabel>Verified</StatusLabel>
        </Status>

        <h3>Next Steps</h3>

        <p>
          1. Set up your profile - Set up your hacker profile so we can learn
          more about you.
        </p>

        <p>
          2. Fill out an application - Answer a few questions to show why you
          want to be at HackSC 2020!
        </p>

        <p>
          3. View results - Come back on December 1st, 2019 to see your results.
        </p>
      </StatusColumn>

      <DatesColumn>
        <h2>Major Dates</h2>

        <h3>Applications Open</h3>
        <p>November 1st, 2019</p>

        <h3>Applications Close</h3>
        <p>December 1st, 2019</p>

        <h3>HackSC 2020</h3>
        <p>January 31, 2019</p>
      </DatesColumn>
    </Flex>
  );
};

const Status = styled.div`
  margin: 12px 0;
  border-radius: 8px;
`;

const StatusHeader = styled.h2`
  padding: 0;
  font-size: 18px;
  font-weight: 300;
`;

const StatusLabel = styled.h3`
  padding: 12px 0 0;
  text-transform: uppercase;
`;

const StatusColumn = styled(Column)`
  flex: 1;
`;

const DatesColumn = styled(Column)`
  flex-basis: 40%;
  padding-left: 32px;
`;

export default StatusStep;
