import * as React from "react";

import styled from "styled-components";

import {
  Form,
  FormGroup,
  RadioChoice,
  RadioChoiceLabel,
  Flex,
  Button,
  Column
} from "../../styles";

type Props = {
  profile: Profile;
};

const ApplicationStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return (
    <Flex direction="column">
      <Form>
        <FormSection>
          <h1>Your HackSC Application</h1>
          <p>
            Thanks for filling out your hacker profile! Now that we know a bit
            more about you, we'd love to hear more about what you want to build
            at HackSC and what projects you've done in the past.
          </p>
        </FormSection>

        <FormSection>
          <FormGroup>
            <label>
              HackSC has four verticals centered around social justice: civil
              liberties, sustainability, equity, and mental health. If you were
              admitted to HackSC 2020, which vertical would you tackle and what
              would you build? (1000 characters)
            </label>

            <textarea rows={3} name="question-one" />
          </FormGroup>

          <FormGroup>
            <label>
              Tell us about a project you have finished in the past? (1000
              characters)
            </label>

            <textarea rows={3} name="question-two" />
          </FormGroup>

          <FormGroup>
            <label>What is your favorite drink? (100 characters)</label>

            <input type="text" name="question-three" />
          </FormGroup>

          <FormGroup>
            <RadioChoice>
              <input type="checkbox" name="code-of-conduct" />
              <RadioChoiceLabel>
                I have read and agree to the{" "}
                <a
                  href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                  target="_blank"
                >
                  MLH Code of Conduct
                </a>
                .
              </RadioChoiceLabel>
            </RadioChoice>
          </FormGroup>

          <FormGroup>
            <RadioChoice>
              <input type="checkbox" name="authorize" />
              <RadioChoiceLabel>
                I authorize you to share my application/registration information
                for event administration, ranking, MLH administration, pre- and
                post-event informational e-mails, and occasional messages about
                hackathons in-line with the{" "}
                <a href="https://mlh.io/privacy" target="_blank">
                  MLH Privacy Policy
                </a>
                . I further agree to the terms of both the{" "}
                <a
                  href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions"
                  target="_blank"
                >
                  MLH Contest Terms and Conditions
                </a>{" "}
                and the{" "}
                <a href="https://mlh.io/privacy" target="_blank">
                  MLH Privacy Policy
                </a>
                .
              </RadioChoiceLabel>
            </RadioChoice>
          </FormGroup>
        </FormSection>

        <FormSection>
          <Flex justify="space-between">
            <Column flexBasis={49}>
              <Flex>
                <Button outline>Save</Button>
              </Flex>
            </Column>
            <Column flexBasis={49}>
              <Flex>
                <Button>Submit</Button>
              </Flex>
            </Column>
          </Flex>
        </FormSection>
      </Form>
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

export default ApplicationStep;
