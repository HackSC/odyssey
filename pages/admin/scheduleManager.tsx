import React, { useState } from "react";
import moment from "moment";

import {
  handleLoginRedirect,
  getProfile,
  sendSlackMessage,
  getCurrentEvents,
  saveEvent,
  deleteEvent,
} from "../../lib";
import { Head, Navbar, Footer } from "../../components";

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

const EditableCell = ({ profile, event }) => {
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
                let firstName = profile ? profile.firstName : "";
                let lastName = profile ? profile.lastName : "";
                let user_email = profile ? profile.email : "";
                let start_and_end_date =
                  new Date(
                    new Date().getTime() - 480 * 1000 * 60
                  ).toISOString() + "";
                let slack_result = await sendSlackMessage(
                  ":red_circle: Schedule Event DELETED (/admin/scheduleManager) executed by " +
                    firstName +
                    ", " +
                    lastName +
                    ", " +
                    user_email,
                  "Deleted Event Name: " +
                    currEvent.name +
                    "\nDeleted Event Description: " +
                    currEvent.description +
                    "\nDeleted Event Start Time: " +
                    currEvent.startsAt +
                    "\nDeleted Event End Time: " +
                    currEvent.endsAt,
                  start_and_end_date,
                  start_and_end_date
                );
                //if(slack_result.status !== 200) sendSlackMessage("!!! Schedule event was DELETED but we could not send a slack message with the details !!!", "", start_and_end_date, start_and_end_date);
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
  const [newEvent, setNewEvent] = useState({
    name: null,
    description: null,
    startsAt: null,
    endsAt: null,
  });

  const taskBlocks = currentEvents.events.map((event) => {
    return (
      <EditableCell
        key={Object.entries(event).join()}
        profile={profile}
        event={event}
      />
    );
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/scheduleManager" />
      <Background padding="30px 0">
        <Container>
          {" "}
          <Task style={{ flexWrap: "wrap" }}>
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
              style={{ margin: "1rem 0 0 0", padding: "5px" }}
              onClick={async () => {
                const result = await saveEvent(newEvent);
                if (result) {
                  let firstName = profile ? profile.firstName : "";
                  let lastName = profile ? profile.lastName : "";
                  let user_email = profile ? profile.email : "";
                  let start_and_end_date =
                    new Date(
                      new Date().getTime() - 480 * 1000 * 60
                    ).toISOString() + "";
                  let slack_result = await sendSlackMessage(
                    ":white_check_mark: Schedule Event Created (/admin/scheduleManager) executed by " +
                      firstName +
                      ", " +
                      lastName +
                      ", " +
                      user_email,
                    "New Event Name: " +
                      newEvent.name +
                      "\nNew Event Description: " +
                      newEvent.description +
                      "\nNew Event Start Time: " +
                      newEvent.startsAt +
                      "\nNew Event End Time: " +
                      newEvent.endsAt,
                    start_and_end_date,
                    start_and_end_date
                  );
                  //if(slack_result.status !== 200) sendSlackMessage("!!! NEW SCHEDULE EVENT WAS CREATED but we could not send a slack message with the details !!!", "", start_and_end_date, start_and_end_date);
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
