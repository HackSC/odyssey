export async function getHackerProfileForReview(req) {
  const fetchUrl = process.env.URL_BASE + "api/admin/review";

  const response = await fetch(
    fetchUrl,
    req
      ? {
          headers: req.headers
        }
      : null
  );
  console.log(response);
  const profilePayload = await response.json();
  return profilePayload;
}

export async function submitReview(review, scores) {
  const fetchUrl = process.env.URL_base + "api/admin/review/" + review.id;
  const response = await fetch(fetchUrl, {
    method: "PUT",
    body: JSON.stringify(scores)
  });
  return response;
}
