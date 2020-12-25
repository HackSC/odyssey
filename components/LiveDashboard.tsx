import * as React from "react";
import Router from "next/router";
import * as Sentry from "@sentry/browser";

import Confirmed from "./steps/Confirmed";
import Step from "./steps/Status";
import CheckedIn from "./steps/CheckedIn";

type Props = {
  profile: Profile;
  socialPosts: any;
  houses: any;
  appsOpen: boolean;
};

const LiveStep: React.FunctionComponent<Props> = (props) => {
  const { profile, socialPosts, houses, appsOpen } = props;

  if (profile.status === "confirmed") {
    return <Confirmed profile={profile} />;
  } else if (profile.status === "checkedIn") {
    return <CheckedIn houses={houses} profile={profile} />;
  } else {
    return (
      <Step profile={profile} appsOpen={appsOpen} socialPosts={socialPosts} />
    );
  }
};

export default LiveStep;
