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

  // Quick truncate everything | much faster than sequelize.sync()
  await Promise.all[
    Object.values(db).map(function(model) {
      if (model.destroy) {
        return model.destroy({ truncate: { cascade: true } });
      }
    })
  ];

  // Generate 5 Test Persons & Hacker Profiles
  for (let i = 0; i < 5; i++) {
    const hp = await hpFactory({ userId: i.toString() });
    personFactory({ identityId: hp.userId });
  }

  // Generate 5 Test Prizes
  for (let i = 0; i < 5; i++) {
    const hp = await prizeFactory();
  }
};

module.exports = seedDatabase;
