import React, { useState, useRef } from "react";
import styled from "styled-components";

import {
  Flex,
  Column,
  Button,
  Form,
  FormGroup,
  RadioChoice,
  RadioChoiceLabel
} from "../../styles";

import Select from "../Select";

import jsonToFormData from "../../lib/jsonToFormData";

type Props = {
  profile: Profile;
};

// Used for select inputs
const travelOptions = [
  { label: "Driving", value: "driving" },
  { label: "HackSC Bus", value: "bus" },
  { label: "Flying", value: "flying" },
  { label: "USC Student (N/A)", value: "usc" },
  { label: "Other", value: "other" }
];

const shirtSizeOptions = [
  { label: "X-Small", value: "xs" },
  { label: "Small", value: "s" },
  { label: "Medium", value: "m" },
  { label: "Large", value: "l" },
  { label: "X-Large", value: "xl" }
];

const Accepted: React.FunctionComponent<Props> = props => {
  const [travelMethod, setTravelMethod] = useState(null);
  const [travelFile, setTravelFile] = useState(null);

  const formRefs = {
    travelMethod: useRef(null),
    travelOrigin: useRef(null),
    travelPlan: useRef(null),
    shirtSize: useRef(null),
    dietaryRestrictions: {
      vegetarian: useRef(null),
      vegan: useRef(null),
      halal: useRef(null),
      kosher: useRef(null),
      nutAllergy: useRef(null),
      lactoseIntolerant: useRef(null),
      glutenFree: useRef(null),
      other: useRef(null)
    },
    codeOfConduct: useRef(null)
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const {
      travelMethod,
      travelOrigin,
      travelPlan,
      shirtSize,
      dietaryRestrictions,
      codeOfConduct
    } = formRefs;

    const reqBody = {
      travelMethod: travelMethod.current && travelMethod.current.value,
      travelOrigin: travelOrigin.current && travelOrigin.current.value,
      travelPlan: travelPlan.current && travelPlan.current.files[0],
      codeOfConduct: codeOfConduct.current && codeOfConduct.current.value,
      shirtSize: shirtSize.current && shirtSize.current.value,
      dietaryRestrictions: {
        vegetarian:
          dietaryRestrictions.vegetarian.current &&
          dietaryRestrictions.vegetarian.current.checked,
        vegan:
          dietaryRestrictions.vegan.current &&
          dietaryRestrictions.vegan.current.checked,
        halal:
          dietaryRestrictions.halal.current &&
          dietaryRestrictions.halal.current.checked,
        kosher:
          dietaryRestrictions.kosher.current &&
          dietaryRestrictions.kosher.current.checked,
        nutAllergy:
          dietaryRestrictions.nutAllergy.current &&
          dietaryRestrictions.nutAllergy.current.checked,
        lactoseIntolerant:
          dietaryRestrictions.lactoseIntolerant.current &&
          dietaryRestrictions.lactoseIntolerant.current.checked,
        glutenFree:
          dietaryRestrictions.glutenFree.current &&
          dietaryRestrictions.glutenFree.current.checked,
        other:
          dietaryRestrictions.other.current &&
          dietaryRestrictions.other.current.checked
      }
    };

    const formData = jsonToFormData(reqBody);
    await fetch("/api/profile/confirm", {
      method: "POST",
      body: formData
    });
    alert("Submitted");
  };

  return (
    <Flex direction="column">
      <FormSection>
        <h1>HackSC 2020 Status</h1>

        <p>
          Congratulations, we are excited to inform you that we have opened up a
          spot for you to attend HackSC 2020. We are excited to bring back
          HackSC to USC's campus and hope you can attend.
        </p>

        <br />

        <p>
          If you plan on attending, please fill out the following form by{" "}
          <b>January 1st, 2020</b> to confirm your attendance.
        </p>

        <DeclineBanner>
          <Flex direction="row" align="center">
            <span>
              If you cannot make it to HackSC 2020, let us know by declining
              your acceptance
            </span>
            <DecideButton>Decline</DecideButton>
          </Flex>
        </DeclineBanner>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label>How do you plan on getting to USC?</label>

            <Select
              name="travel-method"
              options={travelOptions}
              onChange={e => setTravelMethod(e.target.value)}
              ref={formRefs.travelMethod}
              required
            />
          </FormGroup>

          {// Require users upload a document to show how they will get to USC
          travelMethod !== null && travelMethod !== "usc" && (
            <FormGroup>
              <label>Where are you traveling from?</label>

              <input
                type="text"
                placeholder="Mars"
                name="travel-origin"
                ref={formRefs.travelOrigin}
                required
              />
            </FormGroup>
          )}

          <FormGroup>
            <p>
              If you are traveling from outside LA, please upload your itinerary
              (plane, train, etc.) or a document/screenshot with the route you
              intend to take (bus route, driving route).{" "}
              <b>This is required.</b>
            </p>

            <TravelPlanUploadInput
              type="file"
              name="travel-plan"
              id="travel-plan"
              ref={formRefs.travelPlan}
              onChange={e => setTravelFile(e.target.files[0])}
            />
            <TravelPlanUploadButton
              htmlFor="travel-plan"
              outline={travelFile !== null}
            >
              {travelFile
                ? "Select Another File"
                : "Upload Your Proof of Travel Plans"}
            </TravelPlanUploadButton>

            <TravelPlanLabel>
              {travelFile && "Selected '" + travelFile.name + "'"}
            </TravelPlanLabel>
          </FormGroup>

          <FormGroup>
            <label>T-shirt Size (Unisex)</label>

            <Select
              name="shirt-size"
              options={shirtSizeOptions}
              required
              ref={formRefs.shirtSize}
            />
          </FormGroup>

          <FormGroup>
            <label>Dietary Restrictions (select all that apply)</label>

            <Flex justify="space-between" tabletVertical>
              <Column flexBasis={49}>
                <RadioChoice>
                  <input
                    type="checkbox"
                    name="diet-vegetarian"
                    value="vegetarian"
                    ref={formRefs.dietaryRestrictions.vegetarian}
                  />
                  <RadioChoiceLabel>Vegetarian</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="checkbox"
                    name="diet-vegan"
                    value="vegan"
                    ref={formRefs.dietaryRestrictions.vegan}
                  />
                  <RadioChoiceLabel>Vegan</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="checkbox"
                    name="diet-halal"
                    value="halal"
                    ref={formRefs.dietaryRestrictions.halal}
                  />
                  <RadioChoiceLabel>Halal</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="checkbox"
                    name="diet-kosher"
                    value="kosher"
                    ref={formRefs.dietaryRestrictions.kosher}
                  />
                  <RadioChoiceLabel>Kosher</RadioChoiceLabel>
                </RadioChoice>
              </Column>

              <Column flexBasis={49}>
                <RadioChoice>
                  <input
                    type="checkbox"
                    name="diet-nut-allergy"
                    value="nut-allergy"
                    ref={formRefs.dietaryRestrictions.nutAllergy}
                  />
                  <RadioChoiceLabel>Nut Allergy</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="checkbox"
                    name="diet-lactose-intolerant"
                    value="lactose-intolerant"
                    ref={formRefs.dietaryRestrictions.lactoseIntolerant}
                  />
                  <RadioChoiceLabel>Lactose Intolerant</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input
                    type="checkbox"
                    name="diet-gluten-free"
                    value="gluten-free"
                    ref={formRefs.dietaryRestrictions.glutenFree}
                  />
                  <RadioChoiceLabel>Gluten Free</RadioChoiceLabel>
                </RadioChoice>

                <RadioChoice>
                  <input type="checkbox" name="diet-other" value="other" />
                  <RadioChoiceLabel>Other</RadioChoiceLabel>
                </RadioChoice>
              </Column>
            </Flex>
          </FormGroup>

          <FormGroup>
            <label>Code of Conduct</label>

            <RadioChoice>
              <input
                type="checkbox"
                name="code-of-conduct"
                required
                id="code-of-conduct"
                ref={formRefs.codeOfConduct}
              />
              <RadioChoiceLabel htmlFor="code-of-conduct">
                I agree to the{" "}
                <a
                  href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                  target="_blank"
                >
                  MLH Code of Conduct
                </a>
              </RadioChoiceLabel>
            </RadioChoice>
          </FormGroup>

          <FormGroup>
            <Button type="submit">Submit</Button>
          </FormGroup>
        </Form>
      </FormSection>
    </Flex>
  );
};

const FormSection = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 48px;
  margin-bottom: 64px;

  #blob {
    text-align: center;
    margin-top: 16px;

    ${({ theme }) =>
      theme.media.mobile`
      display: none;
    `}
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const DeclineBanner = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.peach};
  margin: 16px 0;

  span {
    flex-grow: 1;
    color: ${({ theme }) => theme.colors.gray50};
  }
`;

const TravelPlanUploadInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const TravelPlanUploadButton = styled.label<any>`
  padding: 12px 16px;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.peach};
  flex-grow: 1;
  font-size: ${({ theme }) => theme.fontSizes.regular};
  color: #ffffff;
  font-weight: 600;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  margin-top: 12px;

  &:hover {
    opacity: 0.8;
  }

  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
    `}

  ${({ outline, theme }) =>
    outline &&
    `
      background: transparent;
      border: 2px solid ${theme.colors.peach};
      color: ${theme.colors.peach};
    `}
`;

const TravelPlanLabel = styled.p`
  color: ${({ theme }) => theme.colors.gray50};
`;

const DecideButton = styled(Button)`
  max-width: 300px;
  flex-shrink: 1;
`;

export default Accepted;
