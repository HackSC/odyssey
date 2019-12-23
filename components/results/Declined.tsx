import React from "react";
import styled from "styled-components";

import Blob from "../Blob";
import { Flex } from "../../styles";

type Props = {
  profile: Profile;
};

const Declined: React.FunctionComponent<Props> = props => {
  return (
    <Flex direction="column">
      <FormSection>
        <h1>You have declined a spot for HackSC 2020</h1>

        <p>
          We're sad we won't be seeing you at HackSC 2020 :( If you decide to
          change your mind, please let us know at hackers@hacksc.com
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

export default Declined;
