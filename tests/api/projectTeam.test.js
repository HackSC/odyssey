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

async function AddPrizeSelf() {
  const prize = await GetFirstPrize();
  return agent.post("/api/projectTeam/self/addPrize/" + prize.id);
}

function GetFirstPrize() {
  return agent.get("/api/prize/").then(res => res.body.success[0]);
}

describe("Project Team (Sequential)", () => {
  var name = "TestProjectTeam";
  test("Create ProjectTeam Happy Path", async () => {
    // Should set name & teamId on self
    await CreateProjectTeamSelf(name);
    return agent
      .get("/api/projectTeam/self")
      .expect(200)
      .then(res => {
        const projectTeam = res.body.success;
        expect(res.body.success.name).toBe(name);

        return agent
          .get("/api/person/self")
          .expect(200)
          .then(res => {
            expect(res.body.person.ProjectTeamId).toBe(projectTeam.id);
          });
      });
  });

  test("Join Project Team", () => {
    return agent
      .put("/api/projectTeam/join/" + name)
      .expect(200)
      .then(res => expect(res.body.success.name).toBe(name));
  });

  test("Add Prize", async () => {
    await CreateProjectTeamSelf(name);
    await AddPrizeSelf();
    return agent
      .get("/api/projectTeam/self")
      .expect(200)
      .then(res => {
        expect(res.body.success.Prizes.length).toBeGreaterThan(0);
      });
  });

  test("Remove Prize", async () => {
    await CreateProjectTeamSelf(name);
    const prize = await GetFirstPrize();
    await AddPrizeSelf();
    return agent
      .delete("/api/projectTeam/self/deletePrize/" + prize.id)
      .expect(200)
      .then(res => {
        expect(res.body.success.Prizes.length).toBe(0);
      });
  });

  test("Update a team", async () => {
    await CreateProjectTeamSelf(name);
    const fields = {
      devpostLink: "devpost2",
      githubLink: "github2",
      name: "thicc new name"
    };
    return agent
      .put("/api/projectTeam/self")
      .send(fields)
      .expect(200)
      .then(res => {
        expect(res.body.success).toMatchObject(fields);
      });
  });

  test("Remove Only Team Member", async () => {
    await CreateProjectTeamSelf(name);
    return agent
      .delete("/api/projectTeam/self/deleteMember/" + 1)
      .expect(200)
      .then(res => {
        expect(res.body.success).toBeNull();
      });
  });
});

describe("Project Team Requests (Parallel)", () => {
  test("Get my Project Team", async () => {
    const name = "TestProjectTeam";
    await CreateProjectTeamSelf(name);
    return agent
      .get("/api/projectTeam/self")
      .expect(200)
      .then(res => {
        expect(res.body.success.name).toBe(name);
      });
  });

  test("Get all Project Teams doesn't fail", async () => {
    return agent.get("/api/projectTeam/list").expect(200);
  });
});
