import * as React from "react";

import styled from "styled-components";

import { Flex } from "../../styles";

import getProfileStage from "../../lib/getProfileStage";

type Props = {
  profile: Profile;
};

const ResultStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;
  const stage = getProfileStage(profile);

  if (stage < 3) {
    return (
      <Flex direction="column">
        <FormSection>
          <h1>Uh oh!</h1>

          <p>
            Looks like you haven't finished the application process... please
            make sure you have set-up a hacker profile and filled out our
            application. You must submit an application by November 22, 2019, to
            be considered for HackSC 2020.
          </p>
        </FormSection>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <FormSection>
        <h1>HackSC Application Results</h1>

        <p>
          Thank you for filling out an application for HackSC 2020! Be on the
          look out for updates on when applications come out.
        </p>

        <p>
          In the meantime, follow HackSC on social media. Follow us on{" "}
          <a href="https://twitter.com/hackscofficial" target="_blank">
            Twitter
          </a>
          ,{" "}
          <a href="https://instagram.com/hackscofficial" target="_blank">
            Instagram
          </a>
          , and{" "}
          <a href="https://www.facebook.com/hackscofficial" target="_blank">
            Facebook
          </a>
        </p>
      </FormSection>
    </Flex>
  );
};

const FormSection = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 48px;
  margin-bottom: 64px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default ResultStep;
