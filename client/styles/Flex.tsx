import React from "react";
import styled from "styled-components";

type Props = {
  direction?: "row" | "column";
  align?: string;
  justify?: string;
};

const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  align-items: ${({ align }) => (align ? align : "stretch")};
  justify-content: ${({ justify }) => (justify ? justify : "flex-start")};
`;

export default Flex;
