import styled from "styled-components";

// Layout
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import WidgetFrame from "./WidgetFrame";

// Widgets
import Battlepass from "./widgets/battlepass";

const Dashboard = () => {
  return (
    <Container>
      <Navbar />
      <Header />
      <WidgetFrame widget="one" component={<h2>Your team</h2>} />
      <WidgetFrame widget="two" component={<Battlepass />} />
      <WidgetFrame widget="three" component={<h2>Updates</h2>} />
      <Sidebar />
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
