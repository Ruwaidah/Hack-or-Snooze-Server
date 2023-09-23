const db = require("../database/dbConfig");

async function createNewUser(data) {
  const [id] = await db("users").insert(data, "id");
  return db("users").where(id).first();
}

async function findUser(data) {
  const user = await db("users")
    .where(data)
    .first();
  if (user) {
    const stories = await findStory(user.id);
    const favorites = await findfavorite(user.id);
    return { user, stories, favorites };
  }

  return user;
}

async function findStory(id) {
  const userStories = await db("stories").where({ user_id: id });
  return userStories;
}

async function findfavorite(userId) {
  const favoriteStories = db("favorites_stories")
    .select("*")
    .join("stories", "favorites_stories.story_id", "stories.id")
    .join("users", "favorites_stories.user_id", "users.id")
    .where({ "users.id": userId });
  return favoriteStories;
}

module.exports = { createNewUser, findUser };
