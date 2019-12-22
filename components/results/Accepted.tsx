import React, { useState } from "react";
import styled from "styled-components";

import {
  Flex,
  Button,
  Form,
  FormGroup,
  RadioChoice,
  RadioChoiceLabel
} from "../../styles";

import Select from "../Select";

type Props = {
  profile: Profile;
};

const Accepted: React.FunctionComponent<Props> = props => {
  const [accepted, setAccepted] = useState(false);

  return (
    <Flex direction="column">
      {accepted ? (
        <FormSection>
          <h1>Confirmation Form</h1>

          <p>
            We're excited that you want to attend HackSC! To confirm that you
            will be attending, please fill out the following by{" "}
            <b>January 1st, 2020</b>.
          </p>

          <br />

          <p>
            <b>
              If you do not submit this form by January 1st, 2020, we can not
              hold your spot for HackSC 2020
            </b>
          </p>

          <Form>
            <FormGroup>
              <label>Where are you traveling from?</label>

              <input type="text" placeholder="Mars" name="travel-origin" />
            </FormGroup>

            <FormGroup>
              <label>What is your t-shirt size?</label>

              <Select
                name="shirt-size"
                options={[
                  { label: "Small", value: "s" },
                  { label: "Large", value: "l" }
                ]}
                required
              />
            </FormGroup>
          </Form>

          <FormGroup>
            <label>Code of Conduct</label>

            <RadioChoice>
              <input
                type="checkbox"
                name="code-of-conduct"
                required
                id="code-of-conduct"
              />
              <RadioChoiceLabel htmlFor="code-of-conduct">
                I agree to the Code of Conduct
              </RadioChoiceLabel>
            </RadioChoice>
          </FormGroup>
        </FormSection>
      ) : (
        <FormSection>
          <h1>Congrats, you have been accepted to HackSC 2020!</h1>

          <p>
            Congratulations you have been accepted to HackSC! Please fill this
            out by <b>January 1st, 2020</b> to confirm your attendance.
          </p>

          <Flex direction="row">
            <DecideButton onClick={() => setAccepted(true)}>
              Accept
            </DecideButton>
            <DecideButton outline>Decline</DecideButton>
          </Flex>
        </FormSection>
      )}
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

const DecideButton = styled(Button)`
  margin: 16px 16px 0;
`;

export default Accepted;
