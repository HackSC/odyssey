import React, { useMemo } from "react";
import styled from "styled-components";

const IncompleteTasks = ({ incompleteTasks }: { incompleteTasks: Task[] }) => {
  const incompleteTasksList = useMemo(() => {
    if (!incompleteTasks) {
      return <p>No incomplete tasks</p>;
    }

    const sort = (a: Task, b: Task) => b.points - a.points;
    const filter = (a: Task) => a.isActive && a.points > 0;

    const sortedAndFilteredIncompleteTasks = incompleteTasks
      .filter(filter)
      .sort(sort);
    return sortedAndFilteredIncompleteTasks.map(task => (
      <Task>
        <h3>{task.name}</h3>
        <p>{task.description}</p>
        <b>Points Up For Grabs:</b> {task.points}
      </Task>
    ));
  }, [incompleteTasks]);

  return incompleteTasks ? <div>{incompleteTasksList}</div> : <p>Loading...</p>;
};

const Task = styled.div`
  background: #ffffff;
  border-radius: 4px;
  padding: 18px;
  margin-bottom: 16px;
`;

export default IncompleteTasks;
