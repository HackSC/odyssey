import React from "react";

import Navbar from "../components/Navbar";

import {
  Button,
  Container,
  Column,
  Flex,
  Form,
  FormGroup,
  RadioChoice,
  RadioChoiceLabel,
  Panel,
  Section
} from "../styles";

const Sample = () => {
  return (
    <>
      <Navbar />

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
                <Blue>Lorem ipsum dolor sit amet</Blue>, consectetur adipiscing
                elit. Duis et justo eleifend, hendrerit quam eget, condimentum
                dui.
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
                justo eleifend, hendrerit quam eget, <Red>condimentum dui.</Red>
              </p>
            </Column>

            <Column>
              <h3>Equal width columns</h3>
              <p>
                Lorem ipsum dolor sit amet,{" "}
                <Peach>consectetur adipiscing elit.</Peach> Duis et justo
                eleifend, hendrerit <Yellow>quam eget, condimentum dui.</Yellow>
              </p>
            </Column>

            <Column>
              <h3>Equal width columns</h3>
              <p>
                <Magenta>Lorem ipsum dolor sit amet</Magenta>, consectetur
                adipiscing elit. Duis et justo eleifend, hendrerit quam eget,
                condimentum dui.
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

const Magenta = styled.span`
  color: ${({ theme }) => theme.colors.magenta};
`;

const Red = styled.span`
  color: ${({ theme }) => theme.colors.red};
`;

const Peach = styled.span`
  color: ${({ theme }) => theme.colors.peach};
`;

const Yellow = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
`;

const Blue = styled.span`
  color: ${({ theme }) => theme.colors.blue};
`;

export default Sample;
