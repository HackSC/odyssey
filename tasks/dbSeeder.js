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
  try {
    await Promise.all[
      Object.values(db).map(function (model) {
        if (model.destroy) {
          return model.destroy({ truncate: { cascade: true } });
        }
      })
    ];
  } catch (e) {
    console.error("Failed to destroy all models: ", e);
  }

  // Generate 5 Test Persons & Hacker Profiles
  const persons = await IteratePromises(5, async (temp_iterator) => {
    var i = temp_iterator;

    prizeFactory();

    const hp = await hpFactory({
      userId: i.toString(),
      status: "checkedIn",
    }).catch(console.info);

    const house = await houseFactory();

    const projTeam = await projectTeamFactory({ name: "TestProjectTeam" });

    const person =
      hp !== undefined
        ? await personFactory({
            identityId: hp.userId,
            ProjectTeamId: projTeam.id,
          }).catch(console.info)
        : await personFactory({
            identityId: i.toString(),
            ProjectTeamId: projTeam.id,
          }).catch(console.info);
    await person.setHome(house);
    return person;
  });

  const admin = await hpFactory({
    userId: "adminy",
    role: "admin",
    firstName: "McAdmin",
  });

  //await IteratePromises(5, i => prizeFactory());

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
