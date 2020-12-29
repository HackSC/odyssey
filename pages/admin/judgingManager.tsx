import React, { useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";
import {} from "styled-components/cssprop";

import { Head, Navbar, Footer } from "../../components";
import {
  handleLoginRedirect,
  getProfile,
  sendSlackMessage,
  getFullJudgeList,
  updateJudgingEntry,
  deleteJudging,
  getListOfJudges,
} from "../../lib";
import { createJudging, getListOfTeamsToJudge } from "../../lib/judging";
import {
  Background,
  Container,
  EditButton,
  CreateButton,
  Task,
  TaskInfo,
} from "../../styles";

const EditableCell = ({
  addToast,
  updateCurrentJudges,
  profile,
  judge,
  listOfJudges,
  teamList,
}) => {
  const [currJudge, setCurrJudge] = useState(judge);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  return (
    <FlexJudge>
      <JudgeInfo>
        <select
          onChange={(e) => {
            if (e.target.value !== null)
              setCurrJudge({
                ...currJudge,
                judgeId: e.target.value,
              });
          }}
          value={currJudge.judgeId}
        >
          {listOfJudges.map((single_judge) => {
            return (
              <option
                key={Object.entries(single_judge).toString()}
                value={single_judge.userId}
              >
                Judge:{" "}
                {single_judge.firstName ? single_judge.firstName + "," : ""}{" "}
                {single_judge.lastName ? single_judge.lastName + "," : ""}{" "}
                {single_judge.userId}
              </option>
            );
          })}
        </select>
        <select
          onChange={(e) => {
            if (e.target.value !== null)
              setCurrJudge({
                ...currJudge,
                teamId: e.target.value,
              });
          }}
          value={currJudge.teamId}
        >
          {teamList.map((single_team) => {
            return (
              <option
                key={Object.entries(single_team).toString()}
                value={single_team.id}
              >
                Team: {single_team.name ? single_team.name + "," : ""}{" "}
                {single_team.id}
              </option>
            );
          })}
        </select>
        <input
          type="datetime-local"
          placeholder="judging start time"
          style={{ width: "-webkit-fill-available" }}
          value={new Date(
            new Date(Date.parse(currJudge.startsAt)).setHours(
              new Date(Date.parse(currJudge.startsAt)).getHours() - 8
            )
          )
            .toISOString()
            .replace("Z", "")}
          onChange={(e) => {
            setCurrJudge({
              ...currJudge,
              startsAt: e.target.value,
            });
          }}
        />
        <input
          type="datetime-local"
          placeholder="judging end time"
          style={{ width: "-webkit-fill-available" }}
          value={new Date(
            new Date(Date.parse(currJudge.endsAt)).setHours(
              new Date(Date.parse(currJudge.endsAt)).getHours() - 8
            )
          )
            .toISOString()
            .replace("Z", "")}
          onChange={(e) => {
            setCurrJudge({
              ...currJudge,
              endsAt: e.target.value,
            });
          }}
        />
        <input
          type="text"
          placeholder="link to zoom meeting"
          value={currJudge.zoomLink}
          onChange={(e) => {
            setCurrJudge({ ...currJudge, zoomLink: e.target.value });
          }}
        />
      </JudgeInfo>
      {updating ? (
        <SyncLoader size={5} color={"#FF8379"} />
      ) : (
        <JudgeUpdate
          onClick={async () => {
            setUpdating(true);
            const result = await updateJudgingEntry(currJudge);
            if (result) {
              let firstName = profile ? profile.firstName : "";
              let lastName = profile ? profile.lastName : "";
              let user_email = profile ? profile.email : "";
              let start_and_end_date =
                new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
                "";
              let slack_result = await sendSlackMessage(
                ":hammer_and_wrench: Judging Event UPDATED (/admin/judgingManager) by " +
                  firstName +
                  ", " +
                  lastName +
                  ", " +
                  user_email,
                "Judge Id: " +
                  currJudge.judgeId +
                  "\nTeam Id: " +
                  currJudge.teamId,
                start_and_end_date,
                start_and_end_date
              );
              let updated_judges = await getFullJudgeList(null);
              updateCurrentJudges(updated_judges);
              addToast("Updated Judging Event!", { appearance: "success" });
              //window.location.reload();
            } else {
              addToast("Error: Failed to update judging event", {
                appearance: "error",
              });
            }
            setUpdating(false);
          }}
        >
          {" "}
          Update Judging Event{" "}
        </JudgeUpdate>
      )}
      {deleting ? (
        <SyncLoader
          size={5}
          color={"#FF8379"}
          css={"marin:0.5rem;padding:0.5rem;"}
        />
      ) : (
        <JudgeDelete
          onClick={async () => {
            setDeleting(true);
            const result = await deleteJudging(currJudge);
            if (result) {
              let firstName = profile ? profile.firstName : "";
              let lastName = profile ? profile.lastName : "";
              let user_email = profile ? profile.email : "";
              let start_and_end_date =
                new Date(new Date().getTime() - 480 * 1000 * 60).toISOString() +
                "";
              let slack_result = await sendSlackMessage(
                ":red_circle: Judging Event DELETED (/admin/judgingManager) by " +
                  firstName +
                  ", " +
                  lastName +
                  ", " +
                  user_email,
                "Judge Id: " +
                  currJudge.judgeId +
                  "\nTeam Id: " +
                  currJudge.teamId,
                start_and_end_date,
                start_and_end_date
              );
              let updated_judges = await getFullJudgeList(null);
              updateCurrentJudges(updated_judges);
              addToast("Deleted Judging Event!", { appearance: "success" });
            } else {
              addToast("Error: Failed to delete judging event", {
                appearance: "error",
              });
            }
            setDeleting(false);
          }}
        >
          Delete Judging Event
        </JudgeDelete>
      )}
    </FlexJudge>
  );
};

const JudgingManager = ({ profile, propJudgeList, listOfJudges, teamList }) => {
  const [judgeList, setJudgeList] = useState(propJudgeList);
  const [newJudge, setNewJudge] = useState({
    judgeId: listOfJudges.length > 0 ? listOfJudges[0].userId : null,
    teamId: teamList.length > 0 ? teamList[0].id : null,
    startsAt: null,
    endsAt: null,
    zoomLink: null,
  });

  const { addToast } = useToasts();

  const taskBlocks = judgeList.map((judge) => {
    return (
      <EditableCell
        addToast={addToast}
        key={Object.entries(judge).join()}
        updateCurrentJudges={(newJudges) => setJudgeList(newJudges)}
        profile={profile}
        judge={judge}
        listOfJudges={listOfJudges}
        teamList={teamList}
      />
    );
  });
  return (
    <>
      <Head title="HackSC Odyssey - Results" />
      <Navbar loggedIn admin activePage="/JudgingManager" />
      <Background padding="2rem">
        <Container>
          <h1 style={{ margin: "1rem" }}>Manage Judging Schedule</h1>
          <FlexJudge>
            <JudgeInfo>
              <select
                onChange={(e) => {
                  if (e.target.value !== null)
                    setNewJudge({
                      ...newJudge,
                      judgeId: e.target.value,
                    });
                }}
                value={newJudge.judgeId}
              >
                {listOfJudges.map((single_judge) => {
                  return (
                    <option
                      key={Object.entries(single_judge).toString()}
                      value={single_judge.userId}
                    >
                      Judge:{" "}
                      {single_judge.firstName
                        ? single_judge.firstName + ","
                        : ""}{" "}
                      {single_judge.lastName ? single_judge.lastName + "," : ""}{" "}
                      {single_judge.userId}
                    </option>
                  );
                })}
              </select>
              <select
                onChange={(e) => {
                  if (e.target.value !== null)
                    setNewJudge({
                      ...newJudge,
                      teamId: e.target.value,
                    });
                }}
                value={newJudge.teamId}
              >
                {teamList.map((single_team) => {
                  return (
                    <option
                      key={Object.entries(single_team).toString()}
                      value={single_team.id}
                    >
                      Team: {single_team.name ? single_team.name + "," : ""}{" "}
                      {single_team.id}
                    </option>
                  );
                })}
              </select>
              <input
                type="datetime-local"
                placeholder="judging start time"
                style={{ width: "-webkit-fill-available" }}
                onChange={(e) => {
                  setNewJudge({
                    ...newJudge,
                    startsAt: e.target.value,
                  });
                }}
              />
              <input
                type="datetime-local"
                placeholder="judging end time"
                style={{ width: "-webkit-fill-available" }}
                onChange={(e) => {
                  setNewJudge({
                    ...newJudge,
                    endsAt: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="enter link to zoom meeting..."
                onChange={(e) => {
                  setNewJudge({ ...newJudge, zoomLink: e.target.value });
                }}
              />
            </JudgeInfo>
            <JudgeCreate
              type="submit"
              value="Create new Judging Event"
              onClick={async () => {
                const result = await createJudging(newJudge);
                if (result) {
                  let firstName = profile ? profile.firstName : "";
                  let lastName = profile ? profile.lastName : "";
                  let user_email = profile ? profile.email : "";
                  let start_and_end_date =
                    new Date(
                      new Date().getTime() - 480 * 1000 * 60
                    ).toISOString() + "";
                  let slack_result = await sendSlackMessage(
                    ":white_check_mark: New House Created (/admin/judgingManager) by " +
                      firstName +
                      ", " +
                      lastName +
                      ", " +
                      user_email,
                    "Judge Id: " +
                      newJudge.judgeId +
                      "\n Team Id: " +
                      newJudge.teamId,
                    start_and_end_date,
                    start_and_end_date
                  );
                  let updated_judges = await getFullJudgeList(null);
                  setJudgeList(updated_judges);
                  addToast("Created Judging Event!", { appearance: "success" });
                  // In theory we do optimistic local state updating, in practice, fuck it it'll do
                } else {
                  addToast("Error: Failed to create judging event", {
                    appearance: "error",
                  });
                }
              }}
            >
              Create new Judging Event
            </JudgeCreate>
          </FlexJudge>
          <div>{taskBlocks}</div>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

JudgingManager.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);
  const propJudgeList = await getFullJudgeList(req);
  const listOfJudges = await getListOfJudges(req);
  const teamList = await getListOfTeamsToJudge(req);

  // Null profile means user is not logged in
  if (!profile || !(profile.role == "admin" || profile.role == "superadmin")) {
    handleLoginRedirect(req);
  }

  return {
    profile,
    propJudgeList,
    listOfJudges,
    teamList,
  };
};

const FlexJudge = styled(Task)`
  flex-wrap: wrap;
  justify-content: space-between;
`;

const JudgeInfo = styled(TaskInfo)`
  flex-basis: 70%;
  margin: 1rem auto;
`;

const JudgeCreate = styled(CreateButton)`
  flex-basis: 20%;
  min-width: 6rem;
  margin: auto;
`;

const JudgeUpdate = styled(EditButton)`
  flex-basis: 10%;
  min-width: 6rem;
  margin: auto;
`;

const JudgeDelete = styled(EditButton)`
  flex-basis: 10%;
  min-width: 6rem;
  margin: auto;
`;

export default JudgingManager;
