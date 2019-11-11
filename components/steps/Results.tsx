import * as React from "react";

import styled from "styled-components";

import Blob from "../Blob";
import { Flex } from "../../styles";

type Props = {
  profile: Profile;
};

const ResultStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  if (profile && !profile.submittedAt) {
    return (
      <Flex direction="column">
        <FormSection>
          <h1>You haven't filled out an application yet!</h1>

          <p>
            Looks like you haven't finished the application process... please
            make sure you have set-up a hacker profile and filled out our
            application. You must submit an application by November 22, 2019, to
            be considered for HackSC 2020.
          </p>

          <Blob />
        </FormSection>
      </Flex>
    );
  }

  return (
    <Flex direction="column">
      <FormSection>
        <h1>HackSC Application Complete</h1>

        <p>
          Thank you for filling out an application for HackSC 2020! Be on the
          look out for updates on when application decisions come out.
        </p>

        <br />

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

        <Blob />
      </FormSection>
    </Flex>
  );
};

const FormSection = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 48px;
  margin-bottom: 64px;

  #blob {
    text-align: center;
    margin-top: 16px;

    ${({ theme }) =>
      theme.media.mobile`
      display: none;
    `}
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default ResultStep;
