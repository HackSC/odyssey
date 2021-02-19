export async function getProfiles(query) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/profiles?query=" + query
    : "api/admin/profiles?query=" + query;

  const response = await fetch(fetchUrl, {
    method: "GET",
  });

  const payload = await response.json();

  const { profiles } = payload;

  return profiles;
}

export async function updateProfileRole(email, role) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/updateRole"
    : "api/admin/updateRole";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, role: role }),
  });

  return response;
}

export async function updateProfilePoints(email, points) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/updatePoints"
    : "api/admin/updatePoints";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, points: points }),
  });

  return response;
}

export async function updateProfileStatus(email, status) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/updateHackerStatus"
    : "api/admin/updateHackerStatus";

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, status: status }),
  });

  return response;
}

export async function getReviewHistory(req) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/reviewHistory"
    : "api/admin/reviewHistory";

  const response = await fetch(
    fetchUrl,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  const payload = await response.json();
  return payload.reviews;
}

export async function getTotalReviewHistory(req) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/eligibleProfiles"
    : "api/admin/eligibleProfiles";

  const response = await fetch(
    fetchUrl,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  const payload = await response.json();
  return payload;
}

export async function getNumberSubmittedApps(req) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/numberSubmittedApps"
    : "api/admin/numberSubmittedApps";

  const response = await fetch(fetchUrl, req ? { headers: req.headers } : null);

  const profilePayload = await response.json();
  const { numberSubmittedApps } = profilePayload;

  return numberSubmittedApps;
}

export async function getEligibleHackerProfiles(req) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/eligibleProfiles"
    : "api/admin/eligibleProfiles";

  const response = await fetch(fetchUrl, req ? { headers: req.headers } : null);

  const profilePayload = await response.json();
  const { eligibleReviews } = profilePayload;

  return eligibleReviews;
}

export async function getHackerProfileForReview(req) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/eligibleProfiles"
    : "api/admin/eligibleProfiles";

  const response = await fetch(
    fetchUrl,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  const profilePayload = await response.json();

  // Randomly select an eligible review
  const { eligibleReviews } = profilePayload;

  return eligibleReviews[Math.floor(Math.random() * eligibleReviews.length)];
}

export async function submitReview(review) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/review"
    : "api/admin/review";
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });
  return response;
}

export async function getHackerStatusStats(req) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/hackerStatusStats"
    : "api/admin/hackerStatusStats";
  const response = await fetch(
    fetchUrl,
    req
      ? {
          headers: req.headers,
        }
      : null
  );

  const payload = await response.json();

  return payload;
}

export async function batchCheckIn(input) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/batchCheckIn"
    : "api/admin/batchCheckIn";
  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      qrCodes: input,
    }),
  });

  return await response.json();
}
