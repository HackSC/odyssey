import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import {
  getCurrentUnlockables,
  saveUnlockable,
  updateUnlockable
} from "../lib/live";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

const EditableCell = ({ unlockable }) => {
  const [currUnlockable, setCurrUnlockable] = useState(unlockable);
  return (
    <Task>
      <TaskInfo>
        <input
          type="number"
          placeholder="tier"
          value={currUnlockable.tier}
          onChange={e => {
            setCurrUnlockable({ ...currUnlockable, tier: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="pointThreshold"
          value={currUnlockable.pointThreshold}
          onChange={e => {
            setCurrUnlockable({
              ...currUnlockable,
              pointThreshold: e.target.value
            });
          }}
        />
        <select
          onChange={e => {
            const isPremium = e.target.value === "Premium";
            setCurrUnlockable({
              ...currUnlockable,
              isPremium: isPremium
            });
          }}
        >
          <option value="Premium">Premium</option>
          <option value="Standard">Standard</option>
        </select>
        <EditButton
          onClick={async () => {
            const result = await updateUnlockable(currUnlockable);
            if (result) {
              window.location.reload();
            } else {
              alert("failed to update unlockable");
            }
          }}
        >
          {" "}
          Update Unlockable{" "}
        </EditButton>
      </TaskInfo>
    </Task>
  );
};

const TaskManager = ({ profile, currentUnlockables }) => {
  const [newUnlockable, setNewUnlockable] = useState({});

  const taskBlocks = currentUnlockables.unlockables.map(unlockable => {
    return <EditableCell unlockable={unlockable} />;
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn activePage="admin" />
      <div>
        {" "}
        <Task>
          <TaskInfo>
            <input
              type="number"
              placeholder="tier"
              onChange={e => {
                setNewUnlockable({
                  ...newUnlockable,
                  tier: e.target.value
                });
              }}
            />
            <input
              type="number"
              placeholder="pointThreshold"
              onChange={e => {
                setNewUnlockable({
                  ...newUnlockable,
                  pointThreshold: e.target.value
                });
              }}
            />
            <select
              onChange={e => {
                const isPremium = e.target.value === "Premium";
                setNewUnlockable({
                  ...newUnlockable,
                  isPremium: isPremium
                });
              }}
            >
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
            </select>
          </TaskInfo>
          <input
            type="submit"
            value="Create new Unlockable"
            onClick={async () => {
              const result = await saveUnlockable(newUnlockable);
              if (result) {
                // In theory we do optimistic local state updating, in practice, fuck it it'll do
                window.location.reload();
              } else {
                alert("Failed to create Unlockable");
              }
            }}
          />
        </Task>
      </div>
      <div>{taskBlocks}</div>

      <Footer />
    </>
  );
};

TaskManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const currentUnlockables = await getCurrentUnlockables(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentUnlockables
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
