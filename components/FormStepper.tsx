import * as React from "react";
import { Container, Panel } from "../styles";
import styled, { DefaultTheme } from "styled-components";

import Router from "next/router";

type Props = {
  serverStep: number;
  steps: FormStep[];
  profile?: Profile;
};

const FormStepper: React.FunctionComponent<Props> = props => {
  const { steps, serverStep, profile } = props;

  const CurrentStep = steps[serverStep].component;

  return (
    <Wrapper>
      <FormHeader>
        <FormHeaderContainer>
          {steps.map((step, i) => (
            <FormHeaderStep
              key={i}
              onClick={() => Router.push(`/dashboard/${step.slug}`)}
              active={i == serverStep}
            >
              {step.title}
            </FormHeaderStep>
          ))}
        </FormHeaderContainer>
      </FormHeader>
      <StepBackground>
        <Container>
          <CurrentStep profile={profile} />
        </Container>
      </StepBackground>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0;
`;

const FormHeaderContainer = styled(Container)`
  display: flex;
  flex-direction: row;
`;

const FormHeader = styled.div`
  display: flex;
`;

type FormHeaderStepProps = {
  active: Boolean;
  theme: DefaultTheme;
};

const FormHeaderStep = styled.div`
  flex-grow: 1;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 4px solid
    ${(props: FormHeaderStepProps) =>
      props.active ? props.theme.colors.magenta : "transparent"};
  font-weight: 600;
  cursor: pointer;
  color: ${(props: FormHeaderStepProps) =>
    props.active ? props.theme.colors.black : props.theme.colors.gray25};
`;

const StepBackground = styled.div`
  background-color: #f6f6f6;
  padding: 60px 0;
`;

export default FormStepper;
