import styled from "styled-components";

type AProps = {
  style?: Object;
};

const A = styled.a<AProps>`
  &:hover {
    color: ${({ style }) =>
      style["&:hover"]["color"] ? style["&:hover"]["color"] : "#462470"};
    background-color: ${({ style }) =>
      style["&:hover"]["backgroundColor"]
        ? style["&:hover"]["backgroundColor"]
        : "#FF8379"};
  }
  padding: 15px;
  margin: 10px;
  background-color: ${({ style }) =>
    style["backgroundColor"] ? style["backgroundColor"] : "#e6194b"};
  font-size: 24px;
  border-radius: 4px;
  color: white;
  font-weight: bold;
`;

export default A;
