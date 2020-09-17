import styled from "styled-components";

const content = [
  {
    title: "Talking to sponsors",
    description:
      "Get your code scanned by meet the sponsors to get points (earn 1500 points for each sponsor you talk to!)",
    points: 1500
  },
  {
    title: "Talking to non-profit organizations",
    description:
      "Get your code scanned by non-profit members to get points (earn 1500 points for each non-profit you talk to!)",
    points: 1500
  },
  {
    title: "Attending sponsor workshops",
    description: "Check into a sponsor workshop to get points",
    points: 2500
  },
  {
    title: "Minute To Win It",
    description: "Participate in minute to win to get points",
    points: 1500
  },
  {
    title: "Cinema Room and Facemasks",
    description: "Take some time to chill and relax (and earn points)",
    points: 1500
  },
  {
    title: "Succulent Arrangement",
    description: "Arrange some succulents!",
    points: 1500
  },
  {
    title: "Cookie Decoration",
    description: "Nomnomnomnomnom",
    points: 1500
  },
  {
    title: "HackSChillax",
    description: "Come chillax with HackSC",
    points: 1500
  },
  {
    title: "Hacker Pong",
    description: "Play pong with your fellow hackers",
    points: 1500
  },
  {
    title: "Opening Ceremony",
    description: "Attend opening ceremony",
    points: 3000
  },
  {
    title: "Closing Ceremony",
    description: "Attend closing ceremony",
    points: 3000
  },
  {
    title: "Minute To Win It (Win)",
    description: "Win minute to win it to get these points",
    points: 3000
  },
  {
    title: "Hacker Pong (win)",
    description: "Win hacker pong to get these points",
    points: 3000
  }
];

const TaskBreakdown = () => (
  <Tasks>
    {content.map(task => (
      <Task key={task.title ? task.title : ""}>
        <TaskInfo>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </TaskInfo>

        <TaskPoints>{task.points}</TaskPoints>
      </Task>
    ))}

    <MoreTBD>Tasks subject to change!</MoreTBD>
  </Tasks>
);

const Tasks = styled.div`
  padding: 0 18px;
`;

const Task = styled.div`
  border: 1px solid #cfcfcf;
  background: white;
  z-index: 999;
  border-radius: 4px;
  padding: 1.5rem 1.5rem;
  margin-top: 0.75rem;
  color: #5f5f5f;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

const TaskInfo = styled.div`
  flex-basis: 70%;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }
`;

const TaskPoints = styled.div`
  flex-grow: 1;
  text-align: right;
  font-size: 24px;
  font-weight: bold;
  color: #ff8379;
`;

const MoreTBD = styled.p`
  text-align: center;
  margin-top: 32px;
  font-size: 18px;
`;

export default TaskBreakdown;
