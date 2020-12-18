import React, { useState, setState } from "react";
import styled from "styled-components";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TeammateSuggestions from "../components/TeammateSuggestions";
import TeamSuggestions from "../components/TeamSuggestions";
import {
  Background,
  Container,
  Flex,
  Column,
  Card,
  Button,
  TextCardDiv,
} from "../styles";
import ButtonWithTextForm from "../components/ButtonWithTextForm";
import { useToasts } from "react-toast-notifications";
import MultiTextForm from "../components/MultiTextForm";
import {
  useProjectTeamSelf,
  getProjectTeamSelfFetch,
} from "../lib/api-sdk/projectTeamHooks";

import { getProfile } from "../lib/authenticate";
import {
  getPendingTeammateRequests,
  getTeammateSuggestions,
  getTeamSuggestions,
  getPendingTeamRequests,
} from "../lib/matching";

// import Router from "next/router";

type Props = {
  userId: String;
  lookingForTeam: Boolean;
  portfolioUrl: String;
  projectTeam: ProjectTeam;
  teammateSuggestions: Array<Object>;
  teamSuggestions: Array<Object>;
  pendingTeammateRequests: Array<Object>;
  pendingTeamRequests: Array<Object>;
};

const ProjectTeam = (props: Props) => {
  const { addToast } = useToasts();
  const onError = (e: string) => {
    addToast(e, { appearance: "error" });
  };
  const {
    projectTeam,
    createProjectTeamSelf,
    updateProjectTeamSelf,
    addPrizeSelf,
    removePrizeSelf,
    removeMemberSelf,
    addMemberProjectTeamSelf,
    joinProjectTeamSelf,
  } = useProjectTeamSelf({
    defaultOnError: onError,
    initialModel: props.projectTeam,
  });

  const handleJoinProjectTeam = (name: string) => {
    joinProjectTeamSelf(name);
  };

  const handleCreateProjectTeam = (name: string) => {
    const nameAsResource = name as ResourceID;
    createProjectTeamSelf({ name: nameAsResource });
  };

  async function handleRequestProjectTeam(teamId: number) {
    const urlRoute = "/api/teamMatching/request/";
    const result = await fetch(urlRoute, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        teamId: teamId,
        owner: "hacker",
      }),
    });
    return result.status === 200;
  }

  async function updateVisibility() {
    const urlRoute = "/api/profile/visibility/";
    const result = await fetch(urlRoute, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
    });
    return result.status === 200;
  }

  async function handleAddPortfolio(url: string) {
    const urlRoute = "/api/profile/portfolio/";

    const result = await fetch(urlRoute, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        portfolioUrl: url,
      }),
    });
    return result.status === 200;
  }

  const CreateTeamSection = ({
    lookingForTeam,
    portfolioUrl,
    teammateSuggestions,
    teamSuggestions,
    pendingTeammateRequests,
    pendingTeamRequests,
  }) => {
    const [visible, setVisible] = useState(lookingForTeam);
    const handleChangeVisibility = () => {
      setVisible(!visible);
      updateVisibility();
    };

    return (
      <>
        <h1>HackSC Project Team Setup</h1>
        <p>
          On this tab, you can join, create, and view your HackSC Project. To
          join an existing project, simply enter a team code given to you by a
          team mate. If you'd like to create a new project, enter a project name
          and send out your team's code to potential team mates.
        </p>
        <NoTeamFlex direction="row" tabletVertical justify="space-between">
          <Column flexBasis={48}>
            <ButtonWithTextForm
              title="Join Team"
              label="Enter your team name"
              buttonText="Join"
              onSubmit={handleJoinProjectTeam}
              initial=""
            />
          </Column>

          <Column flexBasis={48}>
            <ButtonWithTextForm
              title="Create Team"
              label="Enter a team name"
              buttonText="Create"
              onSubmit={handleCreateProjectTeam}
              initial=""
            />
          </Column>
        </NoTeamFlex>
        {props.projectTeam ? (
          <TeammateSuggestions teammateSuggestions={teammateSuggestions} />
        ) : (
          <>
            <NoTeamFlex direction="row" tabletVertical justify="space-between">
              <Column flexBasis={48}>
                <Title>Edit Profile</Title>
                <ChangeProfileOption>
                  <input
                    name="visibility"
                    type="checkbox"
                    checked={visible}
                    onChange={handleChangeVisibility}
                  />
                  <ShareProfileText>
                    Share my profile with teams and other hackers for team
                    matching! My name, major, year, school, and top skills will
                    be shown to other hackers.
                  </ShareProfileText>
                </ChangeProfileOption>
              </Column>
              <Column flexBasis={48}>
                <ButtonWithTextForm
                  title="Add Portfolio"
                  label="Enter your LinkedIn/Website url"
                  buttonText="Add"
                  onSubmit={handleAddPortfolio}
                  initial={portfolioUrl}
                />
              </Column>
            </NoTeamFlex>

            <TeamSuggestions
              type={"You've been invited!"}
              handleOnClick={handleJoinProjectTeam}
              teamSuggestions={pendingTeamRequests}
              buttonLabel={"Join"}
            />
            <TeamSuggestions
              type={"Your Pending Requests"}
              handleOnClick={null}
              teamSuggestions={pendingTeamRequests}
              buttonLabel={""}
            />
            <TeamSuggestions
              type={"Team Suggestions"}
              handleOnClick={handleRequestProjectTeam}
              teamSuggestions={teamSuggestions}
              buttonLabel={"Request to Join"}
            />
            <TeammateSuggestions teammateSuggestions={teammateSuggestions} />
          </>
        )}
      </>
    );
  };

  const TeamInfoSection = () => {
    return (
      <>
        <h1>Your HackSC Team</h1>
        <MultiTextForm
          title="Team Information"
          onSubmit={updateProjectTeamSelf}
          fields={[
            {
              initialValue: projectTeam.name as string,
              label: "Team Name",
              name: "name",
            },
            {
              initialValue: projectTeam.devpostLink,
              label: "Devpost Link",
              name: "devpostLink",
            },
            {
              initialValue: projectTeam.githubLink,
              label: "Github Link",
              name: "githubLink",
            },
          ]}
        />
        <VertFlex>
          <TeamMemberTable
            projectTeam={projectTeam}
            onRemove={removeMemberSelf}
          />
          <AddMember
            projectTeam={projectTeam}
            onAdd={addMemberProjectTeamSelf}
          />
        </VertFlex>
      </>
    );
  };

  return (
    <>
      <Head title="HackSC Odyssey - Team Setup" />
      <Navbar loggedIn showProjectTeam={true} activePage="projectTeam" />
      <Background>
        <Container>
          {projectTeam ? (
            <TeamInfoSection />
          ) : (
            <CreateTeamSection
              lookingForTeam={props.lookingForTeam}
              teammateSuggestions={props.teammateSuggestions}
              teamSuggestions={props.teamSuggestions}
              pendingTeammateRequests={props.pendingTeammateRequests}
              pendingTeamRequests={props.pendingTeamRequests}
              portfolioUrl={props.portfolioUrl}
            />
          )}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

const AddMember = (props: {
  projectTeam: ProjectTeam;
  onAdd: (p: String) => void;
}) => {
  const [memberId, setMemberId] = useState("");

  return (
    <div>
      <Button
        onClick={() => {
          props.onAdd(memberId);
        }}
      >
        {" "}
        Add Member{" "}
      </Button>
      <TeamTextInput
        type="text"
        placeholder="Teammate's 4 character Code"
        onChange={(e) => {
          setMemberId(e.target.value);
        }}
      />
    </div>
  );
};

const TeamMemberTable = (props: {
  projectTeam: ProjectTeam;
  onRemove: (p: Person) => void;
}) => {
  const { Members } = props.projectTeam;
  return (
    <div>
      <h2>Team Members</h2>
      {Members.map((p) => (
        <TeamCard>
          <span>{p.Profile.firstName} </span>
          <span>{p.Profile.lastName} | </span>
          <span>{p.Profile.email}</span>

          <DelButton onClick={(e) => props.onRemove(p)}>Remove</DelButton>
        </TeamCard>
      ))}
    </div>
  );
};

const PrizeElement = (props: {
  prize: Prize;
  projectTeam: ProjectTeam;
  onRemovePrize: Function;
  onAddPrize: Function;
}) => {
  const claimedPrizeIds = props.projectTeam.Prizes.map((p) => p.id);
  const { onAddPrize, onRemovePrize, prize } = props;
  let claimedPrize = claimedPrizeIds.includes(prize.id);
  return (
    <PrizeCard key={prize.id}>
      <SpaceFlex>
        <div>
          <PrizeTitle>{prize.title}</PrizeTitle>

          <PrizeSubtitle>{prize.description}</PrizeSubtitle>
          {claimedPrize ? (
            <Button onClick={() => onRemovePrize(prize)}> Remove Prize</Button>
          ) : (
            <Button onClick={() => onAddPrize(prize)}> Add Prize</Button>
          )}
        </div>
        <PrizeStatus>
          {claimedPrize
            ? "You are competing for this prize!"
            : "You are not competing for this prize!"}
        </PrizeStatus>
      </SpaceFlex>
    </PrizeCard>
  );
};

const PrizeTable = (props: {
  allPrizes: Prize[];
  projectTeam: ProjectTeam;
  onAddPrize: Function;
  onRemovePrize: Function;
}) => {
  const claimedPrizeIds = props.projectTeam.Prizes.map((p) => p.id);
  const { onAddPrize, onRemovePrize } = props;
  return (
    <PrizeContainer>
      <PrizeTableTitle>Prizes</PrizeTableTitle>
      <PrizeTableDescription>
        {" "}
        Indicate what prizes you're interested in competing for below. This
        helps us make sure that you get judged for all the prizes that you want
        to be considered for!
      </PrizeTableDescription>
      {props.allPrizes.map((p) => {
        let claimedPrize = claimedPrizeIds.includes(p.id);
        return (
          <PrizeElement
            prize={p}
            projectTeam={props.projectTeam}
            onAddPrize={onAddPrize}
            onRemovePrize={onRemovePrize}
          />
        );
      })}
    </PrizeContainer>
  );
};

const PrizeContainer = styled.div``;

const PrizeTableDescription = styled.div`
  margin: 20px;
  margin-left: 0px;
  font-size: 20px;
`;

const PrizeTableTitle = styled.h2`
  margin-left: 0px;
`;

const PrizeStatus = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const PrizeCard = styled(Card)`
  margin: 10px;
  margin-left: 0px;
`;

const TeamCard = styled(Card)`
  margin: 10px;
  margin-left: 0px;
`;

ProjectTeam.getInitialProps = async ({ req, query }): Promise<Props> => {
  const { success } = await getProjectTeamSelfFetch(req);
  const profile = await getProfile(req);

  // Fetch teammate suggestions
  const teammateSuggestions = await getTeammateSuggestions(req);
  const teamSuggestions = await getTeamSuggestions(req);
  const pendingTeammateRequests = await getPendingTeammateRequests(req);
  const pendingTeamRequests = await getPendingTeamRequests(req);

  // console.log(teammateSuggestions);
  // console.log(teamSuggestions);
  // console.log(pendingTeammateRequests);
  // console.log(pendingTeamRequests);

  return {
    userId: req.user.id,
    lookingForTeam: profile.lookingForTeam,
    projectTeam: success,
    teammateSuggestions: teammateSuggestions,
    teamSuggestions: teamSuggestions.teams,
    pendingTeammateRequests: pendingTeammateRequests,
    pendingTeamRequests: pendingTeamRequests.teamRequests,
    portfolioUrl: profile.portfolioUrl,
  };
};

const NoTeamFlex = styled(Flex)`
  margin-top: 48px;
  align-items: flex-start;
`;

const PrizeTitle = styled.div`
  font-size: 22px;
  color: black;
  margin: 10px;
  margin-left: 0px;
`;

const PrizeSubtitle = styled.div`
  font-size: 18px;
  margin-bottom: 10px;
`;

const VertFlex = styled(Flex)`
  flex-direction: column;
  margin-top: 48px;
  margin-bottom: 48px;
`;

const SpaceFlex = styled(Flex)`
  justify-content: space-between;
`;

const TeamTextInput = styled.input`
  margin-left: 10px;
  outline: 0px;
  font-size: 16px;
  padding: 7px 16px;
`;

const DelButton = styled(Button)`
  margin-left: 10px;
`;

const ChangeProfileOption = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ShareProfileText = styled.div`
  padding-left: 20px;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 16px;
  line-height: 22px;
`;

const Title = styled.h2`
  padding-top: 0px;
  padding-bottom: 0;
`;

export default ProjectTeam;
