export function getUser(req) {
  return req ? req.user : null;
}
