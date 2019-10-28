import * as React from "react";

type Props = {
  user: any;
};

const ProfileStep: React.FunctionComponent<Props> = props => {
  const { user } = props;

  return (
    <div>
      <h1>Hello {user.displayName}</h1>

      <p>
        This is a component that will let the user fill out their hacker
        profile. This will include a form where they can indicate their
        interests, skills, resume, and more.
      </p>
    </div>
  );
};

export default ProfileStep;
