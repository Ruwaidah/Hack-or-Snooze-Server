const db = require("../database/dbConfig");

async function createNewUser(data) {
  const [id] = await db("users").insert(data, "id");
  console.log(id);
  const user = await db("users").where(id).first();
  const stories = findStory(user.id);
}

async function findUser(data) {
  console.log("data", data);
  const user = await db("users").where(data).first();
  console.log("find", user);
  const stories = await findStory(user.id);
  console.log(stories);
  const favoritesStory = await findfavorite(user.id);
  //   return { user, stories, favoritesStory };
  console.log("favoritesStory", favoritesStory);
  return {user, stories, favoritesStory}
}

async function findStory(id) {
  const userStories = await db("stories").where({ user_id: id });
  return userStories;
}

async function findfavorite(userId) {
  console.log("userId", userId);
  const favoriteStories = db("favorites_stories")
    .select("*")
    .join("stories", "favorites_stories.story_id", "stories.id")
    .join("users", "favorites_stories.user_id", "users.id")
    .where({ "users.id": userId });
  return favoriteStories;
}

module.exports = { createNewUser, findUser };
