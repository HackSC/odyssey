import styled from "styled-components";
import WidgetFrame from "../HackerWidgetFrame";
import {
  HackathonCountdown,
  HackathonDates,
  HackathonEvents,
  Stats,
} from "../widgets";

interface Card {
  link: string;
  img?: HTMLImageElement | string;
  alt?: string;
  text: string;
}

type Props = {
  view?: "hacker" | "admin" | "sponsor" | "judge";
  events: Array<any>;
};

const Sidebar = (props: Props) => {
  const { view, events } = props;

  const hackerWidgets = [
    <HackathonCountdown />,
    <HackathonDates />,
    <HackathonEvents events={events} />,
  ];
  const adminWidgets = [
    <HackathonCountdown />,
    <Stats />,
    <HackathonEvents events={events} />,
  ];
  // TODO: Generalize
  const widgets = (view === "admin" || view === "sponsor") ? adminWidgets : hackerWidgets;
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
`;
// margin-top: 80px;

export default Sidebar;
