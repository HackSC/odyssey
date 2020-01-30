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
};

function liveLookupFetch(params: LiveLookupParams) {
  return APIGet<Profile[]>(Routes.LiveLookup, { queryParams: params });
}

type LiveQRAssignBody = {
  qrCodeId: string;
  userId: StringID;
};
function liveAssignQRFetch(body: LiveQRAssignBody) {
  return APIPost(Routes.LiveAssignQR, body);
}

function liveIdentityCheckFetch(req?: NextApiRequest) {
  return APIGet(Routes.LiveIdentityCheck, { req });
}

export { liveAssignQRFetch, liveDispatchFetch, liveLookupFetch };
