export async function getHackerProfiles(searchText) {
  const fetchUrl = process.env.URL_BASE
  ? process.env.URL_BASE + "api/admin/profiles"
  : "api/admin/profiles";

  const response = await fetch(
    fetchUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(searchText)
    }
  );

  const payload = await response.json();

  // Randomly select an eligible review
  const { profiles } = payload;

  return profiles;
}

export async function getReviewHistory(req) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/reviewHistory"
    : "api/admin/reviewHistory";

  const response = await fetch(
    fetchUrl,
    req
      ? {
          headers: req.headers
        }
      : null
  );

  const payload = await response.json();
  return payload.reviews;
}

export async function getHackerProfileForReview(req) {
  const fetchUrl = process.env.URL_BASE
    ? process.env.URL_BASE + "api/admin/eligibleProfiles"
    : "api/admin/eligibleProfiles";

  const response = await fetch(
    fetchUrl,
    req
      ? {
          headers: req.headers
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review)
  });
  return response;
}
