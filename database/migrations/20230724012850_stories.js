/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("stories", (tbl) => {
    tbl.increments();
    tbl.timestamp("createdAt").defaultTo(knex.fn.now());
    tbl.string("url", 255);
    tbl.string("auth", 100);
    tbl.string("title", 50);
    tbl.integer("user_id").notNullable().references("id").inTable("users");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTableIfExists("stories");
};
