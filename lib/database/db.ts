const mysql = require("serverless-mysql");
const config = require("./config");

const db = mysql({
  config: config[process.env.NODE_ENV]
});

let query = async query => {
  try {
    const results = await db.query(query);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
};

export { db, query };
