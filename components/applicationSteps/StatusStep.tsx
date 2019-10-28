import * as React from "react";

type Props = {
  user: any;
};

const StatusStep: React.FunctionComponent<Props> = props => {
  const { user } = props;

  return (
    <div>
      <h1>Hello {user.displayName}</h1>

      <p>
        This is a component that will represent the user's status. This
        component will say what the user's current status is, what the due dates
        are, and more.
      </p>
    </div>
  );
};

export default StatusStep;
