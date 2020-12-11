import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useToasts } from "react-toast-notifications";

import {
  handleLoginRedirect,
  getProfile,
  sendSlackMessage,
  getCurrentTasks,
  saveTask,
  updateTask,
  deleteTask,
} from "../../lib";
import { Head, Navbar, Footer } from "../../components";

import {
  Background,
  Container,
  EditButton,
  Task,
  TaskInfo,
} from "../../styles";

const EditableCell = ({ addToast, profile, task }) => {
  const [currTaskValue, setCurrTaskValue] = useState(task);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <Task>
      <TaskInfo>
        <input
          type="text"
          placeholder="name"
          value={currTaskValue.name}
          onChange={(e) => {
            setCurrTaskValue({ ...currTaskValue, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="type"
          value={currTaskValue.type}
          onChange={(e) => {
            setCurrTaskValue({ ...currTaskValue, type: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="points"
          value={currTaskValue.points}
          onChange={(e) => {
            setCurrTaskValue({ ...currTaskValue, points: e.target.value });
          }}
        />
        <select
          onChange={(e) => {
            const isActive = e.target.value === "Active";
            setCurrTaskValue({
              ...currTaskValue,
              isActive: isActive,
            });
          }}
          //@ts-ignore
          value={currTaskValue.isActive ? "Active" : "Inactive"}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </TaskInfo>
      {updating ? (
        <SyncLoader size={5} color={"#FF8379"} />
      ) : (
        <EditButton
          onClick={async () => {
            setUpdating(true);
            const result = await updateTask(currTaskValue);
            if (result) {
              let firstName = profile ? profile.firstName : "";
              let lastName = profile ? profile.lastName : "";
              let user_email = profile ? profile.email : "";
              let start_and_end_date =
                new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
                "";
              let slack_result = await sendSlackMessage(
                ":hammer_and_wrench: Helpful Link UPDATED (/admin/helpfulLinkManager) executed by " +
                  firstName +
                  ", " +
                  lastName +
                  ", " +
                  user_email,
                "Task Name: " +
                  currTaskValue.name +
                  "\nTask Type: " +
                  currTaskValue.type +
                  "\nTask points: " +
                  currTaskValue.points +
                  "\nTask isActive: " +
                  currTaskValue.isActive,
                start_and_end_date,
                start_and_end_date
              );
              addToast("Updated Task!", { appearance: "success" });
              // window.location.reload();
            } else {
              addToast("Error: Failed to update task!", {
                appearance: "error",
              });
            }
            setUpdating(false);
          }}
        >
          Update Task
        </EditButton>
      )}
      {deleting ? (
        <SyncLoader
          size={5}
          color={"#FF8379"}
          css={"marin:0.5rem;padding:0.5rem;"}
        />
      ) : (
        <EditButton
          onClick={async () => {
            setDeleting(true);
            const result = await deleteTask(currTaskValue);
            if (result) {
              let firstName = profile ? profile.firstName : "";
              let lastName = profile ? profile.lastName : "";
              let user_email = profile ? profile.email : "";
              let start_and_end_date =
                new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
                "";
              let slack_result = await sendSlackMessage(
                ":red_circle: Task DELETED (/admin/HelpfulLinkManager) executed by " +
                  firstName +
                  ", " +
                  lastName +
                  ", " +
                  user_email,
                "Task Name: " +
                  currTaskValue.name +
                  "\nTask Type: " +
                  currTaskValue.type +
                  "\nTask points: " +
                  currTaskValue.points +
                  "\nTask isActive: " +
                  currTaskValue.isActive,
                start_and_end_date,
                start_and_end_date
              );
              addToast("Deleted Task!", { appearance: "success" });
              window.location.reload();
            } else {
              addToast("Error: Failed to delete task!", {
                appearance: "error",
              });
            }
            setDeleting(false);
          }}
        >
          Delete Task
        </EditButton>
      )}
    </Task>
  );
};

const HelpfulLinkManager = ({ profile, currentTasks }) => {
  const [newTask, setNewTask] = useState({
    name: null,
    type: null,
    points: null,
    isActive: null,
  });

  const { addToast } = useToasts();

  const taskBlocks = currentTasks.tasks.map((task) => {
    return (
      <EditableCell
        addToast={addToast}
        key={Object.entries(task).join()}
        profile={profile}
        task={task}
      />
    );
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/HelpfulLinkManager" />
      <Background padding="2rem">
        <Container>
          <h1 style={{ margin: "1rem" }}>Manage Helpful Links</h1>
          <Task>
            <TaskInfo>
              <input
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setNewTask({
                    ...newTask,
                    name: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="type"
                onChange={(e) => {
                  setNewTask({
                    ...newTask,
                    type: e.target.value,
                  });
                }}
              />
              <input
                type="number"
                placeholder="points"
                onChange={(e) => {
                  setNewTask({
                    ...newTask,
                    points: e.target.value,
                  });
                }}
              />
              <select
                onChange={(e) => {
                  const isActive = e.target.value === "Active";
                  setNewTask({
                    ...newTask,
                    isActive: isActive,
                  });
                }}
                //@ts-ignore
                value={newTask.isActive ? "Active" : "Inactive"}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </TaskInfo>
            <input
              type="submit"
              value="Create new Task"
              onClick={async () => {
                const result = await saveTask(newTask);
                if (result) {
                  let firstName = profile ? profile.firstName : "";
                  let lastName = profile ? profile.lastName : "";
                  let user_email = profile ? profile.email : "";
                  let start_and_end_date =
                    new Date(
                      new Date().getTime() - 480 * 1000 * 60
                    ).toISOString() + "";
                  let slack_result = await sendSlackMessage(
                    ":white_check_mark: Task CREATED (/admin/HelpfulLinkManager) executed by " +
                      firstName +
                      ", " +
                      lastName +
                      ", " +
                      user_email,
                    "Task Name: " +
                      newTask.name +
                      "\nTask Type: " +
                      newTask.type +
                      "\nTask points: " +
                      newTask.points +
                      "\nTask isActive: " +
                      newTask.isActive,
                    start_and_end_date,
                    start_and_end_date
                  );
                  addToast("Created Task!", { appearance: "success" });
                  // In theory we do optimistic local state updating, in practice, fuck it it'll do
                  window.location.reload();
                } else {
                  addToast("Error: Failed to create task!", {
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

HelpfulLinkManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const currentTasks = await getCurrentTasks(req);

  // Null profile means user is not logged in
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentTasks,
  };
};

export default HelpfulLinkManager;
