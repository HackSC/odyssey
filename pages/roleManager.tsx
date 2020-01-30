import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import {
  getProfiles,
  updateProfileRole
} from "../lib/admin";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Select from "../components/Select";

import styled from "styled-components";

import { Background, Container, Button, Flex } from "../styles";

const roleManager = ({ profile }) => {
  const [query, setQuery] = useState("")
  const [queryResults, setQueryResults] = useState([])

  const { addToast } = useToasts();

  const roleOptions = [
    { label: "hacker", value: "hacker" },
    { label: "admin", value: "admin" },
    { label: "sponsor", value: "sponsor" },
    { label: "volunteer", value: "volunteer" }
  ]

  const queryResultBlocks = queryResults.map(profile => {
    return (
      <QueryResult
        key={profile.email}
        >
        {'Name: ' + profile.firstName + ' ' + profile.lastName + ' | Email: ' + profile.email}
        <Select
                name="role"
                options={roleOptions}
                defaultValue={profile.role}
                onChange={e => {
                  updateRole(profile.email, e.target.value)
                }}
                />
      </QueryResult>
    )
  })

  const updateRole = async function(email, role) {
    const result = await updateProfileRole(email, role)
    if (result.status == 200) {
      addToast('Updated role!', { appearance: 'success' })
    } else {
      addToast('Error: ' + result.statusText, { appearance: 'error' })
    }
  }

  const search = async function() {
    const profiles = await getProfiles(query)
    setQueryResults(profiles)
  }

  return (
    <>
      <Head title="HackSC Odyssey - Application" />
      <Navbar loggedIn admin activePage="/" />
      <Background>
        <Container>
          <SearchBar>
            <Input
              type="text"
              onChange={e => {
                setQuery(e.target.value)
              }}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  search()
                }
              }}
              placeholder="Search"
              />
            <Button
              onClick={search}
            >
              Search
            </Button>
          </SearchBar>
          {queryResultBlocks}      
        </Container>
      </Background>
      <Footer />
    </>
  );
};

roleManager.getInitialProps = async ctx => {
  const { req } = ctx;

  const profile = await getProfile(req);

  // Null profile means user is not logged in or user does not have enough rights
  if (!profile || profile.role != "admin") {
    handleLoginRedirect(req);
  }

  return { profile };
};

const SearchBar = styled(Flex)`
  width: 100%;
  margin-bottom: 10px;

  input {
    margin-right: 10px;
  }
`;

const QueryResult = styled.div`
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 16px;
  margin: 5px 0px;

  div {
    width: 120px;
    display: inline-block; 
    margin: 2px 10px;
  }

  select {
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #b2b2b2;
    background: #ffffff;
    padding: 12px 16px;
    font-weight: 300;
    color: #1C1C1C;
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
