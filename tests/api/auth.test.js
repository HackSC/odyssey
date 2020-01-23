const supertest = require("supertest");

request = supertest("http://localhost:3000");

describe("Auth Tests", () => {
  const devLoginUrl = "/auth/devlogin";
  test("Dev Login Happy Flow", () => {
    const addedVals = {
      _json: { email: "", email_verified: true }
    };
    const user = {
      id: "a",
      role: "admin"
    };
    return request
      .get(devLoginUrl)
      .query({ id: "a", role: "admin" })
      .expect(200, { ...user, ...addedVals });
  });

  test("devlogin from not localhost:3000 fails", () => {
    return request
      .get(devLoginUrl)
      .set("Host", "http://localhost:3001")
      .expect(302);
  });
});
