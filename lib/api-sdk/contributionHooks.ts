import useSWR from "swr";
import { Routes, APIGet, APIPost } from "./fetcher";
import { NextApiRequest } from "next";
import {
  ListHookParams,
  useErrorHandler,
  fetcherToSVRHandler,
} from "./hook-utils";

function getAllContributionsFetch(req?: NextApiRequest) {
  return APIGet(Routes.ContributionAll, { req });
}

function ownedContributionsFetch(req?: NextApiRequest) {
  return APIGet(Routes.ContributionOwned, { req });
}

function createContribution(taskId: ResourceID) {
  return APIPost(Routes.ContributionCreate, { taskId });
}

function useContributionsList({
  defaultOnError,
  initialModels,
}: ListHookParams<Contribution>) {
  const resourceRoute = Routes.ContributionAll;
  const { data: allContributions, error } = useSWR<Contribution[], any>(
    resourceRoute,
    fetcherToSVRHandler(getAllContributionsFetch),
    {
      initialData: initialModels,
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    allContributions,
  };
}

function useOwnedContributionsList({
  defaultOnError,
  initialModels,
}: ListHookParams<Contribution>) {
  const resourceRoute = Routes.ContributionOwned;

  const { data: ownedContributions, error } = useSWR<Contribution[], any>(
    resourceRoute,
    fetcherToSVRHandler(ownedContributionsFetch),
    {
      initialData: initialModels,
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    ownedContributions,
  };
}

export { createContribution, useContributionsList, useOwnedContributionsList };
