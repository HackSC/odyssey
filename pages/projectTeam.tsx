import React, { useState } from "react";
import styled from "styled-components";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Background, Container, Flex, Column, Card } from "../styles";
import ButtonWithTextForm from "../components/ButtonWithTextForm";
import { useToasts } from "react-toast-notifications";
import MultiTextForm from "../components/MultiTextForm";

type Props = {
  projectTeam: ProjectTeam;
  allPrizes: Prize[];
};

const ProjectTeam = (props: Props) => {
  const [team, setTeam] = useState(props.projectTeam);
  const [allPrizes, setAllPrizes] = useState(props.allPrizes);
  const { addToast } = useToasts();
  const handleJoinProjectTeam = (name: string) => {
    joinProjectTeam(name)
      .then(projectTeam => {
        setTeam(projectTeam);
        addToast("Joined Team: " + team.name, {
          appearance: "success"
        });
      })
      .catch(e => {
        addToast("Failed to join team with code: " + name + e.err, {
          appearance: "error"
        });
      });
  };

  const handleCreateProjectTeam = (name: string) => {
    createProjectTeam(name)
      .then(projectTeam => {
        setTeam(projectTeam);
        addToast("Created Team: " + name, {
          appearance: "success"
        });
      })
      .catch(e => {
        addToast("Failed to create team:" + e.err, {
          appearance: "error"
        });
      });
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

  const addPrizeHandler = async (p: Prize) => {
    setTeam(await addPrize(p));
    addToast("Added Prize: " + p.title, { appearance: "success" });
  };

  const removePrizeHandler = async (p: Prize) => {
    setTeam(await removePrize(p));
    addToast("Removed Prize: " + p.title, { appearance: "info" });
  };

  const updateTeamHandler = async values => {
    await updateTeamMetadata(values);
    addToast("Updated Team Info", { appearance: "success" });
  };

  const onTeamMemberRemove = async (p: Person) => {
    setTeam(await removeTeamMember(p));
    addToast("Removed: " + p.Profile.email, { appearance: "info" });
  };

  const TeamInfoSection = () => {
    return (
      <>
        <h1>Your HackSC Team</h1>
        <MultiTextForm
          title="Team Information"
          onSubmit={updateTeamHandler}
          fields={[
            {
              initialValue: team.name,
              label: "Team Name",
              name: "name"
            },
            {
              initialValue: team.devpostLink,
              label: "Devpost Link",
              name: "devpostLink"
            },
            {
              initialValue: team.githubLink,
              label: "Github Link",
              name: "githubLink"
            }
          ]}
        />
        <TeamMemberTable projectTeam={team} onRemove={onTeamMemberRemove} />
        <PrizeTable
          projectTeam={team}
          allPrizes={allPrizes}
          onAddPrize={addPrizeHandler}
          onRemovePrize={removePrizeHandler}
        />
      </>
    );
  };

  return (
    <>
      <Head title="HackSC Odyssey - Team Setup" />
      <Navbar loggedIn activePage="team" />
      <Background>
        <Container>
          {team ? <TeamInfoSection /> : <CreateTeamSection />}
        </Container>
      </Background>
      <Footer />
    </>
  );
};

async function getProjectTeam(req): Promise<ProjectTeam> {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/projectTeam/self"
    : /* Client */ "/api/projectTeam/self";
  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  ).then(res => {
    return res.json();
  });

  return result.projectTeam;
}

async function joinProjectTeam(name: string): Promise<ProjectTeam> {
  const res = await fetch("/api/projectTeam/join/" + name, {
    method: "PUT"
  });

  if (!res.ok) {
    const errorMessage = (await res.json()).err;
    throw Error(errorMessage);
  }
  return res.json().then(json => json.projectTeam);
}

async function createProjectTeam(name: string): Promise<ProjectTeam> {
  const res = await fetch("/api/projectTeam/self", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!res.ok) {
    const errorMessage = await res.json();
    console.log(errorMessage);
    throw Error(errorMessage);
  }

  return res.json().then(json => json.projectTeam);
}

async function removePrize(prize: Prize): Promise<ProjectTeam> {
  const result = await fetch("/api/projectTeam/self/deletePrize/" + prize.id, {
    method: "DELETE"
  }).then(res => res.json());
  return result.projectTeam;
}

async function removeTeamMember(member: Person): Promise<ProjectTeam> {
  const result = await fetch(
    "/api/projectTeam/self/deleteMember/" + member.identityId,
    {
      method: "DELETE"
    }
  ).then(res => res.json());
  return result.projectTeam;
}

async function addPrize(prize: Prize): Promise<ProjectTeam> {
  const result = await fetch("/api/projectTeam/self/addPrize/" + prize.id, {
    method: "POST"
  }).then(res => res.json());
  return result.projectTeam;
}

async function updateTeamMetadata(
  data: Partial<ProjectTeam>
): Promise<ProjectTeam> {
  const result = await fetch("/api/projectTeam/self", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => res.json());
  return result.projectTeam;
}

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

  return result.prizes;
}

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
          <button onClick={e => props.onRemove(p)}>Remove</button>
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
`;

ProjectTeam.getInitialProps = async ({ req, query }): Promise<Props> => {
  const projectTeam = await getProjectTeam(req);
  const allPrizes = await getAllPrizes(req);

  return {
    projectTeam,
    allPrizes
  };
};

const NoTeamFlex = styled(Flex)`
  margin-top: 48px;
`;

export default ProjectTeam;
