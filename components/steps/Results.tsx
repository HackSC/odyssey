import * as React from "react";

import styled from "styled-components";

import { Flex } from "../../styles";

type Props = {
  profile: Profile;
};

const ResultStep: React.FunctionComponent<Props> = props => {
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
