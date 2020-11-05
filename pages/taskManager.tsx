import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getCurrentTasks, saveTask, updateTask, deleteTask } from "../lib/live";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Background, Container } from "../styles";
import styled from "styled-components";

const EditableCell = ({ task }) => {
  const [currTaskValue, setCurrTaskValue] = useState(task);
  return (
    <Task>
      <TaskInfo>
        <input
          type="text"
          placeholder="name"
          value={currTaskValue.name}
          onChange={e => {
            setCurrTaskValue({ ...currTaskValue, name: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="type"
          value={currTaskValue.type}
          onChange={e => {
            setCurrTaskValue({ ...currTaskValue, type: e.target.value });
          }}
        />
        <input
          type="number"
          placeholder="points"
          value={currTaskValue.points}
          onChange={e => {
            setCurrTaskValue({ ...currTaskValue, points: e.target.value });
          }}
        />
        <select
          onChange={e => {
            const isActive = e.target.value === "Active";
            setCurrTaskValue({
              ...currTaskValue,
              isActive: isActive
            });
          }}
          //@ts-ignore
          value={currTaskValue.isActive ? "Active" : "Inactive"}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <EditButton
          onClick={async () => {
            const result = await updateTask(currTaskValue);
            console.log(currTaskValue);
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
            console.log(result);
            if (result) {
              window.location.reload();
            } else {
              alert("failed to delete task");
            }
          }}
        >
          Delete Task
        </EditButton>
      </TaskInfo>
    </Task>
  );
};

const TaskManager = ({ profile, currentTasks }) => {
  const [newTask, setNewTask] = useState({});

  const taskBlocks = currentTasks.tasks.map(task => {
    return <EditableCell task={task} />;
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/" />

      <Background>
        <Container>
          {" "}
          <Task>
            <TaskInfo>
              <input
                type="text"
                placeholder="name"
                onChange={e => {
                  setNewTask({
                    ...newTask,
                    name: e.target.value
                  });
                }}
              />
              <input
                type="text"
                placeholder="type"
                onChange={e => {
                  setNewTask({
                    ...newTask,
                    type: e.target.value
                  });
                }}
              />
              <input
                type="number"
                placeholder="points"
                onChange={e => {
                  setNewTask({
                    ...newTask,
                    points: e.target.value
                  });
                }}
              />
              <select
                onChange={e => {
                  const isActive = e.target.value === "Active";
                  setNewTask({
                    ...newTask,
                    isActive: isActive
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
                console.log(" UPPER RESULT: ");
                console.log(result);
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
  const currentTasks = await getCurrentTasks(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentTasks
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
