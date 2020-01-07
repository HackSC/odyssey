import React from "react";
import styled from "styled-components";

import Blob from "../Blob";
import { Flex } from "../../styles";

const Rejected = () => {
  return (
    <Flex direction="column">
      <FormSection>
        <h1>HackSC 2020 Results</h1>

        <p>
          Thank you for applying to HackSC 2020. This year, we received many
          applicants from across the nation and had to make some tough calls.
          Unfortunately, we regret to inform you that we have not accepted you
          to HackSC 2020. While we know this isn't the news you'd like to hear,
          we wish you the best of luck going forward.
        </p>

        <br />

        <p>
          If you want to stay up to date with HackSC for the future, follow us
          on social media. Follow us on{" "}
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

export default Rejected;
