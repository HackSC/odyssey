import Router from "next/router";
import fetch from "isomorphic-unfetch";
import constants from "./hackathonConstants";

export async function getJudgeList(req): Promise<Array<Judging>> {
  let url_route = req
    ? /* Serverside */ process.env.URL_BASE + "api/judging"
    : /* Client */ "/api/judging";

  const rawJudgingData = await fetch(
    url_route,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  try {
    const data = await rawJudgingData.json();
    return data.result;
  } catch (e) {
    return null;
  }
}
