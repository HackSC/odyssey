const supertest = require("supertest");
const seedDB = require("../../tasks/dbSeeder");
const server = require("../../express");

agent = supertest.agent(server);

beforeAll(async () => {
  return agent.get("/auth/devlogin").query({ id: 1 });
}, 10000);

afterAll((done) => {
  done();
});

describe("Prizes", () => {
  test("Get all prizes", () => {
    return agent
      .get("/api/prize")
      .expect(200)
      .then((res) => {
        expect(res.body.success.length).toBe(5);
      })
      .catch((e) => {
        console.info("Get all prizes failed: ", e);
      });
  });
});
