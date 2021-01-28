import { useToasts } from "react-toast-notifications";

import { useProjectTeamSelf } from "@/lib/api-sdk/projectTeamHooks";

type Props = {
  projectTeam: ProjectTeam;
};

const TeamWidget = (props: Props) => {
  const { addToast } = useToasts();
  const onError = (e: string) => {
    addToast(e, { appearance: "error" });
  };

  const {
    projectTeam,
    createProjectTeamSelf,
    updateProjectTeamSelf,
    addPrizeSelf,
    removePrizeSelf,
    removeMemberSelf,
    addMemberProjectTeamSelf,
    joinProjectTeamSelf,
  } = useProjectTeamSelf({
    defaultOnError: onError,
    initialModel: props.projectTeam,
  });
  console.log(projectTeam);
  return <></>;
};

export default TeamWidget;
