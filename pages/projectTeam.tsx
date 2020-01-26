import React, { useState } from "react";
import styled from "styled-components";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Background, Container, Flex, Column } from "../styles";
import ButtonWithTextForm from "../components/ButtonWithTextForm";
import { useToasts } from "react-toast-notifications";

type Props = {
  projectTeam: ProjectTeam;
  allPrizes: Prize[];
};

const ProjectTeam = (props: Props) => {
  const [team, setTeam] = useState(props.projectTeam);
  const [allPrizes, setAllPrizes] = useState(props.allPrizes);
  const { addToast } = useToasts();
  const handleJoinProjectTeam = code => {
    const res = fetch("/api/projectTeam/join/" + code, {
      method: "PUT"
    })
      .then(async res => {
        if (!res.ok) {
          const errorMessage = (await res.json()).err;
          throw Error(errorMessage);
        }
        return res;
      })
      .then(async res => {
        setTeam(await res.json());
        addToast("Joined Team: " + team.name, {
          appearance: "success"
        });
      })
      .catch(e => {
        addToast("Failed to join team with code: " + code + e.err, {
          appearance: "error"
        });
      });
  };

  const handleCreateProjectTeam = (name: String) => {
    return fetch("/api/projectTeam/self", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(async res => {
        if (!res.ok) {
          const errorMessage = await res.json();
          console.log(errorMessage);
          throw Error(errorMessage);
        }
        return res;
      })
      .then(async res => {
        setTeam(await res.json());
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

  const TeamInfoSection = () => {
    return (
      <>
        <h1>Your HackSC Team</h1>
        {JSON.stringify(team)}
        {JSON.stringify(allPrizes)}
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
  );

  return result.json();
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
  );

  console.log(result);

  return result.json();
}

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
