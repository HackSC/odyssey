import React from "react";
import styled from "styled-components";

const ContributionHistory = ({
  contributions,
}: {
  contributions: Contribution[];
}) => {
  const sortedContributions = contributions.sort((a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);

    return bDate.getTime() - aDate.getTime();
  });

  return (
    <>
      {sortedContributions &&
        sortedContributions.map((contribution) => (
          <Contribution key={Object.entries(contribution).join()}>
            <h3>{contribution.Task.name}</h3>
            <p>{contribution.Task.description}</p>
            <b>Points Received:</b>{" "}
            {contribution.Task.points *
              (contribution.multiplier === 0 ? 1 : contribution.multiplier)}
          </Contribution>
        ))}

      {sortedContributions && sortedContributions.length === 0 && (
        <NoHistory>
          You haven't gotten any points for tasks. Participate in hackathon
          events to get more points
        </NoHistory>
      )}
    </>
  );
};

const Contribution = styled.div`
  background: #ffffff;
  border-radius: 4px;
  padding: 18px;
  margin-bottom: 16px;
`;

const NoHistory = styled.p`
  font-weight: 600;
  text-align: center;
  color: gray;
`;

export default ContributionHistory;
