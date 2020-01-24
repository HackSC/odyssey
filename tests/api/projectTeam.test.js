const supertest = require("supertest");
const seedDB = require("../../tasks/dbSeeder");
const server = require("../../express");

agent = supertest.agent(server);
beforeAll(() => {
  return agent.get("/auth/devlogin").query({ id: 1 });
});

function CreateProjectTeamSelf(name) {
  return agent.post("/api/projectTeam/self").send({ name });
}

describe("Project Team (Sequential)", () => {
  beforeEach(async () => {
    await seedDB();
  });
  test("Create ProjectTeam Happy Path", () => {
    // Should set name & teamId on self
    const name = "TestProjectName";
    return CreateProjectTeamSelf(name)
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

  test("Join Project Team", () => {
    const name = "TestProjectTeam";
    return agent.put("/api/projectTeam/join/" + name).expect(200);
  });
});

describe("Project Team Requests (Parallel)", () => {
  test("Get my Project Team", async () => {
    const name = "TestProjectName";
    await CreateProjectTeamSelf(name);
    return agent
      .get("/api/projectTeam/self")
      .expect(200)
      .then(res => {
        expect(res.body.projectTeam.name).toBe(name);
      });
  });

  test("Get all Project Teams doesn't fail", async () => {
    return agent.get("/api/projectTeam/list").expect(200);
  });
});
