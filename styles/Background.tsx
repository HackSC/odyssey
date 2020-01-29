import styled from "styled-components";

type BackgroundProps = {
  padding?: string;
};

const Background = styled.div<BackgroundProps>`
  background-color: #f6f6f6;
  ${({ padding }) => `padding: ${padding ? padding : "60px 0"};`}
`;

export default Background;
