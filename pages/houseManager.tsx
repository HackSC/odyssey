import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getHouses, createHouse, updateHouse, deleteHouse } from "../lib/live";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

import { Background, Container, EditButton, Task, TaskInfo } from "../styles";

const EditableCell = ({ house }) => {
  const [currHouse, setCurrHouse] = useState(house);
  return (
    <Task>
      <TaskInfo>
        <input
          type="text"
          placeholder="name"
          value={currHouse.name}
          onChange={e => {
            setCurrHouse({ ...currHouse, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="color"
          value={currHouse.color}
          onChange={e => {
            setCurrHouse({ ...currHouse, type: e.target.value });
          }}
        />
      </TaskInfo>
      <EditButton
        onClick={async () => {
          const result = await updateHouse(currHouse);
          if (result) {
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

  const taskBlocks = currentHouses.houses.map(house => {
    return <EditableCell house={house} />;
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
                onChange={e => {
                  setNewHouse({
                    ...newHouse,
                    name: e.target.value
                  });
                }}
              />
              <input
                type="text"
                placeholder="color ex: #123456"
                onChange={e => {
                  setNewHouse({
                    ...newHouse,
                    color: e.target.value
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
    currentHouses
  };
};

export default houseManager;
