import useSWR from "swr";
import { Routes, APIGet } from "./fetcher";
import { NextApiRequest } from "next";
import {
  ListHookParams,
  useErrorHandler,
  fetcherToSVRHandler
} from "./hook-utils";

function getAllEventsFetch(req?: NextApiRequest) {
  return APIGet<Event[]>(Routes.EventList, { req });
}

function useEventsList({
  defaultOnError,
  initialModels
}: ListHookParams<Event>) {
  const resourceRoute = Routes.EventList;
  const { data: allEvents, error } = useSWR<Event[], any>(
    resourceRoute,
    fetcherToSVRHandler(getAllEventsFetch),
    {
      initialData: initialModels
    }
  );

  useErrorHandler(defaultOnError, error);

  return {
    allEvents
  };
}

export { useEventsList, getAllEventsFetch };
