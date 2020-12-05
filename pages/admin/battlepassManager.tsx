import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../../lib/authenticate";

import {
  getCurrentUnlockables,
  saveUnlockable,
  updateUnlockable,
} from "../../lib/live";

import { Head, Navbar, Footer } from "../../components";

import {
  Background,
  Container,
  EditButton,
  Task,
  TaskInfo,
} from "../../styles";

const EditableCell = ({ unlockable }) => {
  const [currUnlockable, setCurrUnlockable] = useState(unlockable);
  return (
    <Task
      id={`${currUnlockable.tier}-${currUnlockable.pointThreshold}-${currUnlockable.isPremium}`}
    >
      <TaskInfo>
        <input
          type="number"
          placeholder="tier"
          value={currUnlockable.tier}
          onChange={(e) => {
            setCurrUnlockable({ ...currUnlockable, tier: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="pointThreshold"
          value={currUnlockable.pointThreshold}
          onChange={(e) => {
            setCurrUnlockable({
              ...currUnlockable,
              pointThreshold: e.target.value,
            });
          }}
        />
        <select
          onChange={(e) => {
            const isPremium = e.target.value === "Premium";
            setCurrUnlockable({
              ...currUnlockable,
              isPremium: isPremium,
            });
          }}
          value={currUnlockable.isPremium ? "Premium" : "Standard"}
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

const BattlepassManager = ({ profile, currentUnlockables }) => {
  const [newUnlockable, setNewUnlockable] = useState({});

  const taskBlocks = currentUnlockables.unlockables.map((unlockable) => {
    return <EditableCell unlockable={unlockable} />;
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/battlepassManager" />
      <Background padding="30px 0">
        <Container>
          {" "}
          <Task>
            <TaskInfo>
              <input
                type="number"
                placeholder="tier"
                onChange={(e) => {
                  setNewUnlockable({
                    ...newUnlockable,
                    tier: e.target.value,
                  });
                }}
              />
              <input
                type="number"
                placeholder="pointThreshold"
                onChange={(e) => {
                  setNewUnlockable({
                    ...newUnlockable,
                    pointThreshold: e.target.value,
                  });
                }}
              />
              <select
                onChange={(e) => {
                  const isPremium = e.target.value === "Premium";
                  setNewUnlockable({
                    ...newUnlockable,
                    isPremium: isPremium,
                  });
                }}
                //@ts-ignore
                value={newUnlockable.isPremium ? "Premium" : "Standard"}
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
          <div>{taskBlocks}</div>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

BattlepassManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const currentUnlockables = await getCurrentUnlockables(req);

  // Null profile means user is not logged in
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentUnlockables,
  };
};

export default BattlepassManager;
