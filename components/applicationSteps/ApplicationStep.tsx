import * as React from "react";

type Props = {
  profile: any;
};

const ApplicationStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return (
    <div>
      <h1>Hello {profile.displayName}</h1>

      <p>
        This is a component that will represent the user's application. There
        will be three questions here that are important.
      </p>
    </div>
  );
};

export default ApplicationStep;
