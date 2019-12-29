import React, { useState } from "react";

import {
  handleLoginRedirect,
  getProfile,
  handleAdminRedirect
} from "../lib/authenticate";
import { getReferrerCode } from "../lib/referrerCode";

import styled from "styled-components";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Background, Flex, Container } from "../styles";

const TestConsole = ({ profile }) => {
  const [routeUrl, setRouteUrl] = useState("");
  const [reqType, setReqType] = useState("GET");
  const [body, setBody] = useState("");
  const [response, setResponse] = useState("");
  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/" />
      <Container>
        <p> Url Route Param: </p>
        <input
          placeholder="/api/..."
          type="text"
          onChange={e => {
            setRouteUrl(e.target.value);
          }}
        />
        <select
          onChange={e => {
            console.log(e.target.value);
            setReqType(e.target.value);
          }}
        >
          <option value="GET" selected>
            GET
          </option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <p> request body (if it exists) </p>
        <textarea
          placeholder="{ message: 'hi' ...}"
          onChange={e => {
            setBody(e.target.value);
          }}
        />
        <div>
          <textarea value={response} />
        </div>
        <div>
          <button
            onClick={async () => {
              // send request
              const needsBody = reqType !== "GET";
              try {
                const response = await fetch(routeUrl, {
                  method: reqType,
                  body: needsBody ? JSON.stringify(JSON.parse(body)) : null,
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
                const result = await response.json();
                setResponse(JSON.stringify(result));
              } catch (e) {
                console.log(e.message);
              }
            }}
          >
            Send it
          </button>
        </div>
      </Container>
      <Footer />
    </>
  );
};

TestConsole.getInitialProps = async ctx => {
  const { req } = ctx;
  if (process.env.NODE_ENV !== "development") {
    handleAdminRedirect(req);
  }
  const profile = await getProfile(req);

  // Null profile means user is not logged in, and this is only relevant for admins
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile
  };
};

export default TestConsole;
