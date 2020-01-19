import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getCurrentTasks, saveTask } from "../lib/live";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

import { Button } from "../styles";

import Step from "../components/steps/Results";

function renderTask(task) {
  return (
    <Task>
      <TaskInfo>
        <TaskText>{task.id}</TaskText>
        <TaskName>Go to Dinner</TaskName>
        <TaskText>Volunteer</TaskText>
      </TaskInfo>
      <DelButton
        id={task.id}
        onClick={e => {
          // This is kinda a hack, but this is internal so I don't think it matters
          //@ts-ignore
          console.log(e.target.id);
        }}
      >
        {" "}
        Delete{" "}
      </DelButton>
    </Task>
  );
}
const TaskManager = ({ profile, currentTasks }) => {
  const taskBlocks = currentTasks.tasks.map(task => {
    return renderTask(task);
  });

  const [newTask, setNewTask] = useState({});
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn activePage="admin" />
      <div>
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
          </TaskInfo>
          <input
            type="submit"
            value="Create new Task"
            onClick={async () => {
              const result = await saveTask(newTask);
              if (result === true) {
                // In theory we do optimistic local state updating, in practice, fuck it it'll do
                window.location.reload();
              } else {
                alert("Failed to create task");
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

const DelButton = styled.button``;

const TaskName = styled.div`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.black};
`;

const Task = styled.div`
  box-sizing: border-box;
  padding: 24px 36px;
  margin: 0 0 16px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  max-width: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.25s all;
  justify-content: space-around;
  &:hover {
    transform: scale(1.025);
  }
`;

export default TaskManager;
