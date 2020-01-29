import styled from "styled-components";

type AlertProps = {
  background?: string;
  borderRadius?: number;
  color?: string;
  borderColor?: string;
  margin?: string;
  borderWidth?: string;
  display?: boolean;
};

const Alert = styled.div<AlertProps>`
position: relative;
  ${({ display }) => `display: ${display ? "visible" : "none"};`}
  ${({ margin }) => `margin: ${margin ? margin : "1em"};`}
  ${({ borderColor }) =>
    `border-color: ${borderColor ? borderColor : "white"};`}
  ${({ borderWidth }) => `border: ${borderWidth ? borderWidth : "0px"} solid;`}
  ${({ background }) => `background: ${background ? background : `white`}`};
  z-index: 999;
  ${({ borderRadius }) =>
    `border-radius: ${borderRadius ? borderRadius + `px` : `4px`}`};
  padding: 1rem 1rem;
  align-items: center;
  text-align: center;
  ${({ color }) => `color: ${color ? color : `#5F5F5F`}`};
  -webkit-transition: 0.15s all;
`;

export default Alert;
