import React from "react";

import styled from "styled-components";

const Sample = () => {
  return (
    <>
      <Container>
        <Section>
          <h1>Heading 1</h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
            justo eleifend, hendrerit quam eget, condimentum dui. Aliquam vel
            quam ut dolor dignissim volutpat luctus in lorem. Vestibulum ante
            ipsum primis in faucibus orci luctus et ultrices posuere cubilia
            Curae;
          </p>
        </Section>

        <Section>
          <h2>Heading 2</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
            justo eleifend, hendrerit quam eget, condimentum dui. Aliquam vel
            quam ut dolor dignissim volutpat luctus in lorem.
          </p>
        </Section>

        <Panel>
          <h3>Heading 3</h3>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
            justo eleifend, hendrerit quam eget, condimentum dui.
          </p>
        </Panel>

        <Section>
          <Flex>
            <Column>
              <h2>Equal width columns</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
                justo eleifend, hendrerit quam eget, condimentum dui.
              </p>
            </Column>

            <Column>
              <h2>Equal width columns</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
                justo eleifend, hendrerit quam eget, condimentum dui.
              </p>
            </Column>
          </Flex>
        </Section>

        <Section>
          <Flex>
            <Column>
              <h3>Equal width columns</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
                justo eleifend, hendrerit quam eget, condimentum dui.
              </p>
            </Column>

            <Column>
              <h3>Equal width columns</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
                justo eleifend, hendrerit quam eget, condimentum dui.
              </p>
            </Column>

            <Column>
              <h3>Equal width columns</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et
                justo eleifend, hendrerit quam eget, condimentum dui.
              </p>
            </Column>
          </Flex>
        </Section>

        <Form>
          <FormGroup>
            <label>Name</label>
            <input type="text" />
          </FormGroup>

          <FormGroup>
            <label>Title</label>
            <input type="text" />
          </FormGroup>

          <FormGroup>
            <label>School</label>
            <select>
              <option>University of Southern California</option>
              <option>University of California, Los Angeles</option>
              <option>University of California, Berkeley</option>
            </select>
          </FormGroup>

          <FormGroup>
            <label>Gender</label>

            <RadioChoice>
              <input type="radio" name="gender" value="male" />
              <RadioChoiceLabel>Male</RadioChoiceLabel>
            </RadioChoice>

            <RadioChoice>
              <input type="radio" name="gender" value="female" />
              <RadioChoiceLabel>Female</RadioChoiceLabel>
            </RadioChoice>

            <RadioChoice>
              <input type="radio" name="gender" value="other" />
              <RadioChoiceLabel>Other</RadioChoiceLabel>
            </RadioChoice>
          </FormGroup>

          <FormGroup>
            <label>Why HackSC?</label>
            <textarea />
          </FormGroup>

          <Button>Submit</Button>
        </Form>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 93.75%;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
`;

const Flex = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
`;

const Section = styled.div`
  padding: 32px 0;
`;

const Panel = styled.div`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  margin-top: 16px;
  margin-bottom: 16px;
  box-sizing: border-box;
  padding: 36px;
`;

const Form = styled.form`
  padding: 16px 0;
`;

const FormGroup = styled(Flex)`
  flex-direction: column;
  padding: 16px 0;

  label {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

const RadioChoice = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const RadioChoiceLabel = styled.span`
  padding-left: 8px;
`;

const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: #ff8379;
  flex-grow: 1;
  font-size: 16px;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
`;

export default Sample;
