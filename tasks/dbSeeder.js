const hpFactory = require("../tests/factories/hackerProfile");
const personFactory = require("../tests/factories/person");
const prizeFactory = require("../tests/factories/prize");

const db = require("../api/models");

const seedDatabase = async () => {
  if (
    process.env.NODE_ENV == "production" ||
    db.sequelize.config.database == "production"
  ) {
    throw Error("DON'T WIPE PROD YOU ABSOLUTE FOOL");
  }

  await db.sequelize.sync({ force: true });

  // Generate 5 Test Persons & Hacker Profiles
  for (let i = 0; i < 5; i++) {
    const hp = await hpFactory();
    personFactory({ identityId: hp.userId });
  }

  // Generate 5 Test Prizes
  for (let i = 0; i < 5; i++) {
    const hp = await prizeFactory();
  }
};

module.exports = seedDatabase;
