import styled from "styled-components";

type ColumnProps = {
  flexBasis?: number;
  flexGrow?: number;
};

const Column = styled.div<ColumnProps>`
  box-sizing: border-box;
  ${({ flexBasis }) => flexBasis && `flex-basis: ${flexBasis}%`};
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow}`};

  ${({ theme }) =>
    theme.media.tablet`
      flex-basis: 100%;
    `}
`;

export default Column;
