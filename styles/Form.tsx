import styled from "styled-components";

import Flex from "./Flex";

const Form = styled.form`
  input[type="text"],
  input[type="email"],
  textarea {
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    padding: 12px 16px;
    font-weight: 300;
    color: #5d5d5d;
    font-size: 16px;
  }

  select {
    font-family: "AktivGrotesk", sans-serif;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    background: #ffffff;
    padding: 12px 16px;
    font-weight: 400;
    color: #5d5d5d;
    -webkit-appearance: none;
    border-image: initial;
    position: relative;
  }
`;

const FormGroup = styled(Flex)`
  flex-direction: column;
  padding: 16px 0;

  label {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 16px;
  }
`;

const RadioChoice = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 4px 0;
`;

const RadioChoiceLabel = styled.span`
  padding-left: 8px;
`;

export default Form;
export { FormGroup, RadioChoice, RadioChoiceLabel };
