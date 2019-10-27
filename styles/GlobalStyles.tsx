import { createGlobalStyle } from "styled-components";
import Reset from "styled-reset";

import Fonts from "./Fonts";

const GlobalStyles = createGlobalStyle`
  ${Reset}
  ${Fonts}

  body {
    font-family: AktivGrotesk, sans-serif;
  }

  h1 {
    font-weight: 700;
    font-size: 32px;
    padding-bottom: 12px;
  }

  h2 {
    font-weight: 700;
    font-size: 28px;
    padding-bottom: 12px;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
    padding-bottom: 12px;
  }

  p {
    font-size: 16px;
    line-height: 20px;
  }
`;

export default GlobalStyles;
