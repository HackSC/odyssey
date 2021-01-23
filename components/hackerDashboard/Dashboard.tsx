import styled from "styled-components";

// Layout
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import WidgetFrame from "./HackerWidgetFrame";

// Widgets
import Battlepass from "./widgets/battlepass";
import Updates from "./widgets/updates";
import Team from "./widgets/team";

type Props = {
  profile: Profile;
  team: Team;
};

const Dashboard = ({ profile, team }: Props) => {
  return (
    <Container>
      <Navbar />
      <Header />
      <WidgetFrame widget="one" component={<Team team={team} />} />
      <WidgetFrame widget="two" component={<Battlepass />} />
      <WidgetFrame widget="three" component={<Updates />} />
      <Sidebar view="hacker" />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.3fr 0.7fr 0.5fr;
  grid-template-rows: 0.4fr 1fr 1.4fr 0.6fr;
  gap: 0px;
  grid-template-areas:
    "Navbar Header Header Sidebar"
    "Navbar WidgetArea1 WidgetArea2 Sidebar"
    "Navbar BigWidget BigWidget Sidebar"
    "Footer Footer Footer Footer";
  background-color: #1d2c3f;
  color: #fff;
`;

export default Dashboard;
