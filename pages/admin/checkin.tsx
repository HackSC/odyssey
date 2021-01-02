import React, { useRef, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";
import PacmanLoader from "react-spinners/PacmanLoader";

import { sendSlackMessage, handleLoginRedirect, getProfile } from "../../lib";
import { Head, Navbar, Footer } from "../../components";
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
  liveAssignQRFetch,
  liveLookupFetch,
  liveDispatchFetch,
} from "../../lib/api-sdk/liveHooks";

const CheckinResult = ({ addToast, profile, result, resetResults }) => {
  const qrInput = useRef(null);

  const handleAssignment = async (e) => {
    e.preventDefault();

    const qrInputValue = qrInput.current.value.trim().toUpperCase();

    if (qrInputValue === "") {
      return;
    }

    const confirmation = confirm(
      `Are you sure you want to assign this hacker QR ${qrInputValue} and check them in?`
    );

    if (confirmation) {
      const assignRequest = await liveAssignQRFetch({
        qrCodeId: qrInputValue,
        userId: result.userId,
      });

      if (!assignRequest.error) {
        const checkinRequest = await liveDispatchFetch({
          actionId: "checkin",
          qrCodeId: qrInputValue,
        });

        if (!checkinRequest.error) {
          let firstName = profile ? profile.firstName : "";
          let lastName = profile ? profile.lastName : "";
          let user_email = profile ? profile.email : "";
          let start_and_end_date =
            new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
          let slack_result = await sendSlackMessage(
            ":white_check_mark: Hacker Checkin (/admin/checkin) executed by " +
              firstName +
              ", " +
              lastName +
              ", " +
              user_email,
            "Hacker: " +
              result.firstName +
              ", " +
              result.lastName +
              ", " +
              result.email +
              " checked in with qr code: " +
              qrInputValue +
              "\nHacker Description: " +
              result.school +
              ", " +
              result.ethnicity +
              ", " +
              result.gender +
              ", " +
              result.status,
            start_and_end_date,
            start_and_end_date
          );
          addToast("Successfully assigned hacker QR and checked them in!", {
            appearance: "success",
          });
          resetResults();
        } else {
          addToast(
            "Oh no, something went wrong! Flag down engineering and make them cry!",
            {
              appearance: "error",
            }
          );
        }
      }
    }
  };

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

      <br />

      {result.status === "checkedIn" ? (
        <p>
          <b>Hacker is already checked in!</b>
        </p>
      ) : (
        <Flex direction="row" justify-content="space-between">
          <input type="text" maxLength={4} ref={qrInput}></input>
          <Button onClick={handleAssignment}>Assign QR and check in</Button>
        </Flex>
      )}
    </Result>
  );
};

const Checkin = ({ profile }) => {
  const [firstNameInput, lastNameInput, emailInput] = [
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const { addToast } = useToasts();

  const resetResults = () => {
    setResults([]);
    firstNameInput.current.value = "";
    lastNameInput.current.value = "";
    emailInput.current.value = "";
  };

  const lookupHackers = async (e) => {
    e.preventDefault();
    setLoading(true);
    const firstName = firstNameInput.current.value;
    const lastName = lastNameInput.current.value;
    const email = emailInput.current.value;

    const lookupResponse = await liveLookupFetch({
      firstName,
      lastName,
      email,
    });

    const profiles = lookupResponse.success;
    setLoading(false);
    setResults(profiles);
  };

  const renderResults = useMemo(() => {
    return (
      <Results>
        {results.map((result) => (
          <CheckinResult
            addToast={addToast}
            key={Object.entries(result).join()}
            profile={profile}
            result={result}
            resetResults={resetResults}
          />
        ))}
      </Results>
    );
  }, [results]);

  return (
    <>
      <Head title="HackSC Odyssey - Check in Hackers" />
      <Navbar
        loggedIn
        admin
        superadmin={profile.role === "superadmin"}
        activePage="/checkin"
      />
      <Background padding="3rem 2rem">
        <Container>
          <Flex direction="column">
            <h1>Assign Hackers QR Codes for Check In</h1>
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

              <Button onClick={lookupHackers}>Look Up Hacker</Button>
            </Form>
          </Flex>

          {loading ? (
            <PaddedFlex>
              <PacmanLoader size={20} color={"#FF8379"} />
            </PaddedFlex>
          ) : (
            renderResults
          )}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

Checkin.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (
    !profile ||
    !(
      profile.role == "admin" ||
      profile.role == "volunteer" ||
      profile.role == "superadmin" ||
      profile.role == "judge"
    )
  ) {
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

export default Checkin;
