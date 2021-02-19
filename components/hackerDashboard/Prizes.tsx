import styled from "styled-components";
import Image from "next/image";

import Logo from "@/assets/hackscFox.png";

// Layout
import { Navbar, Sidebar, Footer, Header } from "./layout";
import WidgetFrame from "./HackerWidgetFrame";

// Widgets
import { PrizesWidget } from "./widgets";

type HackathonConstant = {
  id: number;
  name: string;
  boolean: boolean;
  date: string;
  type: any;
};

type Props = {
  profile: Profile;
  hackathonConstants: Array<HackathonConstant>;
  prizes: any;
  events: Array<any>;
};

const Prizes = ({ profile, hackathonConstants, prizes, events }: Props) => {
  return (
    <Container>
      <FoxLogo />
      <Navbar
        hackathonConstants={hackathonConstants}
        activePage="prizes"
        profile={profile}
      />
      <Header />
      <WidgetFrame
        widget="one"
        component={
          <>
            <h3>HackSC Prizes</h3>
          </>
        }
      />
      <WidgetFrame widget="two" component={<PrizesWidget prizes={prizes} />} />
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
  display: grid;
  grid-template-columns: 0.6fr 1.3fr 0.9fr 0.6fr;
  grid-template-rows: 0.2fr 0.1fr 1fr 0.4fr;
  gap: 0px;
  grid-template-areas:
    "FoxLogo Header Header Empty"
    "Navbar WidgetArea1 WidgetArea1 Sidebar"
    "Navbar WidgetArea2 WidgetArea2 Sidebar"
    "Navbar BigWidget BigWidget Sidebar"
    "Footer Footer Footer Footer";
  background-color: #1d2c3f;
  color: #fff;
`;

export default Prizes;
