import React, { useState } from "react";

import { Head, Navbar, Footer } from "../../components";
import {
  getHouses,
  createHouse,
  updateHouse,
  deleteHouse,
  handleLoginRedirect,
  getProfile,
  sendSlackMessage,
} from "../../lib";
import {
  Background,
  Container,
  EditButton,
  Task,
  TaskInfo,
} from "../../styles";

const EditableCell = ({ profile, house }) => {
  const [currHouse, setCurrHouse] = useState(house);
  return (
    <Task>
      <TaskInfo>
        <input
          type="text"
          placeholder="name"
          value={currHouse.name}
          onChange={(e) => {
            setCurrHouse({ ...currHouse, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="color"
          value={currHouse.color}
          onChange={(e) => {
            setCurrHouse({ ...currHouse, type: e.target.value });
          }}
        />
      </TaskInfo>
      <EditButton
        onClick={async () => {
          const result = await updateHouse(currHouse);
          if (result) {
            let firstName = profile ? profile.firstName : "";
            let lastName = profile ? profile.lastName : "";
            let user_email = profile ? profile.email : "";
            let start_and_end_date =
              new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
              "";
            let slack_result = await sendSlackMessage(
              "House UPDATED (/admin/houseManager) by " +
                firstName +
                ", " +
                lastName +
                ", " +
                user_email,
              "House Name: " +
                currHouse.name +
                "\nHouse Color: " +
                currHouse.color,
              start_and_end_date,
              start_and_end_date
            );
            window.location.reload();
          } else {
            alert("failed to update house");
          }
        }}
      >
        {" "}
        Update House{" "}
      </EditButton>
      <EditButton
        onClick={async () => {
          const result = await deleteHouse(currHouse);
          if (result) {
            let firstName = profile ? profile.firstName : "";
            let lastName = profile ? profile.lastName : "";
            let user_email = profile ? profile.email : "";
            let start_and_end_date =
              new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
              "";
            let slack_result = await sendSlackMessage(
              "House DELETED (/admin/houseManager) by " +
                firstName +
                ", " +
                lastName +
                ", " +
                user_email,
              "House Name: " +
                currHouse.name +
                "\nHouse Color: " +
                currHouse.color,
              start_and_end_date,
              start_and_end_date
            );
            window.location.reload();
          } else {
            alert("failed to delete house");
          }
        }}
      >
        Delete House
      </EditButton>
    </Task>
  );
};

const houseManager = ({ profile, currentHouses }) => {
  const [newHouse, setNewHouse] = useState({});

  const taskBlocks = currentHouses.houses.map((house) => {
    return <EditableCell profile={profile} house={house} />;
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/houseManager" />
      <Background padding="30px 0">
        <Container>
          {" "}
          <Task>
            <TaskInfo>
              <input
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setNewHouse({
                    ...newHouse,
                    name: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="color ex: #123456"
                onChange={(e) => {
                  setNewHouse({
                    ...newHouse,
                    color: e.target.value,
                  });
                }}
              />
            </TaskInfo>
            <input
              type="submit"
              value="Create new House"
              onClick={async () => {
                const result = await createHouse(newHouse);
                if (result) {
                  let firstName = profile ? profile.firstName : "";
                  let lastName = profile ? profile.lastName : "";
                  let user_email = profile ? profile.email : "";
                  let start_and_end_date =
                    new Date(
                      new Date().getTime() - 480 * 1000 * 60
                    ).toISOString() + "";
                  let slack_result = await sendSlackMessage(
                    "New House Created (/admin/houseManager) by " +
                      firstName +
                      ", " +
                      lastName +
                      ", " +
                      user_email,
                    "House Name: " +
                      newHouse.name +
                      "\nHouse Color: " +
                      newHouse.color,
                    start_and_end_date,
                    start_and_end_date
                  );
                  // In theory we do optimistic local state updating, in practice, fuck it it'll do
                  window.location.reload();
                } else {
                  alert("Failed to create house");
                }
              }}
            />
          </Task>
          <div>{taskBlocks}</div>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

houseManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const currentHouses = await getHouses(req);

  // Null profile means user is not logged in
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentHouses,
  };
};

export default houseManager;
