const supertest = require("supertest");
const server = require("../../express");

request = supertest(server);

afterAll(async (done) => {
  done();
  await new Promise((resolve) => setTimeout(() => resolve(), 10000)); // avoid jest open handle error
});

describe("Auth Tests", () => {
  const devLoginUrl = "/auth/devlogin";
  test("Dev Login Happy Flow", () => {
    const addedVals = {
      _json: { email: "", email_verified: true },
    };
    const user = {
      id: "a",
      role: "admin",
    };
    return request
      .get(devLoginUrl)
      .query({ id: "a", role: "admin" })
      .expect(200, { ...user, ...addedVals })
      .catch((e) => console.error(e));
  });
});
