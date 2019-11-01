import React, { useRef, useState } from "react";

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

import { saveApplication, submitApplication } from "../../lib/formSubmission";

type Props = {
  profile: Profile;
};

const ApplicationStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  const formRef = useRef(null);

  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(
    !!profile && !!profile.applicationSubmittedAt
  );
  const [error, setError] = useState(null);

  return (
    <Flex direction="column">
      <Form
        ref={formRef}
        onSubmit={e => submitApplication(e, formRef, setSubmitted, setError)}
      >
        <FormSection>
          <h1>Your HackSC Application</h1>
          <p>
            Thanks for filling out your hacker profile! Now that we know a bit
            more about you, we'd love to hear more about what you want to build
            at HackSC and what projects you've done in the past.
          </p>

          {submitted && (
            <AlreadySubmitted>
              You have already submitted your application. Next step: wait for
              results to come out!
            </AlreadySubmitted>
          )}
        </FormSection>

        <FormSection>
          <FormGroup>
            <label>
              HackSC has four verticals centered around social justice: civil
              liberties, sustainability, equity, and mental health. If you were
              admitted to HackSC 2020, which vertical would you tackle and what
              would you build? (1000 characters)
            </label>

            <textarea
              rows={5}
              name="question-one"
              maxLength={1000}
              defaultValue={profile.questionOne}
              required
              disabled={submitted}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Tell us about a project you have finished in the past? (1000
              characters)
            </label>

            <textarea
              rows={5}
              name="question-two"
              maxLength={1000}
              defaultValue={profile.questionTwo}
              required
              disabled={submitted}
            />
          </FormGroup>

          <FormGroup>
            <label>What is your favorite drink? (100 characters)</label>

            <input
              type="text"
              name="question-three"
              maxLength={100}
              defaultValue={profile.questionThree}
              required
              disabled={submitted}
            />
          </FormGroup>

          <FormGroup>
            <RadioChoice>
              <input
                type="checkbox"
                name="code-of-conduct"
                defaultChecked={profile.codeOfConduct}
                required
                disabled={submitted}
              />
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
              <input
                type="checkbox"
                name="authorize"
                defaultChecked={profile.authorize}
                required
                disabled={submitted}
              />
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
                <Button
                  outline
                  onClick={e => saveApplication(e, formRef, setSaved, setError)}
                  disabled={submitted}
                >
                  Save
                </Button>
              </Flex>
            </Column>
            <Column flexBasis={49}>
              <Flex>
                <Button type="submit" disabled={submitted}>
                  Submit
                </Button>
              </Flex>
            </Column>
          </Flex>

          <SubmitWarningMessage>
            You can only submit your application once! Be sure everything is
            good to go before you submit.
          </SubmitWarningMessage>
          {saved && (
            <SavedMessage>Application saved successfully.</SavedMessage>
          )}
          {submitted && (
            <SubmittedMessage>
              Your application has been submitted successfully
            </SubmittedMessage>
          )}
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

const AlreadySubmitted = styled.p`
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.peach};
  font-weight: 600;
  border-radius: 8px;
  margin-top: 24px;
  color: ${({ theme }) => theme.colors.peach};
`;

const SubmitWarningMessage = styled.p`
  text-align: center;
  font-weight: 600;
  padding: 32px 0 0;
  color: ${({ theme }) => theme.colors.black};
`;

const SavedMessage = styled.p`
  text-align: center;
  font-weight: 600;
  padding: 32px 0 0;
  margin-top: 16px;
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;
`;

const SubmittedMessage = styled.p`
  text-align: center;
  font-weight: 600;
  padding: 32px 0 0;
  margin-top: 16px;
  padding: 16px;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.gray50};
  border-radius: 8px;
`;

export default ApplicationStep;
