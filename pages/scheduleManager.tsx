import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getCurrentEvents, saveEvent, deleteEvent } from "../lib/live";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

import { Button } from "../styles";

import Step from "../components/steps/Results";

const EditableCell = ({ event }) => {
  const [currEvent, setCurrEvent] = useState(event);
  console.log(event);
  return (
    <Task>
      <TaskInfo>
        <p>{currEvent.name}</p>
        <p>{currEvent.description}</p>
        <p>{currEvent.startsAt}</p>
        <p>{currEvent.endsAt}</p>
        <EditButton
          onClick={async () => {
            const result = await deleteEvent(currEvent);
            if (result) {
              window.location.reload();
            } else {
              alert("failed to delete event");
            }
          }}
        >
          Delete Event
        </EditButton>
      </TaskInfo>
    </Task>
  );
};

const TaskManager = ({ profile, currentEvents }) => {
  const [newEvent, setNewEvent] = useState({});

  const taskBlocks = currentEvents.events.map(event => {
    return <EditableCell event={event} />;
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
              type="text"
              placeholder="name"
              onChange={e => {
                setNewEvent({
                  ...newEvent,
                  name: e.target.value
                });
              }}
            />
            <input
              type="text"
              placeholder="description"
              onChange={e => {
                setNewEvent({
                  ...newEvent,
                  description: e.target.value
                });
              }}
            />
            <input
              type="datetime-local"
              placeholder="startsAt"
              onChange={e => {
                setNewEvent({
                  ...newEvent,
                  startsAt: e.target.value
                });
              }}
            />
            <input
              type="datetime-local"
              placeholder="endsAt"
              onChange={e => {
                setNewEvent({
                  ...newEvent,
                  endsAt: e.target.value
                });
              }}
            />
          </TaskInfo>
          <input
            type="submit"
            value="Create new Event"
            onClick={async () => {
              const result = await saveEvent(newEvent);
              if (result) {
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
  const currentEvents = await getCurrentEvents(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentEvents
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
