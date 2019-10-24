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
  }

  h2 {
    font-weight: 700;
    font-size: 28px;
  }

  h3 {
    font-weight: 600;
    font-size: 24px;
  }

  p {
    font-size: 16px;
    line-height: 20px;
  }

  input[type=text], textarea {
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    padding: 12px 16px;
    font-weight: 600;
    color: #b2b2b2;
    font-size: 16px;
  }
`;

export default GlobalStyles;
