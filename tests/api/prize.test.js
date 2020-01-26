const supertest = require("supertest");
const seedDB = require("../../tasks/dbSeeder");
const server = require("../../express");

agent = supertest.agent(server);

beforeAll(() => {
  return agent.get("/auth/devlogin").query({ id: 1 });
});

describe("Prizes", () => {
  test("Get all prizes", () => {
    return agent
      .get("/api/prize")
      .expect(200)
      .then(res => {
        expect(res.body.prizes.length).toBe(5);
      });
  });
});
