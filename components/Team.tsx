import styled from "styled-components";

type Props = {
  team: Team;
};

const Team = ({ team }: Props) => (
  <div>
    <h2>{team.name}</h2>

    <h3>Your Team's Code: {team.teamCode}</h3>

    {team.HackerProfiles.map((profile: any) => (
      <div key={profile.email}>
        {profile.firstName && profile.lastName
          ? profile.firstName + " " + profile.lastName
          : "No Name"}{" "}
        ({profile.email})
      </div>
    ))}
  </div>
);

export default Team;
