import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import Dropdown, {
  DropdownTrigger,
  DropdownContent,
} from "react-simple-dropdown";

import { getProfileList } from "../lib/authenticate";
import styled from "styled-components";

const PersonSwitcher = ({ profileList }) => {
  const { profile } = useContext(UserContext);
  const [users, setUsers] = useState(profileList ? profileList : []);

  const userChangeHandler = async (u: Profile) => {
    await fetch("/auth/devlogin?id=" + u.userId);
    window.location.reload(false);
  };

  return (
    <SwitcherContainer>
      <DropdownBackground>
        <Dropdown>
          <DropdownTrigger>
            <h4>Dev Profile Switcher | Active User </h4>

            {profile && (
              <div>
                <span>{profile.email}</span>
                <Role>{profile.role}</Role>
              </div>
            )}
          </DropdownTrigger>
          <StyledDropdownContent>
            {users.slice(0, 10).map((u) => (
              <UserContainer onClick={() => userChangeHandler(u)}>
                <span>{u.email}</span>
                <Role>{u.role}</Role>
              </UserContainer>
            ))}
          </StyledDropdownContent>
        </Dropdown>
      </DropdownBackground>
    </SwitcherContainer>
  );
};

const Role = styled.span`
  text-align: right;
`;

const StyledDropdownContent = styled(DropdownContent)`
  background: white;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  :hover {
    background: magenta;
  }
`;

const DropdownBackground = styled.div`
  display: flex;
  background: white;
  color: black;
  margin-left: 10px;
  border: 1px solid black;
`;

const SwitcherContainer = styled.div`
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
`;

export default PersonSwitcher;
