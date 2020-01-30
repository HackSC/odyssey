import useSWR, { mutate } from "swr";
import { Routes, APIGet, APIPost, APIPut, APIDelete } from "./fetcher";
import { NextApiRequest } from "next";
import {
  fetcherToSVRHandler,
  useErrorHandler,
  fetchWithMutation
} from "./hook-utils";

type SelfHookParams<T> = {
  defaultOnError?: (errorMsg: string) => void;
  initialModel?: T;
  req?: NextApiRequest;
};

const resourceRoute = Routes.ProjectTeamSelf;

function getProjectTeamSelfFetch(req?: NextApiRequest) {
  return APIGet<ProjectTeam>(resourceRoute, null, req);
}

function createProjectTeamSelfFetch(body: Partial<ProjectTeam>) {
  return APIPost(resourceRoute, body);
}

function joinProjectTeamSelfFetch(projectName: string) {
  return APIPut(Routes.ProjectTeamSelfJoin, {}, projectName as ResourceID);
}

function updateProjectTeamSelfFetch(
  params: Partial<Extract<ProjectTeam, string>>
) {
  return APIPut(resourceRoute, params);
}

function addPrizeSelfFetch(prize: Prize) {
  return APIPost(Routes.ProjectTeamSelfAddPrize, prize);
}

function removePrizeSelfFetch(prize: Prize) {
  return APIDelete(Routes.ProjectTeamSelfDeletePrize, prize.id);
}

function removeMemberSelfFetch(person: Person) {
  return APIDelete(Routes.ProjectTeamSelfDeleteMember, person.identityId);
}

function useProjectTeamSelf({
  defaultOnError,
  initialModel
}: SelfHookParams<ProjectTeam>) {
  const { data: projectTeam, error } = useSWR<ProjectTeam, any>(
    resourceRoute,
    fetcherToSVRHandler(getProjectTeamSelfFetch),
    {
      initialData: initialModel
    }
  );

  useErrorHandler(defaultOnError, error);

  let fetchWithMutationProjectTeam = f =>
    fetchWithMutation(f, defaultOnError, resourceRoute);

  const createProjectTeamSelf = fetchWithMutationProjectTeam(
    createProjectTeamSelfFetch
  );
  const joinProjectTeamSelf = fetchWithMutationProjectTeam(
    joinProjectTeamSelfFetch
  );
  const updateProjectTeamSelf = fetchWithMutationProjectTeam(
    updateProjectTeamSelfFetch
  );

  const addPrizeSelf = fetchWithMutationProjectTeam(addPrizeSelfFetch);
  const removePrizeSelf = fetchWithMutationProjectTeam(removePrizeSelfFetch);
  const removeMemberSelf = fetchWithMutationProjectTeam(removeMemberSelfFetch);

  return {
    projectTeam,
    createProjectTeamSelf,
    updateProjectTeamSelf,
    addPrizeSelf,
    removePrizeSelf,
    removeMemberSelf,
    joinProjectTeamSelf
  };
}

export { useProjectTeamSelf, getProjectTeamSelfFetch };
