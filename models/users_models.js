const db = require("../database/dbConfig");

async function createNewUser(data) {
  const [id] = await db("users").insert(data, "id");
  return db("users").where(id).first();
}

async function findUser(data) {
  const user = await db("users").where(data).first();
  if (user) {
    const stories = await findStory(user.id);
    const favorites = await findfavorite(user.id);
    return { user, stories, favorites };
  }
  return user;
}

async function updateUser(data) {
  return db("users").where({ username: data.username }).update(data);
}

async function findStory(id) {
  const userStories = await db("stories")
    .where({ "stories.user_id": id })
    .join("users", "stories.user_id", "users.id")
    .select(
      "stories.id as storyId",
      "stories.author",
      "stories.url",
      "stories.title",
      "stories.createdAt",
      "username"
    );
  return userStories;
}

async function findfavorite(userId) {
  const favoriteStories = db("favorites_stories")
    .select("*", "story_id as storyId")
    .join("stories", "favorites_stories.story_id ", "stories.id")
    .join("users", "favorites_stories.user_id", "users.id")
    .where({ "users.id": userId });
  return favoriteStories;
}

async function addTofavorites(data) {
  const fav = await db("favorites_stories").insert(data, "id");
  return findUser({ id: data.user_id });
}

async function deleteFromfavorites(data) {
  const fav = await db("favorites_stories").where(data).del();
  return findUser({ id: data.user_id });
}

module.exports = {
  createNewUser,
  findUser,
  updateUser,
  addTofavorites,
  findfavorite,
  deleteFromfavorites,
};
