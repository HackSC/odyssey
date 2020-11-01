const supertest = require("supertest");
const seedDB = require("../../tasks/dbSeeder");
const server = require("../../express");

agent = supertest.agent(server);

beforeAll(() => {
  return agent.get("/auth/devlogin").query({ id: 1 });
});

afterAll(done => {
  done();
});

describe("Peoples", () => {
  test("Gets self includes hacker profile", () => {
    return agent
      .get("/api/person/self")
      .expect(200)
      .then(res => {
        expect(res.body.person.Profile).toBeDefined();
      })
      .catch(e => console.error(e));
  });
});
