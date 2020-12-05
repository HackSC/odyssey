import styled from "styled-components";
import WidgetFrame from "./WidgetFrame";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <WidgetFrame component={<h1> Test 1</h1>} />
      <WidgetFrame component={<h1> Test 2</h1>} />
      <WidgetFrame component={<h1> Test 3</h1>} />
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  grid-area: Sidebar;
  width: 270px;
  background-color: #1d2c3f;
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Work Sans", sans-serif;
  border-left: 1px solid white;
`;

export default Sidebar;
