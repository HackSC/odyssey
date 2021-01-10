import styled from "styled-components";

const EditButton = styled.button`
  width: 30px + 1vw;
  float: right;
  color: ${({ theme }) => theme.colors.peach};
  background-color: white;
  align-self: flex-start;
  border-radius: 5px;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.peach};
  margin-left: 1vw;

  &:hover {
    background-color: ${({ theme }) => theme.colors.peach};
    color: white;
  }
`;

export default EditButton;
