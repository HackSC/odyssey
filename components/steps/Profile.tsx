import React, { useRef, useState } from "react";

import styled from "styled-components";
import {
  Form,
  FormGroup,
  RadioChoice,
  RadioChoiceLabel,
  Flex,
  Column,
  Button
} from "../../styles";

import Select from "../Select";
import AutocompleteInput from "../AutocompleteInput";

import { addResumeUrl, syncProfile } from "../../lib/formSubmission";

import getSchoolFromEmail from "../../lib/getSchoolFromEmail";

import Schools from "../../assets/data/schools.json";
import Majors from "../../assets/data/majors.json";

type Props = {
  profile: Profile;
};

// Used for select inputs
const yearOptions = [
  { label: "Freshman", value: "freshman" },
  { label: "Sophomore", value: "sophomore" },
  { label: "Junior", value: "junior" },
  { label: "Senior", value: "senior" },
  { label: "Graduate", value: "graduate" }
];

const gradDateOptions = [
  { label: "Spring 2020", value: "spring-2020" },
  { label: "Fall 2020", value: "fall-2020" },
  { label: "Spring 2021", value: "spring-2021" },
  { label: "Fall 2021", value: "fall-2021" },
  { label: "Spring 2022", value: "spring-2022" },
  { label: "Fall 2022", value: "fall-2022" },
  { label: "Spring 2023", value: "spring-2023" },
  { label: "Fall 2023", value: "fall-2023" },
  { label: "Other", value: "other" }
];

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-Binary", value: "non-binary" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "no-say" }
];

const skillLevelOptions = [
  {
    label: "Beginner - First time hacker or still learning",
    value: "beginner"
  },
  {
    label: "Intermediate - Not your first rodeo but still lots to learn",
    value: "intermediate"
  },
  { label: "Advanced - Hacker who knows the game", value: "advanced" }
];

const uploadResume = async resumeFile => {
  var resumeForm = new FormData();
  resumeForm.append("file", resumeFile);
  const response = await fetch("/api/profile/resume", {
    method: "POST",
    body: resumeForm
  });

  const s3Info = await response.json();
  addResumeUrl(s3Info.data.location);
};

const ProfileStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  const [saved, setSaved] = useState(false);
  const [userResume, setUserResume] = useState(null);
  const [submitted, setSubmitted] = useState(
    !!profile && !!profile.submittedAt
  );
  const [error, setError] = useState(null);

  const formRef = useRef(null);

  // Necessary for autocomplete
  const majorRef = useRef(null);
  const schoolRef = useRef(null);

  if (profile && profile.status === "unverified") {
    return (
      <Flex direction="column">
        <FormSection>
          <h1>Please Verify Your E-Mail</h1>

          <p>
            In order to continue through the application process, we need to
            verify your e-mail. Double check your e-mail and make sure you got
            an email verification link. If your profile is still not flagged as
            verified, log out and log back in.
          </p>
        </FormSection>
      </Flex>
    );
  }

  return profile ? (
    <Flex direction="column">
      <Form
        onSubmit={e => {
          syncProfile(e, formRef, setSubmitted, setError, true);
        }}
        ref={formRef}
      >
        <FormSection>
          <h1>Your HackSC Application</h1>
          <p>
            We're excited for HackSC 2020 and can't wait to get to know you
            better! Please fill out this HackSC application so we can know more
            about you, where you come from, and what you've done.
          </p>

          {submitted && (
            <AlreadySubmitted>
              You have already submitted your application! Be on the look out
              for updates on when results come out.
            </AlreadySubmitted>
          )}
        </FormSection>

        <FormSection>
          <h2>Contact Info</h2>

          <Flex justify="space-between" tabletVertical>
            <Column flexBasis={49}>
              <FormGroup>
                <label>First Name</label>

                <input
                  type="text"
                  placeholder="First Name"
                  name="first-name"
                  defaultValue={profile.firstName}
                  required
                  disabled={submitted}
                />
              </FormGroup>
            </Column>

            <Column flexBasis={49}>
              <FormGroup>
                <label>Last Name</label>

                <input
                  type="text"
                  placeholder="Last Name"
                  name="last-name"
                  defaultValue={profile.lastName}
                  required
                  disabled={submitted}
                />
              </FormGroup>
            </Column>
          </Flex>

          <FormGroup>
            <label>E-Mail</label>

            <input
              type="email"
              placeholder="your@email.edu"
              value={profile.email}
              name="email"
              disabled
            />
          </FormGroup>

          <FormGroup>
            <label>Phone Number</label>

            <input
              type="text"
              placeholder="(678)-999-8210"
              name="phone-number"
              defaultValue={profile.phoneNumber}
              required
              disabled={submitted}
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <h2>Education</h2>

          <FormGroup>
            <label>School</label>

            <AutocompleteInput
              placeholder="Your School"
              name="school"
              defaultValue={profile.school || getSchoolFromEmail(profile.email)}
              required
              ref={schoolRef}
              disabled={submitted || !!getSchoolFromEmail(profile.email)}
              suggestions={Schools}
            />
          </FormGroup>

          <FormGroup>
            <label>Major</label>

            <AutocompleteInput
              placeholder="Your Major"
              name="major"
              defaultValue={profile.major}
              required
              ref={majorRef}
              disabled={submitted}
              suggestions={Majors}
            />
          </FormGroup>

          <FormGroup>
            <label>Minor (optional)</label>

            <input
              type="text"
              placeholder="Your Minor"
              name="minor"
              defaultValue={profile.minor}
              disabled={submitted}
            />
          </FormGroup>

          <FormGroup>
            <label>Year</label>

            <Select
              name="year"
              options={yearOptions}
              defaultValue={profile.year}
              required
              disabled={submitted}
            />
          </FormGroup>

          <FormGroup>
            <label>Graduation Date</label>

            <Select
              name="graduation-date"
              options={gradDateOptions}
              defaultValue={profile.graduationDate}
              required
              disabled={submitted}
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <h2>Demographics</h2>

          <FormGroup>
            <label>Gender</label>

            <Select
              name="gender"
              options={genderOptions}
              defaultValue={profile.gender}
              required
              disabled={submitted}
            />
          </FormGroup>

          <FormGroup>
            <label>Ethnicity</label>

            <Flex justify="space-between" tabletVertical>
              <Column flexBasis={49}>
                <RadioChoice>
                  <input
                    type="radio"
                    name="ethnicity"
                    value="american-indian"
                    defaultChecked={profile.ethnicity === "american-indian"}
                    disabled={submitted}
                    required
                  />
                  <RadioChoiceLabel>
                    Native American or Alaskan Native
                  </RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="radio"
                    name="ethnicity"
                    value="asian"
                    defaultChecked={profile.ethnicity === "asian"}
                    disabled={submitted}
                  />
                  <RadioChoiceLabel>Asian / Pacific Islander</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="radio"
                    name="ethnicity"
                    value="black"
                    defaultChecked={profile.ethnicity === "black"}
                    disabled={submitted}
                  />
                  <RadioChoiceLabel>Black or African American</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="radio"
                    name="ethnicity"
                    value="hispanic"
                    defaultChecked={profile.ethnicity === "hispanic"}
                    disabled={submitted}
                  />
                  <RadioChoiceLabel>Hispanic</RadioChoiceLabel>
                </RadioChoice>
              </Column>

              <Column flexBasis={49}>
                <RadioChoice>
                  <input
                    type="radio"
                    name="ethnicity"
                    value="caucasian"
                    defaultChecked={profile.ethnicity === "caucasian"}
                    disabled={submitted}
                  />
                  <RadioChoiceLabel>White / Caucasian</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="radio"
                    name="ethnicity"
                    value="mixed-other"
                    defaultChecked={profile.ethnicity === "mixed-other"}
                    disabled={submitted}
                  />
                  <RadioChoiceLabel>Mixed / Other</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="radio"
                    name="ethnicity"
                    value="no-say"
                    defaultChecked={profile.ethnicity === "no-say"}
                    disabled={submitted}
                  />
                  <RadioChoiceLabel>Prefer not to answer</RadioChoiceLabel>
                </RadioChoice>
              </Column>
            </Flex>
          </FormGroup>

          <FormGroup>
            <label>
              Will you be over the age of 18 by the time of HackSC 2020?
            </label>

            <RadioChoice>
              <input
                type="checkbox"
                name="is-over-18"
                defaultChecked={profile.over18}
                required
                disabled={submitted}
              />
              <RadioChoiceLabel>
                Yes, I will be 18+ by January 31, 2020
              </RadioChoiceLabel>
            </RadioChoice>
          </FormGroup>
        </FormSection>

        <FormSection>
          <h2>Additional Information</h2>

          <FormGroup>
            <label>
              Will you need bus transportation to/from your school to USC?
            </label>

            <RadioChoice>
              <input
                type="checkbox"
                name="need-bus"
                defaultChecked={profile.needBus}
                disabled={submitted}
              />
              <RadioChoiceLabel>
                Yes, I need bus transportation
              </RadioChoiceLabel>
            </RadioChoice>
          </FormGroup>

          <FormGroup>
            <label>Resume - Must be a PDF, 10MB Maximum</label>

            <ResumeUploadInput
              type="file"
              name="resume"
              id="resume"
              accept="application/pdf"
              required
              ref={ref => setUserResume(ref)}
            />
            <ResumeUploadButton htmlFor="resume">
              Upload Your Resume
            </ResumeUploadButton>
          </FormGroup>

          <FormGroup>
            <label>Skill Level - How experienced are you as a hacker?</label>

            <Select
              name="skill-level"
              options={skillLevelOptions}
              defaultValue={profile.skillLevel}
              disabled={submitted}
              required
            />
          </FormGroup>

          <FormGroup>
            <label>
              Skills (Optional) - List out your skills (comma separated)
            </label>

            <textarea
              rows={3}
              placeholder="javascript, python, c++, node.js, express, react, mysql"
              name="skills"
              defaultValue={profile.skills}
              disabled={submitted}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Interests (Optional) - List out technology related topics that
              interest you (comma separated)
            </label>

            <textarea
              rows={3}
              placeholder="blockchain, machine learning, security"
              name="interests"
              defaultValue={profile.interests}
              disabled={submitted}
            />
          </FormGroup>

          <FormGroup>
            <label>
              Links (Optional) - Feel free to share your portfolio, GitHub,
              LinkedIn, and more
            </label>

            <textarea
              rows={3}
              placeholder="https://yourportfolio.com, https://linkedin.com/in/yourlinkedin"
              name="links"
              defaultValue={profile.links}
              disabled={submitted}
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <h1>Your HackSC Application</h1>
          <p>
            Now that we know a bit more about you, we'd love to hear more about
            what you want to build at HackSC and what projects you've done in
            the past.
          </p>

          <FormGroup>
            <label>
              HackSC has four verticals centered around social justice: civil
              liberties, sustainability, equity, and mental health. Read more
              about them at{" "}
              <a href="https://hacksc.com" target="_blank">
                hacksc.com
              </a>
              . If you were admitted to HackSC 2020, which vertical would you
              tackle and what would you build? (1000 characters)
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
            <label>
              How did you hear about HackSC? (100 characters, optional)
            </label>

            <input
              type="text"
              name="marketing"
              maxLength={100}
              placeholder="Social Media"
              defaultValue={profile.marketing}
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
          {!submitted && (
            <>
              <Flex justify="space-between" tabletVertical>
                <Column flexBasis={49}>
                  <Flex>
                    <Button
                      outline
                      onClick={e => {
                        syncProfile(e, formRef, setSaved, setError, false);
                        if (userResume) {
                          uploadResume(userResume.files[0]);
                        }
                      }}
                      disabled={submitted}
                    >
                      Save for later
                    </Button>
                  </Flex>
                </Column>
                <Column flexBasis={49}>
                  <Flex>
                    <SubmitButton type="submit" disabled={submitted}>
                      Submit
                    </SubmitButton>
                  </Flex>
                </Column>
              </Flex>

              <SubmitWarningMessage>
                You can only submit your profile once! Be sure everything is
                good to go before you submit.
              </SubmitWarningMessage>
            </>
          )}

          {saved && <SavedMessage>Profile saved successfully.</SavedMessage>}
          {submitted && (
            <SubmittedMessage>
              Your profile has been submitted successfully
            </SubmittedMessage>
          )}
        </FormSection>
      </Form>
    </Flex>
  ) : (
    <div>Loading...</div>
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

const ResumeUploadInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const ResumeUploadButton = styled.label`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.peach};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
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
  margin-bottom: 16px;
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

const SubmitButton = styled(Button)`
  ${({ theme }) =>
    theme.media.tablet`
      margin-top: 24px;
    `}
`;

export default ProfileStep;
