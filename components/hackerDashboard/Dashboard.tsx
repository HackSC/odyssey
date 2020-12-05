import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Header from "./Header";
import WidgetFrame from "./WidgetFrame";

import styled from "styled-components";

const Dashboard = () => {
  return (
    <Container>
      <Navbar />
      <Header />
      <WidgetFrame widget="team" component={<h1>Test!</h1>} />
      <WidgetFrame widget="one" component={<h1>Test!</h1>} />
      <WidgetFrame widget="two" component={<h1>Test!</h1>} />
      <WidgetFrame widget="three" component={<h1>Test!</h1>} />
      <Sidebar />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1.5fr 0.5fr;
  grid-template-rows: 0.5fr 0.6fr 0.8fr 1.5fr 0.6fr;
  gap: 15px;
  grid-template-areas:
    "Navbar Header Header Sidebar"
    "Navbar Team Team Sidebar"
    "Navbar WidgetArea1 WidgetArea2 Sidebar"
    "Navbar BigWidget BigWidget Sidebar"
    "Footer Footer Footer Footer";
  background-color: #1d2c3f;
  color: #fff;
`;

export default Dashboard;
