import React, { useState } from "react";
import styled from "styled-components";

import {
  Button,
  Background,
  Flex,
  Container,
  FormGroup,
  Form,
  Column,
} from "../../styles";
import { sendSlackMessage, handleLoginRedirect, getProfile } from "../../lib";
import { Select, Head, Navbar, Footer } from "../../components";

const TestConsole = ({ profile }) => {
  const [routeUrl, setRouteUrl] = useState("");
  const [reqType, setReqType] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");

  const typeOptions = [
    { label: "Get", value: "GET" },
    { label: "Post", value: "POST" },
    { label: "Put", value: "PUT" },
    { label: "Delete", value: "DELETE" },
  ];

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/" />
      <Background>
        <Container>
          <Flex direction="column">
            <Form>
              <FormSection>
                <h2>Experimental SQL Console</h2>
                <FormGroup>
                  <label>Url Route Param</label>

                  <input
                    type="text"
                    placeholder="/api/..."
                    name="route"
                    maxLength={1000}
                    onChange={(e) => {
                      setRouteUrl(e.target.value);
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <label>Type</label>
                  <Select
                    name="type"
                    onChange={(e) => {
                      setReqType(e.target.value);
                    }}
                    options={typeOptions}
                    defaultValue={"GET"}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Request Body (if it exists)</label>

                  <textarea
                    rows={5}
                    name="input"
                    maxLength={1000}
                    placeholder="{ message: 'hi' ...}"
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                  />
                  <InputSubText>Character limit: 1000</InputSubText>
                </FormGroup>
                <FormGroup>
                  <SaveButton
                    onClick={async (e) => {
                      e.preventDefault();
                      // send request
                      const needsBody = reqType !== "GET";
                      try {
                        const response = await fetch(routeUrl, {
                          method: reqType,
                          body: needsBody
                            ? JSON.stringify(JSON.parse(body))
                            : null,
                          headers: {
                            "Content-Type": "application/json",
                          },
                        });
                        const result = await response.json();
                        setResponse(JSON.stringify(result));

                        if (result) {
                          let firstName = profile ? profile.firstName : "";
                          let lastName = profile ? profile.lastName : "";
                          let user_email = profile ? profile.email : "";
                          let start_and_end_date =
                            new Date(
                              new Date().getTime() - 480 * 1000 * 60
                            ).toISOString() + "";
                          let slack_result = await sendSlackMessage(
                            "Experimental Console SQL (/admin/testconsole) executed by " +
                              firstName +
                              ", " +
                              lastName +
                              ", " +
                              user_email,
                            "Route: " +
                              routeUrl +
                              ", Type: " +
                              reqType +
                              ", Body: " +
                              JSON.stringify(JSON.parse(body)),
                            start_and_end_date,
                            start_and_end_date
                          );
                        }
                      } catch (e) {
                        console.error(e.message);
                      }
                    }}
                  >
                    Execute
                  </SaveButton>
                  <SubmitWarningMessage>
                    This executes against the production database. Please be
                    careful!
                  </SubmitWarningMessage>
                </FormGroup>
                <FormGroup>
                  <label>Response</label>
                  <textarea
                    rows={10}
                    name="response"
                    placeholder="query result..."
                    readOnly={true}
                    value={response}
                  />
                </FormGroup>
              </FormSection>
            </Form>
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

TestConsole.getInitialProps = async (ctx) => {
  const { req } = ctx;
  // if (process.env.NODE_ENV !== "development") {
  //   handleAdminRedirect(req);
  // }
  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
  };
};

export default TestConsole;

const FormSection = styled.div`
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 48px;
  margin-bottom: 64px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InputSubText = styled.p`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.gray50};
`;

const SaveButton = styled(Button)`
  &:hover {
    color: #ffffff;
    border-color: #ffffff;
    background: ${({ theme }) => theme.colors.peach};
    opacity: 0.6;
  }
`;

const SubmitWarningMessage = styled.h3`
  text-align: center;
  font-weight: 600;
  padding: 32px 0 0;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.red};
`;
