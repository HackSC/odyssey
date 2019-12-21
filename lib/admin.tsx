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
  // console.log(response);
  const profilePayload = await response.json();
  console.log(profilePayload);
  return profilePayload.eligibleReviews[0];
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
