import styled from "styled-components";

type ColumnProps = {
  flexBasis?: number;
  flexGrow?: number;
};

const Column = styled.div<ColumnProps>`
  box-sizing: border-box;
  padding-left: 8px;
  padding-right: 8px;
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis}%`};
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow}`};
`;

export default Column;
