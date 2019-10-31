import * as React from "react";

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

type Props = {
  profile: Profile;
};

const ProfileStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return profile ? (
    <Flex direction="column">
      <Form>
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

                <input type="text" placeholder="First Name" />
              </FormGroup>
            </Column>

            <Column flexBasis={49}>
              <FormGroup>
                <label>Last Name</label>

                <input type="text" placeholder="Last Name" />
              </FormGroup>
            </Column>
          </Flex>

          <FormGroup>
            <label>E-Mail</label>

            <input type="email" placeholder="your@email.edu" />
          </FormGroup>

          <FormGroup>
            <label>Phone Number</label>

            <input type="text" placeholder="(678)-999-8210" />
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

            <input type="text" placeholder="Your School" />
          </FormGroup>

          <FormGroup>
            <label>Major</label>

            <input type="text" placeholder="Your Major" />
          </FormGroup>

          <FormGroup>
            <label>Minor (optional)</label>

            <input type="text" placeholder="Your Minor" />
          </FormGroup>

          <FormGroup>
            <label>Year</label>

            <select>
              <option>Freshman</option>
              <option>Sophomore</option>
              <option>Junior</option>
              <option>Senior</option>
              <option>Graduate</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Graduation Date</label>

            <select>
              <option>Spring 2020</option>
              <option>Fall 2020</option>
              <option>Spring 2021</option>
              <option>Fall 2021</option>
              <option>Spring 2022</option>
              <option>Fall 2022</option>
              <option>Spring 2023</option>
              <option>Fall 2023</option>
              <option>Other</option>
            </select>
          </FormGroup>
        </FormSection>

        <FormSection>
          <h2>Demographics</h2>

          <FormGroup>
            <label>Gender</label>

            <select>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to answer</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Ethnicity</label>

            <Flex justify="space-between">
              <Column flexBasis={49}>
                <RadioChoice>
                  <input type="radio" name="ethnicity" />
                  <RadioChoiceLabel>
                    American Indian or Alaskan Native
                  </RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" />
                  <RadioChoiceLabel>Asian / Pacific Islander</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" />
                  <RadioChoiceLabel>Black or African American</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" />
                  <RadioChoiceLabel>Hispanic</RadioChoiceLabel>
                </RadioChoice>
              </Column>

              <Column flexBasis={49}>
                <RadioChoice>
                  <input type="radio" name="ethnicity" />
                  <RadioChoiceLabel>White / Caucasian</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" />
                  <RadioChoiceLabel>Mixed / Other</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="radio" name="ethnicity" />
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
              <input type="checkbox" name="is-over-18" />
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
              <input type="checkbox" name="is-over-18" />
              <RadioChoiceLabel>
                Yes, I need bus transportation
              </RadioChoiceLabel>
            </RadioChoice>
          </FormGroup>

          <FormGroup>
            <label>Resume - Must be a PDF, 10MB Maximum</label>

            <Flex align="center" justify="flex-start">
              <Column flexBasis={35}>
                <Flex>
                  <Button>Upload Your Resume</Button>
                </Flex>
              </Column>

              <Column flexGrow={1}>
                <FileNameLabel>File_Name.pdf</FileNameLabel>
              </Column>
            </Flex>
          </FormGroup>

          <FormGroup>
            <label>Skill Level - How experienced are you as a hacker?</label>

            <select>
              <option>Beginner - First time hacker or still learning</option>
              <option>
                Intermediate - Not your first rodeo but still lots to learn
              </option>
              <option>Advanced - Veteran hacker who knows the game</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>
              Skills (Optional) - List out your skills (comma separated)
            </label>

            <textarea
              rows={3}
              placeholder="javascript, python, c++, node.js, express, react, mysql"
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
                <Button>Submit</Button>
              </Flex>
            </Column>
          </Flex>
        </FormSection>
      </Form>
    </Flex>
  ) : (
    <div>loading</div>
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

const FileNameLabel = styled.p`
  padding-left: 32px;
`;

export default ProfileStep;
