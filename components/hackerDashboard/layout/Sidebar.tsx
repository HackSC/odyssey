import { useState, useEffect } from "react";
import styled from "styled-components";
import WidgetFrame from "../HackerWidgetFrame";
import { Column } from "../../../styles";

import HackathonCountdown from "../widgets/sidebar/countdown";
import HackathonDates from "../widgets/sidebar/dates";
import Uptime from "../widgets/sidebar/uptime";
import Stats from "../widgets/sidebar/stats";

interface Card {
  link: string;
  img?: HTMLImageElement | string;
  alt?: string;
  text: string;
}

type Props = {
  view?: "hacker" | "admin" | "sponsor" | "judge";
};

const Sidebar = (props: Props) => {
  const { view } = props;

  const hackerWidgets = [<HackathonCountdown />, <HackathonDates />];
  const adminWidgets = [<HackathonCountdown />, <Stats />];
  // TODO: Generalize
  const widgets = view === "admin" ? adminWidgets : hackerWidgets;
  return (
    <SidebarContainer>
      <div></div>
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
`;
// margin-top: 80px;

export default Sidebar;
