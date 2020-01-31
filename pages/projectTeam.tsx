import React, { useState } from "react";
import styled from "styled-components";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Background, Container, Flex, Column, Card, Button } from "../styles";
import ButtonWithTextForm from "../components/ButtonWithTextForm";
import { useToasts } from "react-toast-notifications";
import MultiTextForm from "../components/MultiTextForm";
import {
  useProjectTeamSelf,
  getProjectTeamSelfFetch
} from "../lib/api-sdk/projectTeamHooks";

type Props = {
  projectTeam: ProjectTeam;
  allPrizes: Prize[];
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
    joinProjectTeamSelf
  } = useProjectTeamSelf({
    defaultOnError: onError,
    initialModel: props.projectTeam
  });

  const { allPrizes } = props;

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
              title="Join Team"
              label="Enter your team name"
              buttonText="Join"
              onSubmit={handleJoinProjectTeam}
            />
          </Column>

          <Column flexBasis={48}>
            <ButtonWithTextForm
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

  // const addPrizeHandler = async (p: Prize) => {
  //   setTeam(await addPrize(p));
  //   addToast("Added Prize: " + p.title, { appearance: "success" });
  // };

  // const removePrizeHandler = async (p: Prize) => {
  //   setTeam(await removePrize(p));
  //   addToast("Removed Prize: " + p.title, { appearance: "info" });
  // };

  // const updateTeamHandler = async values => {
  //   setTeam(await updateTeamMetadata(values));
  //   addToast("Updated Team Info", { appearance: "success" });
  // };

  // const onTeamMemberRemove = async (p: Person) => {
  //   setTeam(await removeTeamMember(p));
  //   addToast("Removed: " + p.Profile.email, { appearance: "info" });
  // };

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
              name: "name"
            },
            {
              initialValue: projectTeam.devpostLink,
              label: "Devpost Link",
              name: "devpostLink"
            },
            {
              initialValue: projectTeam.githubLink,
              label: "Github Link",
              name: "githubLink"
            }
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
        <PrizeTable
          projectTeam={projectTeam}
          allPrizes={allPrizes}
          onAddPrize={addPrizeSelf}
          onRemovePrize={removePrizeSelf}
        />
      </>
    );
  };

  return (
    <>
      <Head title="HackSC Odyssey - Team Setup" />
      <Navbar
        loggedIn
        showApp={false}
        showResults={false}
        showTeam={false}
        activePage="projectTeam"
      />
      <Background>
        <Container>
          {projectTeam ? <TeamInfoSection /> : <CreateTeamSection />}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

async function getAllPrizes(req): Promise<Prize[]> {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/prize/"
    : /* Client */ "/api/prize/";

  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  ).then(res => res.json());

  return result.success;
}

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
        onChange={e => {
          console.log(e.target.value);
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
      {Members.map(p => (
        <TeamCard>
          <span>{p.Profile.firstName} </span>
          <span>{p.Profile.lastName} | </span>
          <span>{p.Profile.email}</span>

          <DelButton onClick={e => props.onRemove(p)}>Remove</DelButton>
        </TeamCard>
      ))}
    </div>
  );
};

const PrizeTable = (props: {
  allPrizes: Prize[];
  projectTeam: ProjectTeam;
  onAddPrize: Function;
  onRemovePrize: Function;
}) => {
  const claimedPrizeIds = props.projectTeam.Prizes.map(p => p.id);
  const { onAddPrize, onRemovePrize } = props;
  return (
    <PrizeContainer>
      <h2>Prizes</h2>
      {props.allPrizes.map(p => {
        let claimedPrize = claimedPrizeIds.includes(p.id);
        return (
          <PrizeCard key={p.id} background={claimedPrize ? "magenta" : ""}>
            <span>{p.title}</span>
            <span>{p.description}</span>
            <span>{claimedPrize.toString()}</span>
            {claimedPrize ? (
              <button onClick={() => onRemovePrize(p)}> Remove Prize</button>
            ) : (
              <button onClick={() => onAddPrize(p)}> Add Prize</button>
            )}
          </PrizeCard>
        );
      })}
    </PrizeContainer>
  );
};

const PrizeContainer = styled.div``;

const PrizeCard = styled(Card)`
  margin: 10px;
`;

const TeamCard = styled(Card)`
  margin: 10px;
  margin-left: 0px;
`;

ProjectTeam.getInitialProps = async ({ req, query }): Promise<Props> => {
  const { success } = await getProjectTeamSelfFetch(req);
  const allPrizes = await getAllPrizes(req);

  return {
    projectTeam: success,
    allPrizes
  };
};

const NoTeamFlex = styled(Flex)`
  margin-top: 48px;
`;

const VertFlex = styled(Flex)`
  flex-direction: column;
  margin-top: 48px;
  margin-bottom: 48px;
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
