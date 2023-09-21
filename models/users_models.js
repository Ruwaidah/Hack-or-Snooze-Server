const db = require("../database/dbConfig");

async function createNewUser(data) {
  const [id] = await db("users").insert(data, "id");
  console.log(id)
  return db("users").where(id).first();
}

module.exports = { createNewUser };
