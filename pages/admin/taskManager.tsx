import React, { useState } from "react";

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

const EditableCell = ({ profile, task }) => {
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
            let firstName = profile ? profile.firstName : "";
            let lastName = profile ? profile.lastName : "";
            let user_email = profile ? profile.email : "";
            let start_and_end_date =
              new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
              "";
            let slack_result = await sendSlackMessage(
              ":hammer_and_wrench: Task UPDATED (/admin/taskManager) executed by " +
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
            let firstName = profile ? profile.firstName : "";
            let lastName = profile ? profile.lastName : "";
            let user_email = profile ? profile.email : "";
            let start_and_end_date =
              new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
              "";
            let slack_result = await sendSlackMessage(
              ":red_circle: Task DELETED (/admin/taskManager) executed by " +
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

const TaskManager = ({ profile, currentTasks }) => {
  const [newTask, setNewTask] = useState({
    name: null,
    type: null,
    points: null,
    isActive: null,
  });

  const taskBlocks = currentTasks.tasks.map((task) => {
    return (
      <EditableCell
        key={Object.entries(task).join()}
        profile={profile}
        task={task}
      />
    );
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/taskManager" />
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
                  let firstName = profile ? profile.firstName : "";
                  let lastName = profile ? profile.lastName : "";
                  let user_email = profile ? profile.email : "";
                  let start_and_end_date =
                    new Date(
                      new Date().getTime() - 480 * 1000 * 60
                    ).toISOString() + "";
                  let slack_result = await sendSlackMessage(
                    ":white_check_mark: Task CREATED (/admin/taskManager) executed by " +
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
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentTasks,
  };
};

export default TaskManager;
