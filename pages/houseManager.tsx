import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getHouses, createHouse, updateHouse } from "../lib/live";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

import { Flex, Container, Background } from "../styles";

const EditableCell = ({ house }) => {
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
        <EditButton
          onClick={async () => {
            const result = await updateHouse(currHouse);
            if (result) {
              window.location.reload();
            } else {
              alert("failed to update task");
            }
          }}
        >
          {" "}
          Update Task{" "}
        </EditButton>
      </TaskInfo>
    </Task>
  );
};

const TaskManager = ({ profile, currentHouses }) => {
  const [newHouse, setNewHouse] = useState({});

  const taskBlocks = currentHouses.houses.map((house) => {
    return <EditableCell house={house} />;
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/houseManager" />
      <Background>
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
                  // In theory we do optimistic local state updating, in practice, fuck it it'll do
                  window.location.reload();
                } else {
                  alert("Failed to create task");
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

TaskManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const currentHouses = await getHouses(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentHouses,
  };
};

const TaskText = styled.p`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.gray50};
`;

const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const TaskName = styled.div`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.black};
`;

const EditButton = styled.button`
  margin: 10 10 10px;
`;

const Task = styled.div`
  box-sizing: border-box;
  padding: 24px 36px;
  margin: 10 10 16px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  max-width: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.25s all;
  justify-content: left;
  &:hover {
    transform: scale(1.025);
  }
`;

export default TaskManager;
