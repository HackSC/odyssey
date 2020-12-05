import React, { useState } from "react";

import { handleLoginRedirect, getProfile } from "../../lib/authenticate";
import { getCurrentEvents, saveEvent, deleteEvent } from "../../lib/live";
import Head from "../../components/Head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import moment from "moment";

import {
  Background,
  Container,
  EditButton,
  Task,
  TaskInfo,
  Description,
  EventTitle,
  TitleBox,
} from "../../styles";

import Step from "../../components/steps/Results";

const EditableCell = ({ event }) => {
  const [currEvent, setCurrEvent] = useState(event);
  const startTime = moment(
    currEvent.startsAt,
    "YYYY-MM-DDTHH:mm:ss.SSSZ",
    "UTC"
  ).format("hh:mm a");
  const endTime = moment(
    currEvent.endsAt,
    "YYYY-MM-DDTHH:mm:ss.SSSZ",
    "UTC"
  ).format("hh:mm a");

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
              {moment(
                currEvent.startsAt,
                "YYYY-MM-DDTHH:mm:ss.SSSZ",
                "UTC"
              ).format("MMM D")}
              , {startTime} - {endTime}
            </span>
          ) : (
            <span>
              {moment(
                currEvent.startsAt,
                "YYYY-MM-DDTHH:mm:ss.SSSZ",
                "UTC"
              ).format("MMM D hh:mm a")}{" "}
              -{" "}
              {moment(
                currEvent.endsAt,
                "YYYY-MM-DDTHH:mm:ss.SSSZ",
                "UTC"
              ).format("MMM D hh:mm a")}
            </span>
          )}
        </Description>
      </TaskInfo>
    </Task>
  );
};

const ScheduleManager = ({ profile, currentEvents }) => {
  const [newEvent, setNewEvent] = useState({});

  const taskBlocks = currentEvents.events.map((event) => {
    return <EditableCell event={event} />;
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/scheduleManager" />
      <Background padding="30px 0">
        <Container>
          {" "}
          <Task>
            <TaskInfo>
              <input
                type="text"
                placeholder="name"
                onChange={(e) => {
                  setNewEvent({
                    ...newEvent,
                    name: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="description"
                onChange={(e) => {
                  setNewEvent({
                    ...newEvent,
                    description: e.target.value,
                  });
                }}
              />
              <input
                type="datetime-local"
                placeholder="startsAt"
                onChange={(e) => {
                  setNewEvent({
                    ...newEvent,
                    startsAt: e.target.value,
                  });
                }}
              />
              <input
                type="datetime-local"
                placeholder="endsAt"
                onChange={(e) => {
                  setNewEvent({
                    ...newEvent,
                    endsAt: e.target.value,
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

ScheduleManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const currentEvents = await getCurrentEvents(req);

  // Null profile means user is not logged in
  if (!profile || profile.role !== "admin") {
    handleLoginRedirect(req);
  }

  return {
    profile,
    currentEvents,
  };
};

export default ScheduleManager;
