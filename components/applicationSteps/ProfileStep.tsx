import React, { useRef } from "react";

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
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
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

const ProfileStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  const formData = {
    firstName: useRef(null),
    lastName: useRef(null),
    phoneNumber: useRef(null),
    school: useRef(null),
    major: useRef(null),
    minor: useRef(null),
    year: useRef(null),
    graduationDate: useRef(null),
    gender: useRef(null),
    over18: useRef(null),
    needBus: useRef(null),
    skillLevel: useRef(null),
    skills: useRef(null),
    interests: useRef(null),
    links: useRef(null)
  };

  return profile ? (
    <Flex direction="column">
      <Form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <FormSection>
          <h1>Your Hacker Profile</h1>
          <p>
            We're excited for HackSC 2020 and can't wait to get to know you
            better. Please fill out your hacker profile{" "}
          </p>
        </FormSection>

        <FormSection>
          <h2>Contact Info</h2>

          <Flex justify="space-between">
            <Column flexBasis={49}>
              <FormGroup>
                <label>First Name</label>

                <input
                  type="text"
                  placeholder="First Name"
                  name="first-name"
                  ref={formData.firstName}
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
                  ref={formData.lastName}
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
              ref={formData.phoneNumber}
            />
          </FormGroup>
        </FormSection>

        <FormSection>
          <h2>Education</h2>
          <p>
            Now that we know your name and how to contact you, tell us about
            your education.
          </p>
          <FormGroup>
            <label>School</label>

            <input
              type="text"
              placeholder="Your School"
              name="school"
              ref={formData.school}
            />
          </FormGroup>

          <FormGroup>
            <label>Major</label>

            <input
              type="text"
              placeholder="Your Major"
              name="major"
              ref={formData.major}
            />
          </FormGroup>

          <FormGroup>
            <label>Minor (optional)</label>

            <input
              type="text"
              placeholder="Your Minor"
              name="minor"
              ref={formData.minor}
            />
          </FormGroup>

          <FormGroup>
            <label>Year</label>

            <Select name="year" options={yearOptions} ref={formData.year} />
          </FormGroup>

          <FormGroup>
            <label>Graduation Date</label>

            <Select
              name="graduation-date"
              options={gradDateOptions}
              ref={formData.graduationDate}
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
              ref={formData.gender}
            />
          </FormGroup>

          <FormGroup>
            <label>Ethnicity</label>

            <Flex justify="space-between">
              <Column flexBasis={49}>
                <RadioChoice>
                  <input
                    type="radio"
                    name="ethnicity"
                    value="american-indian"
                  />
                  <RadioChoiceLabel>
                    Native American or Alaskan Native
                  </RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" value="asian" />
                  <RadioChoiceLabel>Asian / Pacific Islander</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" value="black" />
                  <RadioChoiceLabel>Black or African American</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" value="hispanic" />
                  <RadioChoiceLabel>Hispanic</RadioChoiceLabel>
                </RadioChoice>
              </Column>

              <Column flexBasis={49}>
                <RadioChoice>
                  <input type="radio" name="ethnicity" value="caucasian" />
                  <RadioChoiceLabel>White / Caucasian</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" value="mixed-other" />
                  <RadioChoiceLabel>Mixed / Other</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" value="no-say" />
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
              <input type="checkbox" name="is-over-18" ref={formData.over18} />
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
              <input type="checkbox" name="need-bus" ref={formData.needBus} />
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
              ref={formData.skillLevel}
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
              ref={formData.skills}
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
              ref={formData.interests}
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
              ref={formData.links}
            />
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
                <Button type="submit">Submit</Button>
              </Flex>
            </Column>
          </Flex>
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

const FileNameLabel = styled.p`
  padding-left: 32px;
`;

export default ProfileStep;
