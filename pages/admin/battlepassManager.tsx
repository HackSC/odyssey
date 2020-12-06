import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";

import { Head, Navbar, Footer } from "../../components";
import {
  handleLoginRedirect,
  getProfile,
  getCurrentUnlockables,
  saveUnlockable,
  updateUnlockable,
  deleteUnlockable,
  sendSlackMessage,
} from "../../lib";
import {
  Background,
  Container,
  EditButton,
  Task,
  TaskInfo,
} from "../../styles";

const EditableCell = ({ addToast, profile, unlockable }) => {
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
      </TaskInfo>
      <EditButton
        onClick={async () => {
          const result = await updateUnlockable(currUnlockable);
          if (result) {
            let firstName = profile ? profile.firstName : "";
            let lastName = profile ? profile.lastName : "";
            let user_email = profile ? profile.email : "";
            let start_and_end_date =
              new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
              "";
            let slack_result = await sendSlackMessage(
              ":ticket: :pencil: Battlepass Unlockable UPDATED (/admin/battlepassManager) executed by " +
                firstName +
                ", " +
                lastName +
                ", " +
                user_email,
              "Unlockable tier: " +
                currUnlockable.tier +
                "\nUnlockable point threshold: " +
                currUnlockable.pointThreshold +
                "\nUnlockable is premium: " +
                currUnlockable.isPremium,
              start_and_end_date,
              start_and_end_date
            );
            addToast("Updated unlockable!", { appearance: "success" });
            //window.location.reload();
          } else {
            addToast("Error: Failed to update unlockable", {
              appearance: "error",
            });
          }
        }}
      >
        {" "}
        Update Unlockable{" "}
      </EditButton>
      <EditButton
        onClick={async () => {
          const delete_res = await deleteUnlockable(currUnlockable);
          if (delete_res) {
            let firstName = profile ? profile.firstName : "";
            let lastName = profile ? profile.lastName : "";
            let user_email = profile ? profile.email : "";
            let start_and_end_date =
              new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
              "";
            let slack_result = await sendSlackMessage(
              ":ticket: :red_circle: Unlockable DELETED (/admin/taskManager) executed by " +
                firstName +
                ", " +
                lastName +
                ", " +
                user_email,
              "Unlockable tier: " +
                currUnlockable.tier +
                "\nUnlockable point threshold: " +
                currUnlockable.pointThreshold +
                "\nUnlockable is premium: " +
                currUnlockable.isPremium,
              start_and_end_date,
              start_and_end_date
            );
            addToast("Deleted Unlockable!", { appearance: "success" });
            window.location.reload();
          } else {
            addToast("Error: Failed to delete unlockable", {
              appearance: "error",
            });
          }
        }}
      >
        Delete Unlockable
      </EditButton>
    </Task>
  );
};

const BattlepassManager = ({ profile, currentUnlockables }) => {
  const [newUnlockable, setNewUnlockable] = useState({
    tier: null,
    pointThreshold: null,
    isPremium: null,
  });

  const { addToast } = useToasts();

  const taskBlocks = currentUnlockables.unlockables.map((unlockable) => {
    return (
      <EditableCell
        addToast={addToast}
        profile={profile}
        key={Object.entries(unlockable).join()}
        unlockable={unlockable}
      />
    );
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
                  let firstName = profile ? profile.firstName : "";
                  let lastName = profile ? profile.lastName : "";
                  let user_email = profile ? profile.email : "";
                  let start_and_end_date =
                    new Date(
                      new Date().getTime() - 480 * 1000 * 60
                    ).toISOString() + "";
                  let slack_result = await sendSlackMessage(
                    ":ticket: :white_check_mark: Battlepass Unlockable CREATED (/admin/battlepassManager) executed by " +
                      firstName +
                      ", " +
                      lastName +
                      ", " +
                      user_email,
                    "Unlockable tier: " +
                      newUnlockable.tier +
                      "\nUnlockable point threshold: " +
                      newUnlockable.pointThreshold +
                      "\nUnlockable is premium: " +
                      newUnlockable.isPremium,
                    start_and_end_date,
                    start_and_end_date
                  );
                  addToast("Created Unlockable!", { appearance: "success" });
                  // In theory we do optimistic local state updating, in practice, fuck it it'll do
                  window.location.reload();
                } else {
                  addToast("Error: Failed to create unlockable", {
                    appearance: "error",
                  });
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
