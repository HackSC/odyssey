import styled from "styled-components";

const Button = styled.button`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: #ff8379;
  flex-grow: 1;
  font-size: 12px;
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;

  ${({ hero }) =>
    hero &&
    `
      font-size: 16px;
      padding: 14px 18px;
      margin-top: 24px;
      display: block;
      width: auto;
      max-width: 240px;
    `}
`;

export default Button;
