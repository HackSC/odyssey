import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import {
  getHackerProfiles
} from "../lib/admin";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

import { Background, Container, Button, Flex, Column } from "../styles";

const roleManager = ({ profile }) => {
  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const searchResultBlocks = searchResults.map(result => {
    return (
      <SearchResult>
        {result}
      </SearchResult>
    )
  })

  const search = async function() {
    const profiles = await getHackerProfiles(searchText)
    console.log(profiles)
    setSearchResults(profiles)
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
                setSearchText(e.target.value)
              }}
              placeholder="Search"
              />
            <Button
              onClick={search}
            >
              Search
            </Button>
          </SearchBar>
          {searchResultBlocks}      
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
`;

const SearchResult = styled.div`
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 16px;
  margin: 5px 0px;
`;

const Cell = styled.div`
  display: inline-block;
  padding: 10px 20px;
  background: #ffffff;
  border-radius: 8px;
  font-size: 16px;
`;

const SmallCell = styled.div`
  padding: 12px 1px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #b2b2b2;
  min-width: 39px;
  display: inline-block;
  text-align: center;
  font-size: 16px;
`;

const Panel = styled.div`
  padding: 24px 36px;
  margin: 0 0 16px;
  background: #ffffff;
  border-radius: 4px;
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

const InvisInput = styled.input`
  display: none;
`;

const TableInput = styled.input`
  display: inline-block;
  width: 25px;
  padding: 12px 8px;
  margin-right: 1px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  color: ${({ theme }) => theme.colors.gray50};
`;

const FullButton = styled(Button)`
  width: 100%;
  text-align: center;
`;

const FullStyledButton = styled(Button)`
  width: 100%;
  text-align: center;
  ${({ disabled }) => disabled && `opacity: 0.5`};
`;

const StyledButton = styled(Button)`
  ${({ disabled }) => disabled && `opacity: 0.5`};
`;

export default roleManager;
