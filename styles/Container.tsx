import styled from "styled-components";

type ContainerProps = {
  width?: string;
};

const Container = styled.div<ContainerProps>`
  ${({ width }) => (width ? `width: ${width}` : `93.75%`)};
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
`;

export default Container;
