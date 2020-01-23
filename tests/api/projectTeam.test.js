const supertest = require("supertest");

agent = supertest.agent("http://localhost:3000");

describe("Project Team Tests", () => {
  beforeEach(() => {
    return agent.get("/auth/devlogin").query({ id: 1 });
  });
  test("Create ProjectTeam Happy Path", () => {
    // Should set name & teamId on self
    const name = "TestProjectName";
    return agent
      .post("/api/projectTeam/self")
      .send({ name })
      .expect(200)
      .then(res => {
        const { projectTeam } = res.body;
        expect(res.body.projectTeam.name).toBe(name);

        return agent
          .get("/api/person/self")
          .expect(200)
          .then(res => {
            expect(res.body.person.ProjectTeamId).toBe(projectTeam.id);
          });
      });
  });
});
