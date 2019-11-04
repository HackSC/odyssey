function getProfileStage(profile: Profile): number {
  const status = profile.status;

  if (status === "unverified") {
    return 0;
  } else if (status === "verified") {
    return 1;
  } else if (status === "profileSubmitted") {
    return 2;
  }
  return 3;
}

export default getProfileStage;
