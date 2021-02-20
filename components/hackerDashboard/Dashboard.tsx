import styled from "styled-components";
import Image from "next/image";

import Logo from "@/assets/hackscFox.png";

// Layout
import { Navbar, Sidebar, Footer, Header } from "./layout";
import WidgetFrame from "./HackerWidgetFrame";

// Widgets
import { BattlepassWidget, UpdatesWidget, TeamWidget } from "./widgets";

type HackathonConstant = {
  id: number;
  name: string;
  boolean: boolean;
  date: string;
  type: any;
};

type Props = {
  profile: Profile;
  announcements: Announcement[];
  events: Array<any>;
  hackathonConstants: Array<HackathonConstant>;
  team: Team;
};

const Dashboard = ({
  profile,
  announcements,
  team,
  events,
  hackathonConstants,
}: Props) => {
  return (
    <Container>
      <FoxLogo />
      <Navbar
        hackathonConstants={hackathonConstants}
        activePage="dashboard"
        profile={profile}
      />
      <Header />
      <WidgetFrame
        widget="one"
        component={<TeamWidget profile={profile} team={team} />}
      />
      <WidgetFrame
        widget="two"
        component={<BattlepassWidget raffleTickets={profile.raffleTickets} />}
      />
      <WidgetFrame
        widget="three"
        component={
          <UpdatesWidget profile={profile} announcements={announcements} />
        }
      />
      <Empty />
      <Sidebar view="hacker" events={events} />
      <Footer />
    </Container>
  );
};

const FoxLogo = () => (
  <MenuLogo>
    <Image src={Logo} width="75%" height="75%" alt="" />
  </MenuLogo>
);

const MenuLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin: 20px auto;
`;

const Empty = styled.div`
  padding: 1rem;
`;

const Container = styled.div`
  width: 100vw;
  height: auto;
  display: grid;
  grid-template-columns: 0.6fr 1.3fr 0.9fr 0.6fr;
  grid-template-rows: 0.4fr 1fr 1.4fr 0.6fr;
  gap: 0px;
  grid-template-areas:
    "FoxLogo Header Header Empty"
    "Navbar WidgetArea1 WidgetArea2 Sidebar"
    "Navbar BigWidget BigWidget Sidebar"
    "Footer Footer Footer Footer";
  background-color: #1d2c3f;
  color: #fff;
`;

export default Dashboard;
