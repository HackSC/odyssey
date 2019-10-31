import * as React from "react";

type Props = {
  profile: any;
};

const ProfileStep: React.FunctionComponent<Props> = props => {
  const { profile } = props;

  return (
    <div>
      <h1>Hello {profile.displayName}</h1>
      <p>
        This is a component that will let the user fill out their hacker
        profile. This will include a form where they can indicate their
        interests, skills, resume, and more.
      </p>
    </div>
  );
};

export default ProfileStep;
