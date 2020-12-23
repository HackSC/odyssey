import { useState, useEffect } from "react";
import styled from "styled-components";
import WidgetFrame from "./WidgetFrame";
import { Column } from "../../styles";

import HackathonCountdown from "./widgets/sidebar/countdown";
import HackathonDates from "./widgets/sidebar/dates";

interface Card {
  link: string;
  img?: HTMLImageElement | string;
  alt?: string;
  text: string;
}

const Sidebar = () => {
  const widgets = [<HackathonCountdown />, <HackathonDates />];
  return (
    <SidebarContainer>
      {widgets.map((e, i) => (
        <WidgetFrame key={i} component={e} />
      ))}
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
  margin-top: 80px;
`;

export default Sidebar;
