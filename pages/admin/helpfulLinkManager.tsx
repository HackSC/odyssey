import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../../lib/authenticate";
import {
  getCurrentTasks,
  saveTask,
  updateTask,
  deleteTask,
} from "../../lib/live";
import { Head, Navbar, Footer } from "../../components";

import {
  Background,
  Container,
  EditButton,
  Task,
  TaskInfo,
} from "../../styles";

// TODO: IMPLEMENT THIS COMPONENT

const EditableCell = ({ task }) => {
  const [currTaskValue, setCurrTaskValue] = useState(task);
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
      <EditButton
        onClick={async () => {
          const result = await updateTask(currTaskValue);
          if (result) {
            window.location.reload();
          } else {
            alert("failed to update task");
          }
        }}
      >
        Update Task
      </EditButton>
      <EditButton
        onClick={async () => {
          const result = await deleteTask(currTaskValue);
          if (result) {
            window.location.reload();
          } else {
            alert("failed to delete task");
          }
        }}
      >
        Delete Task
      </EditButton>
    </Task>
  );
};

const HelpfulLinkManager = ({ profile, currentTasks }) => {
  const [newTask, setNewTask] = useState({});

  const taskBlocks = currentTasks.tasks.map((task) => {
    return <EditableCell key={Object.entries(task).join()} task={task} />;
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/admin/helpfulLinkManager" />
      <Background padding="30px 0">
        <Container>
          {" "}
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
