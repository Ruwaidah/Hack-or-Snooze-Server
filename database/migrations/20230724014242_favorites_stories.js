/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("favorites_stories", (tbl) => {
    tbl.increments();
    tbl.integer("story_id").notNullable().references("id").inTable("stories");
    tbl.integer("user_id").notNullable().references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists();
};
