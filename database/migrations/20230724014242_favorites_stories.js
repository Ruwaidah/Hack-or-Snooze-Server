/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favorites_stories", (tbl) => {
    tbl.increments();
    tbl
      .integer("story_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("stories")
      .onDelete("CASCADE");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");
    tbl.unique(["story_id", "user_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists();
};
