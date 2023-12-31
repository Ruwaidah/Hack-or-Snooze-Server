const db = require("../database/dbConfig.js");

function getAllStories() {
  return db("stories")
    .join("users", "stories.user_id", "users.id")
    .select(
      "stories.id as storyId",
      "stories.author",
      "stories.url",
      "stories.title",
      "stories.createdAt",
      "username"
    );
}

async function addStory(data) {
  const [id] = await db("stories").insert(data, "id");
  return db("stories")
    .where({ "stories.id": id.id })
    .join("users", "stories.user_id", "users.id")
    .select(
      "stories.id as storyId",
      "stories.author",
      "stories.url",
      "stories.title",
      "stories.createdAt",
      "username"
    )
    .first();
}

function updateStory(id, data) {
  return db("stories").where(id).update(data);
}

function deleteStory(id) {
return db("stories").where(id).del()
}

module.exports = { getAllStories, addStory, updateStory, deleteStory };
