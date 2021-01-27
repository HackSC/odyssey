const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "test";

import config from "../config";
import { DBType } from "./types";

let env_config = config[env];

let db: DBType = {
  sequelize: null,
  Sequelize: null,
};

console.log(env_config.database);
console.log(env_config.username);

console.log(env_config.password);
console.log(env_config);

let sequelize = new Sequelize(
  env_config.database,
  env_config.username,
  env_config.password,
  env_config
);

let model;
model = sequelize.import("./action");
console.log(model);
db[model.name] = model;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
