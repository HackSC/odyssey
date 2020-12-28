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

export async function updateJudging(
  score,
  judgingId,
  vertical,
  notes,
  sponsor
) {
  let fetchUrl = process.env.URL_BASE
    ? /* Serverside */ process.env.URL_BASE + "api/judging"
    : /* Client */ "/api/judging";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      score: score,
      judgingId: judgingId,
      vertical: vertical,
      notes: notes,
      sponsor: sponsor,
    }),
  });

  try {
    const data = await response.json();
    return data.result;
  } catch (e) {
    return null;
  }
}
