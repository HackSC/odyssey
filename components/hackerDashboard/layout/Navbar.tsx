import styled from "styled-components";
import React, { useState } from "react";

const MenuItems = [
  { title: "Dashboard", route: "dashboard" },
  { title: "Application", route: "application" },
  { title: "Results", route: "results" },
  { title: "Team", route: "team" },
  { title: "Maps", route: "maps" },
  { title: "Resources", route: "resources" },
];

const MenuItem = ({ activePage, title, route }) => (
  <BoxShadowWrapper>
    <SidebarMenuItem
      href={"/" + route}
      active={activePage === route || activePage === title}
    >
      <SidebarMenuItemLabel>{title}</SidebarMenuItemLabel>
    </SidebarMenuItem>
  </BoxShadowWrapper>
);

const Sidebar = ({ activePage, profile }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <SidebarContainer>
      <SidebarMenu>
        {MenuItems.map((item) =>
          MenuItem({ activePage, title: item.title, route: item.route })
        )}
      </SidebarMenu>
      <BoxShadowWrapper>
        <Profile onClick={() => setShowMenu(!showMenu)}>
          <ProfilePic src={profile.profilePic ? profile.profilePic : "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"} />
          <ProfileDetails>
            <Name>{profile.firstName} {profile.lastName}</Name>
            <Email>{profile.email}</Email>
          </ProfileDetails>
        </Profile>
        {showMenu ? (
          <ProfileMenu>
            <ProfileMenuItem href="/auth/logout">logout</ProfileMenuItem>
          </ProfileMenu>
          ) : (<div/>)
        }
      </BoxShadowWrapper>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  grid-area: Navbar;
  background-color: #1d2c3f;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Work Sans", sans-serif;
`;

const SidebarMenu = styled.ul`
  display: flex;
  align-items: left;
  flex-direction: column;
  list-style: none;
  width: 100%;
  margin: 0.5rem 0 0 0;
`;

const BoxShadowWrapper = styled.div`
  padding: 0.1rem;
  margin: 0.5rem;
  box-shadow: 8px 8px 0 0 #132235;
  border-radius: 4px 10px 10px 4px;
`;

type AProps = {
  active: boolean;
};

const SidebarMenuItem = styled.a<AProps>`
  display: flex;
  height: 60px;
  width: auto;
  padding: 0.5rem;
  align-items: center;
  border-radius: 4px 10px 10px 4px;
  box-shadow: inset 3px 0 0 0 #4a96f0;
  &:hover {
    background: rgba(255, 255, 255, 0.03);
    box-shadow: inset 3px 0 0 0 #4a96f0;
    cursor: pointer;
  }
  background-color: ${({ active }) =>
    active ? "rgba(255, 255, 255, 0.03)" : "#2d4158"};
`;

const SidebarMenuItemLabel = styled.p`
  font-family: "Work Sans", sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
  color: #ffffff;
  margin-left: 8px;
`;

const Profile = styled.a`
  display: flex;
  height: auto;
  min-height: 60px;
  width: auto;
  padding: 0.5rem;
  align-items: center;
  border-radius: 4px 10px 10px 4px;
  box-shadow: inset 3px 0 0 0 #4a96f0;
  &:hover {
    background: rgba(255, 255, 255, 0.03);
    box-shadow: inset 3px 0 0 0 #4a96f0;
    cursor: pointer;
  }
  background-color: #2d4158;
  color: white;
`;

const ProfilePic = styled.img`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Name = styled.p`
  font-family: "Work Sans", sans-serif;
  font-size: 20px;
  font-weight: 400;
`;

const Email = styled.p`
  font-family: "Work Sans", sans-serif;
  font-size: 15px;
  font-weight: 300;
  padding-top: 5px;
`;

const ProfileMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
`;

const ProfileMenuItem = styled.a`
  padding: 0.5em;
  text-align: center;
  color: white;
  font-size: 15px;
  font-weight: 300;
  font-family: "Work Sans", sans-serif;
  text-decoration: none;
`;

export default Sidebar;
