import * as React from "react";
import Router from "next/router";
import * as Sentry from "@sentry/browser";

import Confirmed from "./steps/Confirmed";
import Step from "./steps/Status";
import CheckedIn from "./steps/CheckedIn";

type Props = {
  profile: Profile;
  socialPosts: any;
};

const LiveStep: React.FunctionComponent<Props> = props => {
  const { profile, socialPosts } = props;

  if (profile.status === "confirmed") {
    return <Confirmed profile={profile} />;
  } else if (profile.status === "checkedIn") {
    return <CheckedIn profile={profile} />;
  } else {
    return <Step profile={profile} socialPosts={socialPosts} />;
  }
};

export default LiveStep;
