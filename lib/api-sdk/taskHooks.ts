import useSWR from "swr";
import { Routes, APIGet, APIPost } from "./fetcher";
import { NextApiRequest } from "next";
import {
  ListHookParams,
  useErrorHandler,
  fetcherToSVRHandler,
} from "./hook-utils";

function isActiveTask(task: Task): task is ActiveTask {
  return task.isActive;
}

function getAllTasksFetch(req?: NextApiRequest) {
  return APIGet<Task[]>(Routes.TasksList, { req });
}

function useTasksList({ defaultOnError, initialModels }: ListHookParams<Task>) {
  const resourceRoute = Routes.TasksList;
  const { data: allTasks, error } = useSWR<Task[], any>(
    resourceRoute,
    fetcherToSVRHandler(getAllTasksFetch),
    {
      initialData: initialModels,
    }
  );

  const activeTasks: ActiveTask[] = allTasks.filter(isActiveTask);

  useErrorHandler(defaultOnError, error);

  return {
    activeTasks,
    allTasks,
  };
}

export { useTasksList, getAllTasksFetch };
