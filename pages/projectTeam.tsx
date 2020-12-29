import React, { useState } from "react";
import styled from "styled-components";
import { useToasts } from "react-toast-notifications";

import {
  Head,
  Navbar,
  Footer,
  ButtonWithTextForm,
  MultiTextForm,
} from "../components";
import { Background, Container, Flex, Column, Card, Button } from "../styles";
import {
  useProjectTeamSelf,
  getProjectTeamSelfFetch,
} from "../lib/api-sdk/projectTeamHooks";

type Props = {
  projectTeam: ProjectTeam;
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

  const CreateTeamSection = () => {
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
              initial=""
              title="Join Team"
              label="Enter your team name"
              buttonText="Join"
              onSubmit={handleJoinProjectTeam}
            />
          </Column>

          <Column flexBasis={48}>
            <ButtonWithTextForm
              initial=""
              title="Create Team"
              label="Enter a team name"
              buttonText="Create"
              onSubmit={handleCreateProjectTeam}
            />
          </Column>
        </NoTeamFlex>
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
          {projectTeam ? <TeamInfoSection /> : <CreateTeamSection />}
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

  return {
    projectTeam: success,
  };
};

const NoTeamFlex = styled(Flex)`
  margin-top: 48px;
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

export default ProjectTeam;
