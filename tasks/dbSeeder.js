const hpFactory = require("../tests/factories/hackerProfile");
const personFactory = require("../tests/factories/person");
const prizeFactory = require("../tests/factories/prize");
const projectTeamFactory = require("../tests/factories/projectTeam");
const houseFactory = require("../tests/factories/house");

const db = require("../api/models");

const seedDatabase = async () => {
  if (
    process.env.NODE_ENV == "production" ||
    db.sequelize.config.database == "production"
  ) {
    throw Error("DON'T WIPE PROD YOU ABSOLUTE FOOL");
  }

  // Quick truncate everything | much faster than sequelize.sync()
  await Promise.all[
    Object.values(db).map(function(model) {
      if (model.destroy) {
        console.log("Destroying", model);
        return model.destroy({ truncate: { cascade: true } });
      }
    })
  ];

  // Generate 5 Test Persons & Hacker Profiles
  const persons = await IteratePromises(5, async i => {
    const hp = await hpFactory({
      userId: i.toString(),
      status: "checkedIn"
    }).catch(console.log);

    const house = await houseFactory();

    const person =
      hp !== undefined
        ? await personFactory({ identityId: hp.userId }).catch(console.log)
        : await personFactory({ identityId: i.toString() }).catch(console.log);
    await person.setHome(house);
    return person;
  });

  const admin = await hpFactory({
    userId: "adminy",
    role: "admin",
    firstName: "McAdmin"
  });

  await IteratePromises(5, i => prizeFactory());

  await projectTeamFactory({ name: "TestProjectTeam" });

  const fullTeam = await projectTeamFactory({ name: "FullTeam" });
  fullTeam.addMember(persons.slice(1));
  return;
};

const IteratePromises = (count, func) => {
  const promises = [];
  for (let i = 0; i < count; i++) {
    promises.push(func(i));
  }
  return Promise.all(promises);
};

module.exports = seedDatabase;
