import useSWR, { mutate } from "swr";
import { Routes, APIGet, APIPost } from "./fetcher";
import { NextApiRequest } from "next";
import { ListHookParams, useErrorHandler } from "./hook-utils";
import { fetcherToSVRHandler } from "./hook-utils";

function liveDispatchFetch(body) {
  return APIPost(Routes.LiveDispatch, body);
}

type LiveLookupParams = {
  firstName: string;
  lastName: string;
  email: string;
};

function liveLookupFetch(params: LiveLookupParams) {
  return APIGet<Profile[]>(Routes.LiveLookup, null, { queryParams: params });
}

type LiveQRAssignBody = {
  qrCodeId: string;
  userId: StringID;
};
function liveAssignQRFetch(body: LiveQRAssignBody) {
  return APIPost(Routes.LiveAssignQR, body);
}

function liveIdentityCheckFetch(params) {
  return APIGet(Routes.LiveIdentityCheck);
}

export { liveAssignQRFetch, liveDispatchFetch, liveLookupFetch };