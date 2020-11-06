import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";
import { getCurrentEvents, saveEvent, deleteEvent } from "../lib/live";
import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styled from "styled-components";

import moment from "moment";

import { Button, Background, Container } from "../styles";

import Step from "../components/steps/Results";

const EditableCell = ({ event }) => {
  const [currEvent, setCurrEvent] = useState(event);
  console.log(event);
  const startTime = moment(
    currEvent.startsAt,
    "YYYY-MM-DDTHH:mm:ss.SSSZ"
  ).format("hh:mm a");
  const endTime = moment(currEvent.endsAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
    "hh:mm a"
  );
  return (
    <Task>
      <TaskInfo>
        <TitleBox>
          <EventTitle>{currEvent.name}</EventTitle>
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
            Delete
          </EditButton>
        </TitleBox>
        <Description>
          <b>Description: </b>
          <span>{currEvent.description}</span>
        </Description>
        <Description>
          <b>Time: </b>
          {moment(currEvent.startsAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
            "MM/DD/YYYY"
          ) ==
          moment(currEvent.endsAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
            "MM/DD/YYYY"
          ) ? (
            <span>
              {moment(currEvent.startsAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                "MMM D"
              )}
              , {startTime} - {endTime}
            </span>
          ) : (
            <span>
              {moment(currEvent.startsAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                "MMM D hh:mm a"
              )}{" "}
              -{" "}
              {moment(currEvent.endsAt, "YYYY-MM-DDTHH:mm:ss.SSSZ").format(
                "MMM D hh:mm a"
              )}
            </span>
          )}
        </Description>
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
      <Navbar loggedIn admin activePage="/scheduleManager" />

      <Background>
        <Container>
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
          <div>{taskBlocks}</div>
        </Container>
      </Background>
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
  width: 100%;
`;

const TaskName = styled.div`
  margin: 0 0 16px;
  color: ${({ theme }) => theme.colors.black};
`;

const EditButton = styled.button`
  width: 30px + 1vw;
  float: right;
  color: red;
  background-color: white;
  align-self: flex-start;
  border-radius: 5px;
  border: 2px solid red;
  margin-left: 1vw;
`;

const Task = styled.div`
  box-sizing: border-box;
  padding: 24px 36px;
  margin: 10 10 16px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.05);
  transition: 0.25s all;
  justify-content: left;
  &:hover {
    transform: scale(1.025);
  }
`;

const EventTitle = styled.div`
  font-size: calc(12px + 0.75vw);
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Description = styled.div`
  padding-top: 0.5vh;
`;

export default TaskManager;
