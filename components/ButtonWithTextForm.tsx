import React, { useState } from "react";
import { Form, FormGroup, Flex, Button } from "../styles";

import styled from "styled-components";

const ButtonWithTextForm = ({
  title,
  label,
  onSubmit,
  buttonText,
  initial,
}) => {
  const [text, setText] = useState(initial);

  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <Form>
      <Title>{title}</Title>
      <FormGroup>
        <label>{label}</label>
        <InputFlex>
          <input
            type="text"
            placeholder=""
            value={text}
            required
            onChange={handleChange}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              onSubmit(text);
              setText(text);
            }}
          >
            {buttonText}
          </Button>
        </InputFlex>
      </FormGroup>
    </Form>
  );
};

const Title = styled.h2`
  padding-bottom: 0;
`;

const InputFlex = styled(Flex)`
  input {
    flex-basis: 70%;
    margin-right: 16px;
  }
`;

export default ButtonWithTextForm;
