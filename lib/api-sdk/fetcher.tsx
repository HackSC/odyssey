import { NextApiRequest } from "next";
import { Router } from "next/router";

interface IProjectTeamRoutes {
  ProjectTeamSelf: GetRoute & PostRoute;
  ProjectTeamSelfAddPrize: PostRoute;
  ProjectTeamSelfDeletePrize: DeleteRoute;
  ProjectTeamSelfDeleteMember: DeleteRoute;
  ProjectTeamSelfAddMember: PutRoute;
  ProjectTeamSelfJoin: PutRoute;
}

const ProjectTeamRoutes: IProjectTeamRoutes = {
  ProjectTeamSelf: "api/projectTeam/self" as Route,
  ProjectTeamSelfAddPrize: "api/projectTeam/self/addPrize" as Route,
  ProjectTeamSelfDeletePrize: "api/projectTeam/self/deletePrize" as Route,
  ProjectTeamSelfDeleteMember: "api/projectTeam/self/deleteMember" as Route,
  ProjectTeamSelfAddMember: "api/projectTeam/self/addMember" as Route,
  ProjectTeamSelfJoin: "api/projectTeam/join" as Route
};

interface IContributionRoutes {
  ContributionAll: GetRoute;
  ContributionOwned: GetRoute;
  ContributionCreate: PostRoute;
}

const ContributionRoutes: IContributionRoutes = {
  ContributionAll: "api/contribution/all" as Route,
  ContributionOwned: "api/contribution/owned" as Route,
  ContributionCreate: "api/contribution/create" as Route
};

interface ILiveRoutes {
  LiveDispatch: PostRoute;
  LiveLookup: GetRoute;
  LiveAssignQR: PostRoute;
  LiveIdentityCheck: GetRoute;
}

const LiveRoutes: ILiveRoutes = {
  LiveDispatch: "api/live/dispatch" as Route,
  LiveLookup: "api/live/lookup" as Route,
  LiveAssignQR: "api/live/assign-qr" as Route,
  LiveIdentityCheck: "api/live/dispatch" as Route
};

interface IHackerRoutes {
  HackerLiveBattlepass: GetRoute;
  HackerLivePersonInfoSelf: GetRoute;
  HackerLiveTasks: GetRoute;
  HackerLiveHouseInfo: GetRoute;
  HackerLiveHouseInfoList: GetRoute;
}

const HackerLiveRoutes: IHackerRoutes = {
  HackerLiveBattlepass: "api/hacker/live/battlepass" as Route,
  HackerLivePersonInfoSelf: "api/hacker/live/personInfo" as Route,
  HackerLiveTasks: "api/hacker/live/tasks" as Route,
  HackerLiveHouseInfo: "api/hacker/live/houseInfo" as Route,
  HackerLiveHouseInfoList: "api/hacker/live/houseInfo/list" as Route
};

interface IEventRoutes {
  EventList: GetRoute;
}

const EventRoutes: IEventRoutes = {
  EventList: "api/hacker/event/list" as Route
};

interface ITaskRoutes {
  TasksList: GetRoute;
}

const TaskRoutes: ITaskRoutes = {
  TasksList: "api/task/list" as Route
};

const Routes = {
  ...ProjectTeamRoutes,
  ...ContributionRoutes,
  ...LiveRoutes,
  ...HackerLiveRoutes,
  ...TaskRoutes,
  ...EventRoutes
};

async function processResponse<T>(res: Response): Promise<APIResponse<T>> {
  if (res.status == 400 || res.status == 200) {
    const val = await res.json();
    // JSON will eliminate null key
    if (!("success" in val)) val.success = null;
    return val;
  }
  return { error: "Server Error" };
}

function setupHeaders(req: any, additionalHeaders: HeadersInit): HeadersInit {
  let headers: HeadersInit = {};
  if (req) {
    headers = req.headers;
  }

  return {
    ...headers,
    ...additionalHeaders
  };
}

function computeUrlRoute(route: string, req?: any, param?: ResourceID): string {
  const serverRoute = req
    ? /* Serverside */ process.env.URL_BASE + route
    : /* Client */ "/" + route;

  if (param) {
    return serverRoute + "/" + param;
  }
  return serverRoute;
}

async function APIGet<T>(
  route: GetRoute,
  opts: {
    queryParams?: { [key: string]: string };
    req?: NextApiRequest;
  },
  param?: ResourceID
): Promise<APIResponse<T>> {
  let urlRoute = computeUrlRoute(route, opts?.req, param);
  if (opts?.queryParams) {
    const urlParams = new URLSearchParams(Object.entries(opts.queryParams));
    urlRoute += `?${urlParams}`;
  }

  const headers = setupHeaders(opts.req, {});

  const res = await fetch(urlRoute, {
    headers
  });

  return processResponse(res);
}

async function APIPost<S, T>(
  route: PostRoute,
  body: S,
  req?: NextApiRequest
): Promise<APIResponse<T>> {
  const urlRoute = computeUrlRoute(route, req);
  const headers = setupHeaders(req, { ["Content-Type"]: "application/json" });

  const res = await fetch(urlRoute, {
    method: "POST",
    body: JSON.stringify(body),
    headers
  });

  return processResponse(res);
}

async function APIPut<S, T>(
  route: PutRoute,
  body?: S,
  param?: ResourceID,
  req?: NextApiRequest
): Promise<APIResponse<T>> {
  const urlRoute = computeUrlRoute(route, req, param);
  const headers = setupHeaders(req, { ["Content-Type"]: "application/json" });

  const res = await fetch(urlRoute, {
    method: "PUT",
    body: JSON.stringify(body),
    headers
  });

  return processResponse(res);
}

async function APIDelete<T>(
  route: DeleteRoute,
  param?: ResourceID,
  req?: NextApiRequest
): Promise<APIResponse<T>> {
  const urlRoute = computeUrlRoute(route, req, param);
  const headers = setupHeaders(req, { ["Content-Type"]: "application/json" });

  const res = await fetch(urlRoute, {
    method: "DELETE",
    headers
  });

  return processResponse(res);
}

export { APIGet, APIPost, APIPut, APIDelete, Routes };
