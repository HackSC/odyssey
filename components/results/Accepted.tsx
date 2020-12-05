import React, { useState, useRef } from "react";
import styled from "styled-components";
import Router from "next/router";

import {
  Flex,
  Column,
  Button,
  Form,
  FormGroup,
  RadioChoice,
  RadioChoiceLabel,
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
  { label: "Other", value: "other" },
];

const shirtSizeOptions = [
  { label: "X-Small", value: "xs" },
  { label: "Small", value: "s" },
  { label: "Medium", value: "m" },
  { label: "Large", value: "l" },
  { label: "X-Large", value: "xl" },
];

const Accepted: React.FunctionComponent<Props> = (props) => {
  const [travelMethod, setTravelMethod] = useState(null);
  const [travelFile, setTravelFile] = useState(null);

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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
      other: useRef(null),
    },
    codeOfConduct: useRef(null),
    noBusCheck: useRef(null),
  };

  const checkFile = (e) => {
    const { travelPlan } = formRefs;

    if (travelPlan.current && !travelPlan.current.files[0]) {
      setError(
        "Missing your proof of travel plans, please select a file to upload"
      );
      e.preventDefault();
      return;
    }

    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) {
      return;
    }

    const {
      travelMethod,
      travelOrigin,
      travelPlan,
      shirtSize,
      dietaryRestrictions,
      codeOfConduct,
      noBusCheck,
    } = formRefs;

    const reqBody = {
      travelMethod: travelMethod.current && travelMethod.current.value,
      travelOrigin: travelOrigin.current && travelOrigin.current.value,
      travelPlan: travelPlan.current && travelPlan.current.files[0],
      codeOfConduct: codeOfConduct.current && codeOfConduct.current.checked,
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
          dietaryRestrictions.other.current.value,
      },
      noBusCheck: noBusCheck.current && noBusCheck.current.checked,
    };

    const formData = jsonToFormData(reqBody);
    setSubmitting(true);
    const response = await fetch("/api/profile/confirm", {
      method: "POST",
      body: formData,
    });
    setSubmitting(false);

    if (response.status === 200) {
      // Successful confirmation
      await Router.push("/dashboard");
      window.scrollTo(0, 0);
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  const handleDecline = async () => {
    await fetch("/api/profile/decline", {
      method: "POST",
    });

    await Router.push("/dashboard");
    window.scrollTo(0, 0);
  };

  return (
    <Flex direction="column">
      <FormSection>
        <h1>Confirm Your Attendance</h1>

        <p>
          Congratulations, we are excited to inform you that we have opened up a
          spot for you to attend HackSC 2021! We are excited to bring back
          HackSC to USC's campus and hope you can attend.
        </p>

        <br />

        <p>
          If you plan on attending, please fill out the following form by{" "}
          <b>January 1st, 2021</b> to confirm your attendance.
        </p>

        <DeclineBanner>
          <Flex direction="row" align="center">
            <span>
              If you cannot make it to HackSC 2021, let us know by declining
              your acceptance
            </span>
            <DecideButton onClick={handleDecline}>Decline</DecideButton>
          </Flex>
        </DeclineBanner>

        <Form onSubmit={handleSubmit}>
          {/*<FormGroup>
            <label>How do you plan on getting to USC?</label>

            <p>
              Note: we are working on finalizing our bus schedule to California
              schools in SoCal and Bay Area. The final bus schedule is{" "}
              <b>TBA</b>.
            </p>
            <br />
            <Select
              name="travel-method"
              options={travelOptions}
              onChange={(e) => setTravelMethod(e.target.value)}
              ref={formRefs.travelMethod}
              required
            />
          </FormGroup>

          {
            // Quick question
            travelMethod !== null && travelMethod === "bus" && (
              <FormGroup>
                <label>
                  If a bus is not made available to your school, would you still
                  attend HackSC?
                </label>

                <RadioChoice>
                  <input
                    type="checkbox"
                    name="no-bus-check"
                    id="no-bus-check"
                    ref={formRefs.noBusCheck}
                  />
                  <RadioChoiceLabel htmlFor="no-bus-check">
                    Yes, I would still attend HackSC if a bus was not provided
                  </RadioChoiceLabel>
                </RadioChoice>
              </FormGroup>
            )
          }

          <FormGroup>
            <label>What zip code are you traveling from?</label>

            <input
              type="text"
              placeholder="90007"
              name="travel-origin"
              ref={formRefs.travelOrigin}
              maxLength={5}
              minLength={5}
              required
            />
          </FormGroup>

          <FormGroup>
            <p>
              If you are not a USC student and/or are traveling to get to
              HackSC, please upload a document/screenshot showing how you plan
              on getting to USC (ex: train ticket, Google Maps route if you're
              driving, route from location to USC in case a bus isn't provided).
              If you are a USC student, please upload some proof that you attend
              USC or live near campus.{" "}
              <b>
                This is required to verify that you have planned for travel to
                HackSC.
              </b>
            </p>

            <TravelPlanUploadInput
              type="file"
              name="travel-plan"
              id="travel-plan"
              ref={formRefs.travelPlan}
              onChange={(e) => setTravelFile(e.target.files[0])}
              required
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
          </FormGroup>*/}

          <FormGroup>
            <label>T-shirt Size (Unisex)</label>

            <Select
              name="shirt-size"
              options={shirtSizeOptions}
              required
              ref={formRefs.shirtSize}
            />
          </FormGroup>

          {/*<FormGroup>
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

                <OtherDietRestrictions
                  type="text"
                  placeholder="Other"
                  name="diet-other"
                  ref={formRefs.dietaryRestrictions.other}
                  maxLength={150}
                />
              </Column>
            </Flex>
          </FormGroup>*/}

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
            <Button
              type="submit"
              disabled={submitting}
              outline={submitting}
              onClick={checkFile}
            >
              Accept and Confirm Attendance
            </Button>

            {submitting && (
              <StatusText>
                Submitting your confirmation... please wait...
              </StatusText>
            )}

            {error && <StatusText>{error}</StatusText>}
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

const StatusText = styled.p`
  text-align: center;
  margin-top: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray50};
`;

const OtherDietRestrictions = styled.input`
  margin-top: 8px;
`;

export default Accepted;
