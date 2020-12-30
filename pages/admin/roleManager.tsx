import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

import {
  handleLoginRedirect,
  getProfile,
  getProfiles,
  updateProfileRole,
  sendSlackMessage,
} from "../../lib";
import { Head, Navbar, Footer, Select } from "../../components";
import { Background, Container, Button, Flex } from "../../styles";

const roleManager = ({ profile }) => {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  const { addToast } = useToasts();

  const roleOptions = [
    { label: "hacker", value: "hacker" },
    { label: "admin", value: "admin" },
    { label: "sponsor", value: "sponsor" },
    { label: "volunteer", value: "volunteer" },
  ];

  const queryResultBlocks = queryResults.map((userprofile) => {
    return (
      <QueryResult key={Object.entries(userprofile).join()}>
        <div style={{ wordBreak: "break-all" }}>
          <p>
            Name: {userprofile.firstName} {userprofile.lastName}
          </p>
          <p>Email: {userprofile.email}</p>
        </div>
        <Select
          name="role"
          options={roleOptions}
          defaultValue={userprofile.role}
          onChange={(e) => {
            updateRole(userprofile.email, e.target.value);
          }}
        />
      </QueryResult>
    );
  });

  const updateRole = async function (email, role) {
    const result = await updateProfileRole(email, role);
    if (result.status == 200) {
      let firstName = profile ? profile.firstName : "";
      let lastName = profile ? profile.lastName : "";
      let user_email = profile ? profile.email : "";
      let start_and_end_date =
        new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() + "";
      let slack_result = await sendSlackMessage(
        ":red_circle: Updated Profile Role (/admin/roleManager) executed by " +
          firstName +
          ", " +
          lastName +
          ", " +
          user_email,
        "User: " + email + "role was updated to " + role,
        start_and_end_date,
        start_and_end_date
      );
      if (slack_result) addToast("Updated role!", { appearance: "success" });
    } else {
      addToast("Error: " + result.statusText, { appearance: "error" });
    }
  };

  const search = async function () {
    const profiles = await getProfiles(query);
    setQueryResults(profiles);
  };

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/roleManager" />
      <Background padding="2rem">
        <Container>
          <h1 style={{ margin: "2rem auto 1rem auto", maxWidth: "740px" }}>
            Manage Roles
          </h1>
          <Flex
            direction="row"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <SearchBar>
              <Input
                type="text"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    search();
                  }
                }}
                placeholder="Search"
              />
              <Button onClick={search}>Search</Button>
            </SearchBar>
            {queryResultBlocks}
          </Flex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

roleManager.getInitialProps = async (ctx) => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in or user does not have enough rights
  if (!profile || !(profile.role == "admin" || profile.role == "superadmin")) {
    handleLoginRedirect(req);
  }

  return { profile };
};

const SearchBar = styled(Flex)`
  width: 100%;
  margin: 1rem 0 2rem 0;
  max-width: 740px;

  input {
    margin-right: 10px;
  }
`;

const QueryResult = styled.div`
  padding: 10px 20px;
  background: #ffffff;
  max-width: 300px;
  border-radius: 8px;
  font-size: 16px;
  margin: 2rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  div {
    width: 100%;
    display: inline-block;
    margin: 2px 10px;
    margin: auto;
  }

  select {
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    background: #ffffff;
    padding: 12px 16px;
    font-weight: 300;
    color: #1c1c1c;
    -webkit-appearance: none;
    border-image: initial;
    position: relative;
  }
`;

const Input = styled.input`
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  padding: 12px 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.black};
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export default roleManager;
