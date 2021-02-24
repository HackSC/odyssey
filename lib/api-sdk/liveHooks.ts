import useSWR, { mutate } from "swr";
import { Routes, APIGet, APIPost } from "./fetcher";
import { NextApiRequest } from "next";

function liveDispatchFetch(body) {
  return APIPost(Routes.LiveDispatch, body);
}

type LiveLookupParams = {
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  ethnicity?: string;
  needBus?: string;
  status?: string;
  role?: string;
  school?: string;
  year?: string;
  graduationDate?: string;
};

type LiveHackerLookupParams = {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  ethnicity: string;
  needBus: string;
  status: string;
  role: string;
  school: string;
  year: string;
  graduationDate: string;
  teamId: string;
};

type LiveSignUpLookupParams = {
  email: string;
  ip: string;
};

type LiveApiLookupParams = {
  id: number;
};

function liveLookupFetch(params: LiveLookupParams) {
  return APIGet<Profile[]>(Routes.LiveLookup, { queryParams: params });
}

function liveHackerLookupFetch(params: LiveHackerLookupParams) {
  return APIGet<Profile[]>(Routes.LiveLookup, { queryParams: params });
}

function liveAllApiLookupFetch(params: {}) {
  return APIGet<API[]>(Routes.AllApiLive, { queryParams: params });
}

function liveApiLookupFetch(params: LiveApiLookupParams) {
  return APIGet<API[]>(Routes.ApiLive, { queryParams: params });
}

function liveSignUpLookupFetch(params: LiveSignUpLookupParams) {
  return APIGet<SignUp[]>(Routes.SignUpsLive, { queryParams: params });
}

function livePointFetch(qrCodeId: ResourceID, req?: NextApiRequest) {
  return APIGet(Routes.LivePoints, { req }, qrCodeId);
}

function liveEmailPointFetch(email: string, req?: NextApiRequest) {
  return APIGet(Routes.LiveEmailPoints, { req }, email);
}

type LiveQRAssignBody = {
  qrCodeId: string;
  userId: StringID;
};

function liveAssignQRFetch(body: LiveQRAssignBody) {
  return APIPost(Routes.LiveAssignQR, body);
}

export {
  liveAssignQRFetch,
  liveDispatchFetch,
  liveLookupFetch,
  liveAllApiLookupFetch,
  liveApiLookupFetch,
  liveSignUpLookupFetch,
  liveHackerLookupFetch,
  livePointFetch,
  liveEmailPointFetch,
};
