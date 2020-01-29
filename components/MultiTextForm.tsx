import React, { useState } from "react";
import { Form, FormGroup, Flex, Button } from "../styles";

import styled from "styled-components";

type Field = {
  initialValue: string;
  label: string;
  name: string;
};

type Props = {
  title: string;
  fields: Field[];
  onSubmit: (fields: { [key: string]: string }) => void;
};

const MultiTextForm = ({ title, fields, onSubmit }: Props) => {
  const hooks = fields.map(f => useState(f.initialValue));

  const handleSubmit = e => {
    e.preventDefault();

    const packagedValues = fields.reduce((vals, f, i) => {
      vals[f.name] = hooks[i][0];
      return vals;
    }, {});

    onSubmit(packagedValues);
  };

  return (
    <Form>
      <Title>{title}</Title>
      <FormGroup>
        {fields.map((f, i) => (
          <>
            <label>{f.label}</label>
            <InputFlex>
              <input
                type="text"
                value={hooks[i][0]}
                onChange={e => hooks[i][1](e.target.value)}
              />
            </InputFlex>
          </>
        ))}
      </FormGroup>
      <Button onClick={handleSubmit}>Submit</Button>
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

export default MultiTextForm;
