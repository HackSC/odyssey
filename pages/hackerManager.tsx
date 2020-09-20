import React, { useRef, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import Schools from "../assets/data/schools.json";

import { Head, Navbar, Footer, Select, AutocompleteInput } from "../components";

import {
  Button,
  Background,
  Column,
  Flex,
  Container,
  Form,
  FormGroup,
  RadioChoice,
  RadioChoiceLabel
} from "../styles";

import {
  liveAssignQRFetch,
  liveLookupFetch,
  liveDispatchFetch
} from "../lib/api-sdk/liveHooks";
import Countdown from "react-countdown";

const Hacker = ({ result, resetResults }) => {
  return (
    <Result key={result.userId}>
      <h2>
        {result.firstName} {result.lastName}
      </h2>
      <p>
        <b>E-Mail: </b>
        {result.email}
      </p>
      <p>
        <b>School: </b>
        {result.school}
      </p>
      <p>
        <b>Gender: </b>
        {result.gender}
      </p>
      <p>
        <b>Ethnicity: </b>
        {result.ethnicity}
      </p>
      <p>
        <b>Status: </b>
        {result.status}
      </p>
      <p>
        <b>
          {result.qrCodeId === null
            ? "No QR code"
            : `Has a QR code (${result.qrCodeId})`}
        </b>
      </p>
    </Result>
  );
};

const hackerManager = () => {
  const [
    firstNameInput,
    lastNameInput,
    emailInput,
    roleInput,
    statusInput,
    genderInput,
    ethnicityInput,
    needBusInput,
    schoolInput,
    yearInput,
    graduationDateInput
  ] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);

  const exportHackerCSV = async function() {
    setMessage("Generating Hacker CSVs");

    let zip = new JSZip();

    try {
      let headers = ["Project Name", "Table", "Points", "Comments"];
      let values = ["submissionTitle", "table"];
      for (let i = 0; i < results.length; i++) {
        let hacker = results[i];
        let filters = {
          desiredPrizes: hacker
        };
      }
      let csvs = await genHackerCSV(headers, values, filters);
      let data = csvs[0].join("");
      zip.file("hackers.csv", data);
    } catch (err) {
      setMessage(err.message);
      return;
    }

    zip.generateAsync({ type: "blob" }).then(function(content) {
      saveAs(content, "sponsors_data.zip");
      setMessage("");
    });
  };

  const genHackerCSV = async function(
    header,
    values,
    filters = {},
    split = 1
  ): Promise<Array<Array<String>>> {
    return new Promise(function(resolve, reject) {
      let promises = [];
      split = split < 1 ? 1 : split;
      for (let splitCount = 0; splitCount < split; splitCount++) {
        promises.push(
          new Promise(function(resolve, reject) {
            let data = [];
            let stringifier = stringify({
              delimiter: ","
            });
            stringifier.on("readable", function() {
              let row;
              while ((row = stringifier.read())) {
                data.push(row);
              }
            });
            stringifier.on("error", function(err) {
              reject(new Error(err.message));
            });
            stringifier.write(header);
            stringifier.on("finish", function() {
              resolve(data);
            });
            // read projects sorry hella ugly
            let projectCount = 0;
            for (let i = 0; i < projects.length; i++) {
              let project = projects[i];
              let passFilter = true;
              Object.entries(filters).forEach(([key, value]) => {
                if (Array.isArray(project[key])) {
                  if (!project[key].includes(value)) {
                    passFilter = false;
                  }
                } else if (project[key] != value) {
                  passFilter = false;
                }
              });
              if (passFilter) {
                projectCount++;
                let passSplit = false;
                if (projectCount % split === splitCount) {
                  passSplit = true;
                }
                if (passSplit) {
                  let line = [];
                  for (let j = 0; j < values.length; j++) {
                    let value = values[j].split(".");
                    if (value.length > 1) {
                      line.push(project[value[0]][value[1]]);
                    } else {
                      line.push(project[value[0]]);
                    }
                  }
                  stringifier.write(line);
                }
              }
            }
            stringifier.end();
          })
        );
      }

      // return all csvs
      Promise.all(promises)
        .then(resolve)
        .catch(reject);
    });
  };

  const resetResults = () => {
    setResults([]);
    firstNameInput.current.value = "";
    lastNameInput.current.value = "";
    emailInput.current.value = "";
    genderInput.current.value = "";
    ethnicityInput.current.value = "";
    needBusInput.current.value = "";
    statusInput.current.value = "";
    roleInput.current.value = "";
    schoolInput.current.value = "";
    yearInput.current.value = "";
    graduationDateInput.current.value = "";
  };

  const lookupHackers = async e => {
    e.preventDefault();

    const firstName = firstNameInput.current.value;
    const lastName = lastNameInput.current.value;
    const email = emailInput.current.value;
    const gender = genderInput.current.value;
    const ethnicity = ethnicityInput.current.value;
    const needBus = needBusInput.current.value;
    const status = statusInput.current.value;
    const role = roleInput.current.value;
    const school = schoolInput.current.value;
    const year = yearInput.current.value;
    const graduationDate = graduationDateInput.current.value;

    console.log(
      firstName,
      lastName,
      email,
      gender,
      ethnicity,
      needBus,
      status,
      role,
      school,
      year,
      graduationDate
    );

    const lookupResponse = await liveLookupFetch({
      firstName,
      lastName,
      email,
      gender,
      ethnicity,
      needBus,
      status,
      role,
      school,
      year,
      graduationDate
    });

    const profiles = lookupResponse.success;
    setResults(profiles);
  };

  const showAllHackers = async e => {
    e.preventDefault();

    const firstName = null;
    const lastName = null;
    const email = null;

    const lookupResponse = await liveLookupFetch({
      firstName,
      lastName,
      email
    });

    const profiles = lookupResponse.success;
    setResults(profiles);
  };

  const renderHackers = useMemo(() => {
    return (
      <Results>
        {results.map(result => (
          <Hacker result={result} resetResults={resetResults} />
        ))}
      </Results>
    );
  }, [results]);

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "non-binary" },
    { label: "Other", value: "other" },
    { label: "Prefer not to say", value: "no-say" }
  ];

  const roleOptions = [
    { label: "Hacker", value: "hacker" },
    { label: "Admin", value: "admin" },
    { label: "Sponsor", value: "sponsor" },
    { label: "Volunteer", value: "volunteer" }
  ];

  const yearOptions = [
    { label: "Freshman", value: "freshman" },
    { label: "Sophomore", value: "sophomore" },
    { label: "Junior", value: "junior" },
    { label: "Senior", value: "senior" },
    { label: "Graduate", value: "graduate" }
  ];

  const gradDateOptions = [
    { label: "Spring 2020", value: "spring-2020" },
    { label: "Fall 2020", value: "fall-2020" },
    { label: "Spring 2021", value: "spring-2021" },
    { label: "Fall 2021", value: "fall-2021" },
    { label: "Spring 2022", value: "spring-2022" },
    { label: "Fall 2022", value: "fall-2022" },
    { label: "Spring 2023", value: "spring-2023" },
    { label: "Fall 2023", value: "fall-2023" },
    { label: "Other", value: "other" }
  ];

  return (
    <>
      <Head title="HackSC Odyssey - Check in Hackers" />
      <Navbar loggedIn admin activePage="/" />
      <Background>
        <Container>
          <Flex direction="column">
            <h1>Assign Hackers QR Codes for Check In</h1>
            <Form>
              <Flex direction="row" justify="space-between">
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>First Name</label>
                    <input type="text" ref={firstNameInput} />
                  </FormGroup>
                </Column>

                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Last Name</label>
                    <input type="text" ref={lastNameInput} />
                  </FormGroup>
                </Column>
              </Flex>

              <FormGroup>
                <label>E-mail</label>
                <input type="email" ref={emailInput} />
              </FormGroup>

              <Flex direction="row" justify="space-between">
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Status</label>
                    <input type="text" ref={statusInput} />
                  </FormGroup>
                </Column>
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Role</label>
                    <Select
                      name="gender"
                      options={roleOptions}
                      defaultValue="no-say"
                      ref={roleInput}
                    />
                  </FormGroup>
                </Column>
              </Flex>

              <FormGroup>
                <label>School</label>

                <AutocompleteInput
                  placeholder="Your School"
                  name="school"
                  ref={schoolInput}
                  defaultValue={""}
                  maxLength={255}
                  suggestions={Schools}
                />
              </FormGroup>

              <FormGroup>
                <label>Year</label>
                <Select
                  name="year"
                  options={yearOptions}
                  defaultValue={""}
                  ref={yearInput}
                />
              </FormGroup>

              <FormGroup>
                <label>Graduation Date</label>
                <Select
                  name="graduation-date"
                  options={gradDateOptions}
                  defaultValue={""}
                  disabled={false}
                  ref={graduationDateInput}
                />
              </FormGroup>

              <Flex direction="row" justify="space-between">
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Gender</label>
                    <Select
                      name="gender"
                      options={genderOptions}
                      defaultValue="no-say"
                      ref={genderInput}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label>Gender</label>
                    <RadioChoice>
                      <input
                        type="checkbox"
                        name="need-bus"
                        id="need-bus"
                        defaultChecked={false}
                        ref={needBusInput}
                      />
                      <RadioChoiceLabel htmlFor="need-bus">
                        Yes, I need bus transportation
                      </RadioChoiceLabel>
                    </RadioChoice>
                  </FormGroup>
                </Column>

                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Ethnicity</label>
                    <Flex justify="space-between" tabletVertical>
                      <Column flexBasis={49}>
                        <RadioChoice>
                          <input
                            type="radio"
                            name="ethnicity"
                            value="american-indian"
                            id="ethnicity-american-indian"
                            defaultChecked={false}
                            ref={ethnicityInput}
                          />
                          <RadioChoiceLabel htmlFor="ethnicity-american-indian">
                            Native American or Alaskan Native
                          </RadioChoiceLabel>
                        </RadioChoice>

                        <RadioChoice>
                          <input
                            type="radio"
                            name="ethnicity"
                            value="asian"
                            id="ethnicity-asian"
                            defaultChecked={false}
                            ref={ethnicityInput}
                          />
                          <RadioChoiceLabel htmlFor="ethnicity-asian">
                            Asian / Pacific Islander
                          </RadioChoiceLabel>
                        </RadioChoice>

                        <RadioChoice>
                          <input
                            type="radio"
                            name="ethnicity"
                            value="black"
                            id="ethnicity-black"
                            defaultChecked={false}
                            ref={ethnicityInput}
                          />
                          <RadioChoiceLabel htmlFor="ethnicity-black">
                            Black or African American
                          </RadioChoiceLabel>
                        </RadioChoice>

                        <RadioChoice>
                          <input
                            type="radio"
                            name="ethnicity"
                            value="hispanic"
                            id="ethnicity-hispanic"
                            defaultChecked={false}
                            ref={ethnicityInput}
                          />
                          <RadioChoiceLabel htmlFor="ethnicity-hispanic">
                            Hispanic
                          </RadioChoiceLabel>
                        </RadioChoice>
                      </Column>

                      <Column flexBasis={49}>
                        <RadioChoice>
                          <input
                            type="radio"
                            name="ethnicity"
                            value="caucasian"
                            id="ethnicity-caucasian"
                            defaultChecked={false}
                            ref={ethnicityInput}
                          />
                          <RadioChoiceLabel htmlFor="ethnicity-caucasian">
                            White / Caucasian
                          </RadioChoiceLabel>
                        </RadioChoice>

                        <RadioChoice>
                          <input
                            type="radio"
                            name="ethnicity"
                            value="mixed-other"
                            id="ethnicity-mixed-other"
                            defaultChecked={false}
                            ref={ethnicityInput}
                          />
                          <RadioChoiceLabel htmlFor="ethnicity-mixed-other">
                            Mixed / Other
                          </RadioChoiceLabel>
                        </RadioChoice>

                        <RadioChoice>
                          <input
                            type="radio"
                            name="ethnicity"
                            value="no-say"
                            id="ethnicity-no-say"
                            defaultChecked={false}
                            ref={ethnicityInput}
                          />
                          <RadioChoiceLabel htmlFor="ethnicity-no-say">
                            Prefer not to answer
                          </RadioChoiceLabel>
                        </RadioChoice>
                      </Column>
                    </Flex>
                  </FormGroup>
                </Column>
              </Flex>

              <Flex direction="row" justify="space-between">
                <Column flexBasis={49}>
                  <Button onClick={lookupHackers}>Look Up Hackers</Button>
                </Column>

                <Column flexBasis={49}>
                  <Button onClick={showAllHackers}>Show All Hackers</Button>
                </Column>
              </Flex>
            </Form>
          </Flex>

          {renderHackers}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

hackerManager.getInitialProps = async ctx => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || !(profile.role == "admin" || profile.role == "volunteer")) {
    handleLoginRedirect(req);
  }

  return {
    profile
  };
};

const Results = styled.div`
  padding: 18px 0;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Result = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 6px;
  margin-bottom: 12px;
  padding: 18px;
  box-sizing: border-box;

  input[type="text"] {
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    padding: 12px 16px;
    font-weight: 300;
    color: ${({ theme }) => theme.colors.black};
    font-size: 16px;
    flex-grow: 1;
    margin-right: 16px;
    text-transform: uppercase;
  }
`;

export default hackerManager;
