import React from "react";
import styled from "styled-components";

import Blob from "../Blob";
import { Flex } from "../../styles";

type Props = {
  profile: Profile;
};

const Confirmed: React.FunctionComponent<Props> = (props) => {
  return (
    <Flex direction="column">
      <FormSection>
        <h1>You're confirmed for HackSC 2021!</h1>

        <p>
          Woohoo! {props.profile.firstName}, we're excited to have you at HackSC
          2021. We have a lot of exciting things planned and we can't wait for
          you to be a part of it. Be on the lookout for future updates and
          communications from us. If you have any updates or questions, please
          contact us at <a href="mailto:team@hacksc.com">team@hacksc.com</a>
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

export default Confirmed;
