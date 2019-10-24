import React from "react";

import styled from "styled-components";

const Sample = () => {
  return (
    <>
      <h1>Heading 1</h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et justo
        eleifend, hendrerit quam eget, condimentum dui. Aliquam vel quam ut
        dolor dignissim volutpat luctus in lorem. Vestibulum ante ipsum primis
        in faucibus orci luctus et ultrices posuere cubilia Curae;
      </p>

      <h2>Heading 2</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et justo
        eleifend, hendrerit quam eget, condimentum dui. Aliquam vel quam ut
        dolor dignissim volutpat luctus in lorem.
      </p>

      <h3>Heading 3</h3>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et justo
        eleifend, hendrerit quam eget, condimentum dui.
      </p>

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

      <form>
        <FormGroup>
          <label>Name</label>
          <input type="text" />
        </FormGroup>

        <FormGroup>
          <label>Title</label>
          <input type="text" />
        </FormGroup>

        <FormGroup>
          <label>Why HackSC?</label>
          <textarea />
        </FormGroup>

        <Button>Submit</Button>
      </form>
    </>
  );
};

const Flex = styled.div`
  display: flex;
`;

const Column = styled.div`
  flex: 1;
`;

const FormGroup = styled(Flex)`
  flex-direction: column;
  padding: 16px 0;

  label {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #ff8379;
  flex-grow: 1;
  font-size: 14px;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
`;

export default Sample;
