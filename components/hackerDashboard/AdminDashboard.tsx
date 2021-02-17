import styled from "styled-components";

// Layout
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import WidgetFrame from "./HackerWidgetFrame";

// Widgets
import ActionsWidget from "./widgets/admin/actions";

type Props = {
  profile: Profile;
  events: Array<any>;
  hackathonConstants: any;
};

const AdminDashboard = (props: Props) => {
  const { profile, events, hackathonConstants } = props;

  return (
    <Container>
      <Navbar
        hackathonConstants={hackathonConstants}
        activePage="dashboard"
        profile={profile}
      />
      <Header text={"Admin Dashboard"} />
      <WidgetFrame
        widget="one"
        component={
          <>
            <h3>Welcome to the Admin Dashboard!</h3>
            <p>
              Here you can access actions to help run HackSC. If you have any
              questions or find any errors, hit up the engineers in{" "}
              <b>#{new Date().getFullYear()}-engineering</b>
            </p>
          </>
        }
      />
      <WidgetFrame widget="two" component={<ActionsWidget />} />
      <Sidebar view={"admin"} events={events} />
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 0.5fr;
  grid-template-rows: 0.2fr 0.2fr 1.6fr 0.6fr;
  gap: 0px;
  grid-template-areas:
    "Navbar Header Header Sidebar"
    "Navbar WidgetArea1 WidgetArea1 Sidebar"
    "Navbar WidgetArea2 WidgetArea2 Sidebar"
    "Footer Footer Footer Footer";
  background-color: #1d2c3f;
  color: #fff;
`;

export default AdminDashboard;
