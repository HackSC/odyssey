import styled from "styled-components";

type CardProps = {
  background?: string;
  borderRadius?: number;
  color?: string;
};

const Card = styled.div<CardProps>`
  border: 1px solid #cfcfcf !important;
  ${({ background }) => {
    if (background) {
      return `background: ${background}%`;
    }
    return `background: white`;
  }};
  z-index: 999;
  ${({ borderRadius }) => {
    if (borderRadius) {
      return `border-radius: ${borderRadius}%`;
    }
    return `border-radius: 4px`;
  }};
  padding: 1rem 1rem;
  align-items: center;
  ${({ color }) => {
    if (color) {
      return `color: ${color}%`;
    }
    return `color: #5F5F5F`;
  }};
  -webkit-transition: 0.15s all;
`;

export default Card;
