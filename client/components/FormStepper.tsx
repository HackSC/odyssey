import * as React from "react";
import { ContentBlockWide } from "../styles";
import styled from "styled-components";

type Props = {
  serverStep: number;
  steps: FormStep[];
};

const FormStepper: React.FunctionComponent<Props> = props => {
  const { steps, serverStep } = props;

  const [currentStep, setCurrentStep] = React.useState(serverStep);
  return (
    <ContentBlockWide>
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
      <div>{steps[currentStep].component}</div>
    </ContentBlockWide>
  );
};

const FormHeader = styled.div`
  display: flex;
`;

type FormHeaderStepProps = {
  active: Boolean;
};

const FormHeaderStep = styled.div`
  flex-grow: 1;
  height: 75px;
  background: ${(props: FormHeaderStepProps) =>
    props.active ? "transparent" : "black"};
`;

export default FormStepper;
