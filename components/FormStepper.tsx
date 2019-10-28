import * as React from "react";
import { Container, Panel } from "../styles";
import styled, { DefaultTheme } from "styled-components";

type Props = {
  serverStep: number;
  steps: FormStep[];
  user?: Object;
};

const FormStepper: React.FunctionComponent<Props> = props => {
  const { steps, serverStep, user } = props;

  const [currentStep, setCurrentStep] = React.useState(serverStep);

  const CurrentStep = steps[currentStep].component;

  return (
    <Wrapper>
      <Container>
        <FormHeader>
          {steps.map((step, i) => (
            <FormHeaderStep
              key={i}
              onClick={() => setCurrentStep(i)}
              active={i == currentStep}
            >
              {step.title}
            </FormHeaderStep>
          ))}
        </FormHeader>
        <Panel>
          <CurrentStep user={user} />
        </Panel>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 32px 0 64px;
`;

const FormHeader = styled.div`
  display: flex;
  margin-bottom: 24px;
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

export default FormStepper;
