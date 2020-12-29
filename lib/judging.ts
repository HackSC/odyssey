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

export async function getListOfJudges(req) {
  let url_route = req
    ? /* Serverside */ process.env.URL_BASE + "api/judging/judgeList"
    : /* Client */ "/api/judging/judgeList";

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

export async function getListOfTeamsToJudge(req) {
  let url_route = req
    ? /* Serverside */ process.env.URL_BASE + "api/judging/teamList"
    : /* Client */ "/api/judging/teamList";

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

export async function getFullJudgeList(req): Promise<Array<Judging>> {
  let url_route = req
    ? /* Serverside */ process.env.URL_BASE + "api/judging/fullList"
    : /* Client */ "/api/judging/fullList";

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

export async function deleteJudging({ judgeId, teamId, id }) {
  let fetchUrl = process.env.URL_BASE
    ? /* Serverside */ process.env.URL_BASE + "api/judging"
    : /* Client */ "/api/judging";

  const response = await fetch(fetchUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      judgeId: judgeId,
      teamId: teamId,
      id: id,
    }),
  });

  try {
    const data = await response.json();
    return data.result;
  } catch (e) {
    return null;
  }
}

export async function createJudging({
  judgeId,
  teamId,
  startsAt,
  endsAt,
  zoomLink,
}) {
  let fetchUrl = process.env.URL_BASE
    ? /* Serverside */ process.env.URL_BASE + "api/judging/new"
    : /* Client */ "/api/judging/new";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      judgeId: judgeId,
      teamId: teamId,
      startsAt: startsAt,
      endsAt: endsAt,
      zoomLink: zoomLink,
    }),
  });

  try {
    const data = await response.json();
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

export async function updateJudgingEntry({
  id,
  teamId,
  judgeId,
  startsAt,
  endsAt,
  zoomLink,
}) {
  let fetchUrl = process.env.URL_BASE
    ? /* Serverside */ process.env.URL_BASE + "api/judging/update"
    : /* Client */ "/api/judging/update";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      teamId: teamId,
      judgeId: judgeId,
      startsAt: startsAt,
      endsAt: endsAt,
      zoomLink: zoomLink,
      id: id,
    }),
  });

  try {
    const data = await response.json();
    return data.result;
  } catch (e) {
    return null;
  }
}
