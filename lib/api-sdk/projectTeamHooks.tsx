import useSWR, { mutate } from "swr";
import { Routes, APIGet, APIPost, APIPut, APIDelete } from "./fetcher";
import { NextApiRequest } from "next";
import { useUpdateEffect } from "react-use";

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
    async () => {
      const res = await getProjectTeamSelfFetch();
      if (res.success) {
        return res.success;
      }
      throw res.error;
    },
    {
      initialData: initialModel
    }
  );

  useUpdateEffect(() => {
    if (error && error != "") defaultOnError(error), [error];
  });

  // LOOK AT THIS HIGHER ORDER FUNCTION
  function fetchWithMutation<T extends (...args: any[]) => any>(
    func: T
  ): (...funcArgs: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>): ReturnType<T> => {
      return func(...args).then(res => {
        if (res.success !== undefined) {
          mutate(resourceRoute, res.success, true);
        }
        if (res.error) defaultOnError(res.error);
      });
    };
  }

  const createProjectTeamSelf = fetchWithMutation(createProjectTeamSelfFetch);
  const joinProjectTeamSelf = fetchWithMutation(joinProjectTeamSelfFetch);
  const updateProjectTeamSelf = fetchWithMutation(updateProjectTeamSelfFetch);
  const addPrizeSelf = fetchWithMutation(addPrizeSelfFetch);
  const removePrizeSelf = fetchWithMutation(removePrizeSelfFetch);
  const removeMemberSelf = fetchWithMutation(removeMemberSelfFetch);

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
