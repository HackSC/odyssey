import * as React from "react";

type Props = {
  user: any;
};

const ResultStep: React.FunctionComponent<Props> = props => {
  const { user } = props;

  return (
    <div>
      <h1>Hello {user.displayName}</h1>

      <p>
        This is a component that will represent the user's application results.
        If the user is accepted, they will see a confirmation form. Otherwise,
        they will be rejected.
      </p>
    </div>
  );
};

export default ResultStep;
