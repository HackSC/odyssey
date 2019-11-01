import styled from "styled-components";

type ButtonProps = {
  outline?: boolean;
};

const Button = styled.button<ButtonProps>`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.peach};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;

  ${({ disabled }) => disabled && `cursor: not-allowed`};

  ${({ outline, theme }) =>
    outline &&
    `
      background: transparent;
      border: 1px solid ${theme.colors.peach};
      color: ${theme.colors.peach};
    `}
`;

export default Button;
