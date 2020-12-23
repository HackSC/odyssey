import styled from "styled-components";
import Logo from "../../assets/hackscFox.png";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarMenu>
        <MenuLogo>
          <img src={Logo} width="150%" height="150%" alt="" />
        </MenuLogo>
        <SidebarMenuItem>
          <SidebarMenuItemLabel>Dashboard</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuItemLabel>Application</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuItemLabel>Results</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuItemLabel>Team</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuItemLabel>Maps</SidebarMenuItemLabel>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuItemLabel>Resources</SidebarMenuItemLabel>
        </SidebarMenuItem>
      </SidebarMenu>
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
`;

const MenuLogo = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  height: 50px;

  color: #fff;

  margin: 20px auto;

  padding-bottom: 20px;
`;

const SidebarMenuItem = styled.li`
  display: flex;

  height: 60px;

  width: 100%;

  align-items: center;

  &:hover {
    background: rgba(255, 255, 255, 0.05);

    box-shadow: inset 3px 0 0 0 #4a96f0;

    cursor: pointer;
  }
`;

const Icon = styled.svg`
  width: 20px;

  height: 20px;
`;

const SidebarMenuItemLabel = styled.p`
  font-family: "Work Sans", sans-serif;

  font-size: 24px;

  font-weight: 600;

  line-height: 1.3;

  text-align: left;

  color: #ffffff;

  margin-left: 20px;
`;

export default Sidebar;
