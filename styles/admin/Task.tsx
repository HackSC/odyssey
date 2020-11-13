import styled from "styled-components";

const Task = styled.div`
  box-sizing: border-box;
  padding: 24px 36px;
  margin: 1rem !important;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.25s all;
  justify-content: left;
  &:hover {
    transform: scale(1.025);
  }
`;

export default Task;
