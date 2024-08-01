const dotenv = require("dotenv");
const knex = require('knex');

dotenv.config();
const {PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT} = process.env;

const db = knex({
    client: 'pg',
    connection: {
        host: PGHOST,
        port: PGPORT,
        user: PGUSER,
        database: PGDATABASE,
        password: PGPASSWORD
    }
});

async function getVersion() {
  try {
      const result = await db.raw('SELECT version()');
      console.log(result);
  } catch (err) {
      console.error('Error fetching database version:', err);
  }
}

// Create exercises table if it doesn't exist
const createExercisesTable = async () => {
  const exists = await db.schema.hasTable('exercises');
  if (!exists) {
      try {
          await db.schema.createTable('exercises', table => {
              table.increments('id').primary();
              table.string('name', 100).notNullable();
              table.string('type', 30).notNullable();
              table.string('muscle', 50).notNullable();
              table.string('equipment', 100).notNullable();
              table.string('difficulty', 50).notNullable();
              table.text('instructions').notNullable();
          });
          console.log('Table "exercises" created successfully');
      } catch (err) {
          console.error('Error creating table "exercises":', err);
      }
  } else {
      console.log('Table "exercises" already exists');
  }
};

const createRecepiesTable = async () => {
  const exists = await db.schema.hasTable('recepies');
  if (!exists) {
      try {
          await db.schema.createTable('recepies', table => {
              table.increments('id').primary();
              table.string('title', 100).notNullable();
              table.text('ingredients').notNullable();
              table.string('servings', 50).notNullable();
              table.text('instructions').notNullable();
          });
          console.log('Table "recepies" created successfully');
      } catch (err) {
          console.error('Error creating table "recepies":', err);
      }
  } else {
      console.log('Table "recepies" already exists');
  }
};

const createUsersTable = async () => {
  const exists = await db.schema.hasTable('users');
  if (!exists) {
      try {
          await db.schema.createTable('users', table => {
              table.increments('id').primary();
              table.string('username', 50).unique().notNullable();
              table.string('password', 255).notNullable();
              table.string('email', 100).unique().notNullable();
              table.integer('weight').notNullable();
              table.integer('height').notNullable();
              table.string('gender', 10).notNullable();
              table.string('bmistatus', 30);
              table.string('intensity', 30);
          });
          console.log('Table "users" created successfully');
      } catch (err) {
          console.error('Error creating table "users":', err);
      }
  } else {
      console.log('Table "users" already exists');
  }
};

const runMigrations = async () => {
  await createExercisesTable();
  await createRecepiesTable();
  await createUsersTable();
};

runMigrations();

module.exports = db;