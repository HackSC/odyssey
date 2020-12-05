import useSWR from "swr";
import { Routes, APIGet } from "./fetcher";
import { NextApiRequest } from "next";
import {
  ListHookParams,
  useErrorHandler,
  ResourceHookParams,
  SelfHookParams,
} from "./hook-utils";
import { fetcherToSVRHandler } from "./hook-utils";

function battlepassFetch(req?: NextApiRequest) {
  return APIGet(Routes.HackerLiveBattlepass, { req }, null);
}

function personInfoFetchSelf(req?: NextApiRequest) {
  return APIGet(Routes.HackerLivePersonInfoSelf, { req });
}

function allTasksFetch(req?: NextApiRequest) {
  return APIGet(Routes.HackerLiveTasks, { req }, null);
}

function houseInfoFetch(houseId: NumberID, req?: NextApiRequest) {
  return APIGet(Routes.HackerLiveHouseInfo, { req }, houseId);
}

function allHouseInfoFetch(req?: NextApiRequest) {
  return APIGet(Routes.HackerLiveHouseInfoList, { req }, null);
}

function raffleCountFetch(req?: NextApiRequest) {
  return APIGet(Routes.HackerLiveRaffleCount, { req }, null);
}

function sumPersonsContributionPoints(contributions: Contribution[]) {
  let totalPoints = 0;
  for (let i = 0; i < contributions.length; i++) {
    let multiplier = 1;

    if (contributions[i].multiplier !== 0) {
      multiplier = contributions[i].multiplier;
    }

    totalPoints += contributions[i].Task.points * multiplier;
  }

  return totalPoints;
}

function useBattlepass({
  defaultOnError,
  initialModel,
}: ResourceHookParams<Battlepass>) {
  const resourceRoute = Routes.HackerLiveBattlepass;
  const { data: battlepass, error } = useSWR<Battlepass, any>(
    resourceRoute,
    fetcherToSVRHandler(battlepassFetch),
    {
      initialData: initialModel,
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    battlepass,
  };
}

function usePersonInfoSelf({
  defaultOnError,
  initialModel,
}: SelfHookParams<Person>) {
  const resourceRoute = Routes.HackerLivePersonInfoSelf;
  const { data: personInfo, error } = useSWR<Person, any>(
    resourceRoute,
    fetcherToSVRHandler(personInfoFetchSelf),
    {
      initialData: initialModel,
    }
  );

  useErrorHandler(defaultOnError, error);

  if (personInfo && personInfo.Contributions) {
    personInfo.totalPoints = sumPersonsContributionPoints(
      personInfo.Contributions
    );
  }

  return {
    personInfo,
  };
}

function useAllTasks({ defaultOnError, initialModels }: ListHookParams<Task>) {
  const resourceRoute = Routes.HackerLiveTasks;
  const { data: allTasks, error } = useSWR<Task[], any>(
    resourceRoute,
    fetcherToSVRHandler(allTasksFetch),
    {
      initialData: initialModels,
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    allTasks,
  };
}

function useIncompleteTasks({
  defaultOnError,
  initialModels,
}: ListHookParams<Task>) {
  const resourceRoute = Routes.HackerLiveIncompleteTasks;
  const { data: incompleteTasks, error } = useSWR<Task[], any>(
    resourceRoute,
    fetcherToSVRHandler(allTasksFetch),
    {
      initialData: initialModels,
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    incompleteTasks,
  };
}

function useHouseInfo({
  defaultOnError,
  initialModel,
}: ResourceHookParams<House>) {
  const resourceRoute = Routes.HackerLiveHouseInfo;
  const { data: houseInfo, error } = useSWR<House, any>(
    resourceRoute,
    fetcherToSVRHandler(houseInfoFetch),
    {
      initialData: initialModel,
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    houseInfo,
  };
}

function useAllHouseInfo({
  defaultOnError,
  initialModels,
}: ListHookParams<House>) {
  const resourceRoute = Routes.HackerLiveHouseInfoList;
  const { data: allHouses, error } = useSWR<House[], any>(
    resourceRoute,
    fetcherToSVRHandler(allHouseInfoFetch),
    {
      initialData: initialModels,
    }
  );

  useErrorHandler(defaultOnError, error);

  if (allHouses) {
    for (let i = 0; i < allHouses.length; i++) {
      const housePersons = allHouses[i].HouseMembers;

      let houseTotalPoints = 0;
      for (let j = 0; j < housePersons.length; j++) {
        houseTotalPoints += sumPersonsContributionPoints(
          housePersons[j].Contributions
        );
      }

      allHouses[i].totalScore = houseTotalPoints;
    }
  }

  return {
    allHouses: allHouses
      ? allHouses.sort((a, b) => b.totalScore - a.totalScore)
      : null,
  };
}

type RaffleCount = {
  totalRafflePoints: number;
};

function useRaffleCount({
  defaultOnError,
  initialModel,
}: ResourceHookParams<RaffleCount>) {
  const resourceRoute = Routes.HackerLiveRaffleCount;
  const { data: raffleCount, error } = useSWR<RaffleCount, any>(
    resourceRoute,
    fetcherToSVRHandler(raffleCountFetch),
    {
      initialData: initialModel,
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    raffleCount,
  };
}

export {
  useBattlepass,
  useAllHouseInfo,
  useAllTasks,
  useHouseInfo,
  usePersonInfoSelf,
  useIncompleteTasks,
  useRaffleCount,
};
