import React, { useRef, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import JSZip from "jszip";
import stringify from "csv-stringify";
import { saveAs } from "file-saver";

import {
  handleLoginRedirect,
  getProfile,
  getMajorEvents,
  sendSlackMessage,
} from "../../lib";

import { Head, Navbar, Footer, Select, Directory } from "../../components";

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
  liveApiLookupFetch,
  liveAllApiLookupFetch,
} from "../../lib/api-sdk/liveHooks";

const manageApiDirectory = ({ profile, events }) => {
  const [action, setAction] = useState("all");
  const [emailInput, ipInput] = [useRef(null), useRef(null)];

  const [results, setResults] = useState([]);

  const exportApiCSV = async function () {
    let zip = new JSZip();

    try {
      let csvs = await genApiCSV();
      let data = csvs[0].join("");
      zip.file("apis.csv", data);
      let firstName = profile ? profile.firstName : "";
      let lastName = profile ? profile.lastName : "";
      let user_email = profile ? profile.email : "";
      let start_and_end_date =
        new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
      let slack_result = await sendSlackMessage(
        ":email: Api Directory CSV exported (/admin/manageApiDirectory) by " +
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
      saveAs(content, "apis.zip");
    });
  };

  const genApiCSV = async (): Promise<Array<Array<String>>> => {
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
          let headers = ["name", "description", "links"];
          stringifier.write(headers);
          stringifier.on("finish", function () {
            resolve(data);
          });

          for (let i = 0; i < results.length; i++) {
            let api = results[i];
            let line = [];
            for (let j = 0; j < headers.length; j++) {
              line.push(api[headers[j]]);
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

  const showApis = async (e) => {
    e.preventDefault();

    let id = events.filter((x) =>
      x.name == action || action == "all" ? x : null
    )[0].id;

    const lookupResponse =
      action == "all" || action == ""
        ? await liveAllApiLookupFetch({})
        : await liveApiLookupFetch({
            id: id,
          });

    const apis: API[] = lookupResponse.success;

    setResults(apis);
  };

  const ACTIONS = [
    {
      label: "All",
      value: "all",
    },
  ];

  const eventYear = useMemo(() => {
    const eventsAsSelectedOptions = !!events
      ? events.map((event) => ({
          value: `${event.name}`,
          label: event.name,
        }))
      : [];

    // ACTIONS defined at top of scan.tsx -- will likely update later at some point
    return [...ACTIONS, ...eventsAsSelectedOptions];
  }, [events]);

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  return (
    <>
      <Head title="HackSC Odyssey - Filter Signups" />
      <Navbar loggedIn admin activePage="/manageApiDirectory" />
      <Background padding="30px 0">
        <Container>
          <Flex direction="column">
            <h1>Manage Api Directory</h1>
            <Form>
              <Flex
                direction="column"
                style={{ paddingTop: "1rem" }}
                justify="space-between"
              >
                <label style={{ paddingBottom: "1rem" }}>Event Name</label>
                <PaddedSelect
                  name="event-year"
                  options={eventYear}
                  defaultValue="all"
                  onChange={handleActionChange}
                />
              </Flex>
              <Flex
                direction="row"
                style={{ paddingTop: "1rem" }}
                justify="space-between"
              >
                <Column flexBasis={49}>{/* Empty Column for spacing */}</Column>

                <Column flexBasis={49}>
                  <FullButton onClick={showApis}>Show Apis</FullButton>
                </Column>
              </Flex>
            </Form>
          </Flex>

          {results && results.length > 0 ? (
            <Flex
              direction="row"
              style={{ paddingTop: "1rem" }}
              justify="space-between"
            >
              <Column flexBasis={49}>
                <h3 style={{ marginLeft: "2rem" }}>Count: {results.length}</h3>
              </Column>
              <Column flexBasis={49}>
                <FullButton onClick={exportApiCSV}>Export to CSV</FullButton>
              </Column>
            </Flex>
          ) : (
            ""
          )}

          {results && results.length > 0 ? (
            <Directory apis={{ success: results }} />
          ) : (
            ""
          )}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

manageApiDirectory.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || !(profile.role == "admin")) {
    handleLoginRedirect(req);
  }

  const { result } = await getMajorEvents(req);

  return {
    profile,
    events: result,
  };
};

const PaddedSelect = styled(Select)`
  padding: 1rem 0 !important;
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

export default manageApiDirectory;
