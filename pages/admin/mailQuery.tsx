import React, { useRef, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import JSZip from "jszip";
import stringify from "csv-stringify";
import { saveAs } from "file-saver";

import { Head, Navbar, Footer } from "../../components";
import { sendSlackMessage, handleLoginRedirect, getProfile } from "../../lib";

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
  liveSignUpLookupFetch,
  liveLookupFetch,
} from "../../lib/api-sdk/liveHooks";

const Hacker = ({ result }) => {
  return (
    <Result key={Object.entries(result).join()}>
      <h2>{result.email}</h2>
      <p>
        <b>IP Address: </b>
        {result.ip}
      </p>
    </Result>
  );
};

const mailQuery = ({ profile }) => {
  const [emailInput, ipInput] = [useRef(null), useRef(null)];

  const [results, setResults] = useState([]);

  const exportHackerCSV = async function () {
    let zip = new JSZip();

    try {
      let csvs = await genHackerCSV();
      let data = csvs[0].join("");
      zip.file("signups.csv", data);
      let firstName = profile ? profile.firstName : "";
      let lastName = profile ? profile.lastName : "";
      let user_email = profile ? profile.email : "";
      let start_and_end_date =
        new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
      let slack_result = await sendSlackMessage(
        ":email: Mail Query CSV exported (/admin/mailQuery) by " +
          firstName +
          ", " +
          lastName +
          ", " +
          user_email,
        "CSV size: " + (csvs[0].length - 1),
        start_and_end_date,
        start_and_end_date
      );
    } catch (err) {
      return;
    }

    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "signups.zip");
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
          let headers = ["email", "ip"];
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

  const lookupHackers = async (e) => {
    e.preventDefault();

    const email = emailInput.current.value;
    const ip = ipInput.current.value;

    const lookupResponse = await liveSignUpLookupFetch({
      email,
      ip,
    });

    const profiles = lookupResponse.success;

    setResults(profiles);
  };

  const showAllHackers = async (e) => {
    e.preventDefault();

    const lookupResponse = await liveSignUpLookupFetch({ email: "", ip: "" });

    const profiles = lookupResponse.success;
    setResults(profiles);
  };

  const renderHackers = useMemo(() => {
    return (
      <Results>
        {results
          ? results.map((result) => (
              <Hacker key={Object.entries(result).join()} result={result} />
            ))
          : ""}
      </Results>
    );
  }, [results]);

  return (
    <>
      <Head title="HackSC Odyssey - Filter Signups" />
      <Navbar loggedIn admin activePage="/mailQuery" />
      <Background>
        <Container>
          <Flex direction="column" style={{ margin: "0 20px" }}>
            <h1>Filter Signups and Export to CSV</h1>
            <Form>
              <Flex direction="row" justify="space-between">
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>Email</label>
                    <input type="text" ref={emailInput} />
                  </FormGroup>
                </Column>
                <Column flexBasis={49}>
                  <FormGroup>
                    <label>IP</label>
                    <input type="text" ref={ipInput} />
                  </FormGroup>
                </Column>
              </Flex>

              <Flex
                direction="row"
                style={{ paddingTop: "1rem" }}
                justify="space-between"
              >
                <Column flexBasis={49}>
                  <FullButton onClick={lookupHackers}>
                    Filter Signups
                  </FullButton>
                </Column>

                <Column flexBasis={49}>
                  <FullButton onClick={showAllHackers}>
                    Show All Signups
                  </FullButton>
                </Column>
              </Flex>
            </Form>
          </Flex>

          <Flex
            direction="row"
            style={{ paddingTop: "1rem" }}
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
          <Flex
            direction="row"
            style={{ paddingTop: "1rem" }}
            justify="space-between"
          >
            {results && results.length > 0 ? (
              <h3 style={{ margin: "auto" }}>Count: {results.length}</h3>
            ) : (
              ""
            )}
          </Flex>

          {renderHackers}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

mailQuery.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || !(profile.role == "admin")) {
    handleLoginRedirect(req);
  }

  return {
    profile,
  };
};

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

export default mailQuery;
