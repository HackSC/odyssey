import styled from "styled-components";
import WidgetFrame from "./WidgetFrame";
import { Column } from "../../styles";
import LinkCard from "../LinkCard";

import Slack from "../../assets/socialmedia/slack.svg";
import Devpost from "../../assets/socialmedia/devpost.svg";
import MLH from "../../assets/socialmedia/mlh.svg";

interface Card {
  link: string;
  img?: HTMLImageElement | string;
  alt?: string;
  text: string;
}

const cards: Card[] = [
  {
    link: "https://hacksc.com/join-slack",
    img: Slack,
    text: "Join our Slack to stay connected",
  },
  {
    link: "https://hacksc-2021.devpost.com",
    img: Devpost,
    text: "Submit your final project to Devpost",
  },
  {
    link: "https://mlh.io",
    img: MLH,
    text: "Read up on MLH guidelines and policies",
  },
];

const CardWidget = ({ card }: { card: Card }) => {
  return (
    <LinkCard
      dark={true}
      propImg={card.img}
      propAlt={card.text}
      propText={card.text}
    />
  );
};

const Sidebar = () => {
  const widgets = cards.map((e) => <CardWidget card={e} />);
  return (
    <SidebarContainer>
      {widgets.map((e, i) => (
        <WidgetFrame component={e} />
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
  border-left: 1px solid white;
`;

export default Sidebar;
