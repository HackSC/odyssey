import styled from "styled-components";
import Image from "next/image";

import Logo from "@/assets/hackscFox.png";

// Layout
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import WidgetFrame from "./HackerWidgetFrame";

// Widgets
import Battlepass from "./widgets/battlepass";
import Updates from "./widgets/updates";
import { getHackathonConstants, getProfile, getPublicEvents } from "@/lib";

type Props = {
  profile: Profile;
  events: Array<any>;
};

const Dashboard = ({ profile, events }: Props) => {
  console.log(events);
  return (
    <Container>
      <FoxLogo />
      <Navbar activePage="dashboard" profile={profile} />
      <Header />
      <WidgetFrame widget="one" component={<h2>Your team</h2>} />
      <WidgetFrame widget="two" component={<Battlepass />} />
      <WidgetFrame widget="three" component={<Updates />} />
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
