import styled from "styled-components";

const CreateButton = styled.button`
  width: 30px + 1vw;
  float: right;
  color: ${({ theme }) => theme.colors.green};
  background-color: white;
  align-self: flex-start;
  border-radius: 5px;
  padding: 1rem;
  border: 2px solid ${({ theme }) => theme.colors.green};

  &:hover {
    background-color: ${({ theme }) => theme.colors.green};
    color: white;
  }
`;

export default CreateButton;
