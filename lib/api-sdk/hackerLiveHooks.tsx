import useSWR from "swr";
import { Routes, APIGet } from "./fetcher";
import { NextApiRequest } from "next";
import {
  ListHookParams,
  useErrorHandler,
  ResourceHookParams,
  SelfHookParams
} from "./hook-utils";
import { fetcherToSVRHandler } from "./hook-utils";

function battlepassFetch(req?: NextApiRequest) {
  return APIGet(Routes.HackerLiveBattlepass, null, { req });
}

function personInfoFetchSelf(req?: NextApiRequest) {
  return APIGet(Routes.HackerLivePersonInfoSelf, null, { req });
}

function allTasksFetch(req?: NextApiRequest) {
  return APIGet(Routes.HackerLiveTasks, null, { req });
}

function houseInfoFetch(houseId: NumberID, req?: NextApiRequest) {
  return APIGet(Routes.HackerLiveHouseInfo, houseId, { req });
}

function allHouseInfoFetch() {
  return APIGet(Routes.HackerLiveHouseInfoList);
}

function useBattlepass({
  defaultOnError,
  initialModel
}: ResourceHookParams<Battlepass>) {
  const resourceRoute = Routes.HackerLiveBattlepass;
  const { data: battlepass, error } = useSWR<Battlepass, any>(
    resourceRoute,
    fetcherToSVRHandler(battlepassFetch),
    {
      initialData: initialModel
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    battlepass
  };
}

function usePersonInfoSelf({
  defaultOnError,
  initialModel
}: SelfHookParams<Person>) {
  const resourceRoute = Routes.HackerLivePersonInfoSelf;
  const { data: personInfo, error } = useSWR<Person, any>(
    resourceRoute,
    fetcherToSVRHandler(personInfoFetchSelf),
    {
      initialData: initialModel
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    personInfo
  };
}

function useAllTasks({ defaultOnError, initialModels }: ListHookParams<Task>) {
  const resourceRoute = Routes.HackerLiveTasks;
  const { data: allTasks, error } = useSWR<Task[], any>(
    resourceRoute,
    fetcherToSVRHandler(allTasksFetch),
    {
      initialData: initialModels
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    allTasks
  };
}

function useHouseInfo({
  defaultOnError,
  initialModel
}: ResourceHookParams<House>) {
  const resourceRoute = Routes.HackerLiveHouseInfo;
  const { data: houseInfo, error } = useSWR<House, any>(
    resourceRoute,
    fetcherToSVRHandler(houseInfoFetch),
    {
      initialData: initialModel
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    houseInfo
  };
}

function useAllHouseInfo({
  defaultOnError,
  initialModels = []
}: ListHookParams<House>) {
  const resourceRoute = Routes.HackerLiveHouseInfoList;
  const { data: allHouses, error } = useSWR<House[], any>(
    resourceRoute,
    fetcherToSVRHandler(allHouseInfoFetch),
    {
      initialData: initialModels
    }
  );

  useErrorHandler(defaultOnError, error);
  return {
    allHouses
  };
}

export {
  useBattlepass,
  useAllHouseInfo,
  useAllTasks,
  useHouseInfo,
  usePersonInfoSelf
};
