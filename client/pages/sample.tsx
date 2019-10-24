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
        <input type="text" />
        <button>Submit</button>
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

export default Sample;
