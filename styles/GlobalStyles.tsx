import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

import Fonts from "./Fonts";

const GlobalStyles = createGlobalStyle`
  ${Reset}
  ${Fonts}

  body {
    font-family: ${({ theme }) => theme.fontFamily};
    color: ${({ theme }) => theme.colors.black};
  }

  h1 {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.title};
    padding-bottom: 12px;
  }

  h2 {
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSizes.header};
    text-transform: uppercase;
    padding-bottom: 12px;
  }

  h3 {
    font-weight: 600;
    font-size: ${({ theme }) => theme.fontSizes.subheader};
    padding-bottom: 12px;
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.regular};
    line-height: 22px;
  }

  b {
    font-weight: 600;
  }

  a {
    color: ${({ theme }) => theme.colors.peach};
    text-decoration: none;
    line-height: 20px;
  }

  ::placeholder {
    color: #D3D3D4;
    opacity: 1; /* Firefox */
  }  
`;

export default GlobalStyles;
