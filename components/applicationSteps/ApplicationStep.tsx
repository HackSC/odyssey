import * as React from "react";

type Props = {
  user: any;
};

const ApplicationStep: React.FunctionComponent<Props> = props => {
  const { user } = props;

  return (
    <div>
      <h1>Hello {user.displayName}</h1>

      <p>
        This is a component that will represent the user's application. There
        will be three questions here that are important.
      </p>
    </div>
  );
};

export default ApplicationStep;
