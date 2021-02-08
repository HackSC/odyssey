import styled from "styled-components";

const MenuItems = [
  { title: "Dashboard", route: "dashboard", constant: "showDash" },
  { title: "Maps", route: "maps", constant: "showMaps" },
  { title: "Resources", route: "resources", constant: "showAPI" },
];

type Item = {
  title: string;
  route: string;
  constant: string;
};

type HackathonConstant = {
  id: number;
  name: string;
  boolean: boolean;
  date: string;
  type: any;
};

type NavbarProps = {
  activePage: string;
  hackathonConstants: Array<HackathonConstant>;
};

type MenuItemProps = {
  activePage: string;
  item: Item;
  hackathonConstants: Array<HackathonConstant>;
};

const MenuItem = ({ activePage, item, hackathonConstants }: MenuItemProps) => {
  let show = true;
  hackathonConstants.forEach((c) => {
    if (item.constant == c.name) show = c.boolean;
  });

  return show ? (
    <BoxShadowWrapper>
      <NavbarMenuItem
        href={"/" + item.route}
        active={activePage === item.route || activePage === item.title}
      >
        <NavbarMenuItemLabel>{item.title}</NavbarMenuItemLabel>
      </NavbarMenuItem>
    </BoxShadowWrapper>
  ) : (
    ""
  );
};

const SponsorNavbar = ({ activePage, hackathonConstants }: NavbarProps) => {
  return (
    <NavbarContainer>
      <NavbarMenu>
        {MenuItems.map((item) =>
          MenuItem({ activePage, item: item, hackathonConstants })
        )}
      </NavbarMenu>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  grid-area: Navbar;
  background-color: #1d2c3f;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Work Sans", sans-serif;
`;

const NavbarMenu = styled.ul`
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

const NavbarMenuItem = styled.a<AProps>`
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

const NavbarMenuItemLabel = styled.p`
  font-family: "Work Sans", sans-serif;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
  color: #ffffff;
  margin-left: 8px;
`;

export default SponsorNavbar;
