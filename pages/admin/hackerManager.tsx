import React, { useRef, useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Redirect from "next/router";
import styled from "styled-components";
import JSZip from "jszip";
import stringify from "csv-stringify";
import { saveAs } from "file-saver";
import PacmanLoader from "react-spinners/PacmanLoader";
import Modal from "../../components/Modal";
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });
import { sendSlackMessage, handleLoginRedirect, getProfile } from "../../lib";
import Schools from "../../assets/data/schools.json";

import {
  Head,
  Navbar,
  Footer,
  Select,
  AutocompleteInput,
} from "../../components";

import {
  Button,
  Background,
  Column,
  Flex,
  Container,
  Form,
  FormGroup,
} from "../../styles";

import {
  liveHackerLookupFetch,
  liveLookupFetch,
} from "../../lib/api-sdk/liveHooks";

const Hacker = ({ result, resumeList, resetResults }) => {
  const [hasResume, setHasResume] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const profilePopupRef = useRef(null);

  const viewProfile = () => {
    setPopupVisible(true);
  };

  const downloadResume = async () => {
    Redirect.push(
      `https://hacksc-odyssey.s3-us-west-1.amazonaws.com/${result.userId}`,
      null
    );
  };

  useEffect(() => {
    const resume_reduce = resumeList.reduce((acc, val) => {
      let item = val && val[1] ? val[1] : {};
      if (item && item.Key)
        return acc + (item.Key.includes(result.userId) ? 1 : 0);
      else return acc;
    }, 0);

    if (resume_reduce) setHasResume(true);
    else setHasResume(false);
  }, []);

  const CloseButton = (
    <FullButton onClick={() => setPopupVisible(false)}>Close</FullButton>
  );

  return (
    <Result key={result.userId}>
      <Flex
        direction="row"
        style={{ paddingTop: "1rem", flexWrap: "wrap" }}
        justify="space-between"
      >
        <Column flexBasis={49} style={{ margin: "1rem 0" }}>
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
            <b>Year: </b>
            {result.year}
          </p>
          <p>
            <b>Graduation Date: </b>
            {result.graduationDate}
          </p>
          <p>
            <b>Needs Bus: </b>
            {result.needBus ? "True" : "False"}
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
            <b>Role: </b>
            {result.role}
          </p>
          <p>
            <b>
              {result.qrCodeId === null
                ? "No QR code"
                : `Has a QR code (${result.qrCodeId})`}
            </b>
          </p>
        </Column>
        <Column flexBasis={49} style={{ margin: "1rem 0" }}>
          <FullButton style={{ margin: "0 0 0.5rem 0" }} onClick={viewProfile}>
            View Full Profile
          </FullButton>
          {hasResume ? (
            <FullButton
              style={{ margin: "0.5rem 0 0 0" }}
              onClick={downloadResume}
            >
              Download Resume
            </FullButton>
          ) : (
            <p>User has not uploaded a resume</p>
          )}
        </Column>
      </Flex>
      <Modal visible={popupVisible} header={CloseButton} footer={CloseButton}>
        <ReactJson src={result} />
      </Modal>
    </Result>
  );
};

const genderOptions = [
  { label: "All", value: "all" },
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Non-Binary", value: "non-binary" },
  { label: "Other", value: "other" },
  { label: "Prefer not to say", value: "no-say" },
];

const ethnicityOptions = [
  { label: "All", value: "all" },
  { label: "Native American or Alaskan Native", value: "american-indian" },
  { label: "Asian / Pacific Islander", value: "asian" },
  { label: "Black or African American", value: "black" },
  { label: "Hispanic", value: "hispanic" },
  { label: "White / Caucasian", value: "caucasian" },
  { label: "Mixed / Other", value: "mixed-other" },
  { label: "Prefer not to answer", value: "no-say" },
];

const roleOptions = [
  { label: "All", value: "all" },
  { label: "Hacker", value: "hacker" },
  { label: "Admin", value: "admin" },
  { label: "Sponsor", value: "sponsor" },
  { label: "Volunteer", value: "volunteer" },
];

const yearOptions = [
  { label: "All", value: "all" },
  { label: "Freshman", value: "freshman" },
  { label: "Sophomore", value: "sophomore" },
  { label: "Junior", value: "junior" },
  { label: "Senior", value: "senior" },
  { label: "Graduate", value: "graduate" },
];

const gradDateOptions = [
  { label: "All", value: "all" },
  { label: "Spring 2020", value: "spring-2020" },
  { label: "Fall 2020", value: "fall-2020" },
  { label: "Spring 2021", value: "spring-2021" },
  { label: "Fall 2021", value: "fall-2021" },
  { label: "Spring 2022", value: "spring-2022" },
  { label: "Fall 2022", value: "fall-2022" },
  { label: "Spring 2023", value: "spring-2023" },
  { label: "Fall 2023", value: "fall-2023" },
  { label: "Other", value: "other" },
];

const needBusOptions = [
  { label: "All", value: "all" },
  { label: "False", value: "False" },
  { label: "True", value: "True" },
];

const hackerManager = ({ profile }) => {
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
    graduationDateInput,
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
    useRef(null),
  ];

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const [resumeList, setResumeList] = useState([]);
  const [fetch_called, setFetchCalled] = useState(false);

  const getResumeList = async () => {
    setFetchCalled(true);
    let resume_result = await fetch("/api/profile/resume-list", {
      method: "GET",
    });

    if (resume_result.status === 200) {
      let resumes = await resume_result.json();
      setResumeList(Object.entries(resumes.files));
    } else setResumeList([]);
  };

  useEffect(() => {
    if (!fetch_called) getResumeList();
  }, []);

  const exportHackerCSV = async function () {
    setMessage("Generating Hacker CSVs");

    let zip = new JSZip();

    try {
      let csvs = await genHackerCSV();
      let data = csvs[0].join("");
      zip.file("hackers.csv", data);
      let firstName = profile ? profile.firstName : "";
      let lastName = profile ? profile.lastName : "";
      let user_email = profile ? profile.email : "";
      let start_and_end_date =
        new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
      let slack_result = await sendSlackMessage(
        ":file_folder: Hacker CSV exported (/admin/hackerManager) by " +
          firstName +
          ", " +
          lastName +
          ", " +
          user_email,
        "Number hackers exported: " + (csvs[0].length - 1),
        start_and_end_date,
        start_and_end_date
      );
    } catch (err) {
      setMessage(err.message);
      return;
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "hacker_data.zip");
      setMessage("");
    });
  };

  const genHackerCSV = async (): Promise<Array<Array<String>>> => {
    return new Promise(function (resolve, reject) {
      let promises = [];
      promises.push(
        new Promise(function (resolve, reject) {
          let data = [];
          let stringifier = stringify({
            delimiter: ",",
          });
          stringifier.on("readable", function () {
            let row;
            while ((row = stringifier.read())) {
              data.push(row);
            }
          });
          stringifier.on("error", function (err) {
            reject(new Error(err.message));
          });
          let headers = [
            "firstName",
            "lastName",
            "email",
            "gender",
            "ethnicity",
            "needBus",
            "status",
            "role",
            "school",
            "year",
            "graduationDate",
          ];
          stringifier.write(headers);
          stringifier.on("finish", function () {
            resolve(data);
          });

          for (let i = 0; i < results.length; i++) {
            let hacker = results[i];
            let line = [];
            for (let j = 0; j < headers.length; j++) {
              line.push(hacker[headers[j]]);
            }
            stringifier.write(line);
          }
          stringifier.end();
        })
      );

      // return all csvs
      Promise.all(promises).then(resolve).catch(reject);
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

  const lookupHackers = async (e) => {
    e.preventDefault();
    setLoading(true);

    const firstName = firstNameInput.current.value;
    const lastName = lastNameInput.current.value;
    const email = emailInput.current.value;
    const gender = genderInput.current.value;
    const ethnicity = ethnicityInput.current.value;
    // * I am so sorry for this disgusting nested turnary operator... I'm lazy
    const needBus =
      needBusInput.current.value == "all"
        ? "all"
        : needBusInput.current.value == "False"
        ? "0"
        : "1";
    const status = statusInput.current.value;
    const role = roleInput.current.value;
    const school = schoolInput.current.value;
    const year = yearInput.current.value;
    const graduationDate = graduationDateInput.current.value;

    const lookupResponse = await liveHackerLookupFetch({
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
      graduationDate,
    });

    const profiles = lookupResponse.success;
    setLoading(false);
    setResults(profiles);
  };

  const showAllHackers = async (e) => {
    e.preventDefault();
    setLoading(true);

    const firstName = "";
    const lastName = "";
    const email = "";

    const lookupResponse = await liveLookupFetch({
      firstName,
      lastName,
      email,
    });

    const profiles = lookupResponse.success;
    setLoading(false);
    setResults(profiles);
  };

  const renderHackers = useMemo(() => {
    return (
      <Results>
        {results.map((result) => (
          <Hacker
            key={Object.entries(result).join()}
            result={result}
            resumeList={resumeList}
            resetResults={resetResults}
          />
        ))}
      </Results>
    );
  }, [results]);

  return (
    <>
      <Head title="HackSC Odyssey - Check in Hackers" />
      <Navbar loggedIn admin activePage="/hackerManager" />
      <Background padding="2rem">
        <Container>
          <Flex direction="column">
            <h1>Filter Hackers and Export to CSV</h1>
            <Form>
              <Flex
                direction="row"
                style={{ flexWrap: "wrap" }}
                justify="space-between"
              >
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

              <Flex
                direction="row"
                style={{ flexWrap: "wrap" }}
                justify="space-between"
              >
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

              <Flex
                direction="row"
                style={{ flexWrap: "wrap" }}
                justify="space-between"
              >
                <Column flexBasis={49}>
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
                </Column>
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Needs Bus</label>
                    <Select
                      name="need-bus"
                      options={needBusOptions}
                      defaultValue={""}
                      disabled={false}
                      ref={needBusInput}
                    />
                  </FormGroup>
                </Column>
              </Flex>

              <Flex
                direction="row"
                style={{ flexWrap: "wrap" }}
                justify="space-between"
              >
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Year</label>
                    <Select
                      name="year"
                      options={yearOptions}
                      defaultValue={""}
                      ref={yearInput}
                    />
                  </FormGroup>
                </Column>
                <Column flexBasis={49}>
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
                </Column>
              </Flex>

              <Flex
                direction="row"
                style={{ flexWrap: "wrap" }}
                justify="space-between"
              >
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Gender</label>
                    <Select
                      name="gender"
                      options={genderOptions}
                      ref={genderInput}
                    />
                  </FormGroup>
                </Column>

                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Ethnicity</label>
                    <Select
                      name="gender"
                      options={ethnicityOptions}
                      ref={ethnicityInput}
                    />
                  </FormGroup>
                </Column>
              </Flex>

              <Flex
                direction="row"
                style={{ paddingTop: "1rem", flexWrap: "wrap" }}
                justify="space-between"
              >
                <Column flexBasis={49} style={{ margin: "1rem 0" }}>
                  <FullButton onClick={lookupHackers}>
                    Filter Hackers
                  </FullButton>
                </Column>

                <Column flexBasis={49} style={{ margin: "1rem 0" }}>
                  <FullButton onClick={showAllHackers}>
                    Show All Hackers
                  </FullButton>
                </Column>
              </Flex>
            </Form>
          </Flex>

          <Flex
            direction="row"
            style={{ paddingTop: "1rem", flexWrap: "wrap" }}
            justify="space-between"
          >
            {results && results.length > 0 ? (
              <FullButton onClick={exportHackerCSV}>
                Export Results to CSV
              </FullButton>
            ) : (
              ""
            )}
          </Flex>

          {loading ? (
            <PaddedFlex>
              <PacmanLoader size={20} color={"#FF8379"} />
            </PaddedFlex>
          ) : (
            renderHackers
          )}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

hackerManager.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins/sponsors
  if (!profile || !(profile.role == "admin" || profile.role == "sponsor")) {
    handleLoginRedirect(req);
  }

  return {
    profile,
  };
};

const PaddedFlex = styled(Flex)`
  margin: auto;
  display: flex;
  min-height: 3rem;
  justify-content: center;
  padding: 3rem;
`;

const PaddedButton = styled(Flex)`
  padding: 18px 0;
  padding-left: 5px;
  justify-content: flex-end;
`;

const FullButton = styled(Button)`
  width: -webkit-fill-available;
`;

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
