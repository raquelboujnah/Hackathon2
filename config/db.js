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

// connecting to data base
async function getVersion(){
    try{
        const result = await db.raw("select version()");
        console.log(result);
    }catch(err){
        console.log(err);
    }
}
//good connection

const createExercisesTable = async () => {
    try {
      await db.schema.createTableIfNotExists('exercises', table => {
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
      console.error('Error creating table', err);
    }
};
  
  const createRecepiesTable = async () => {
    try {
      await db.schema.createTableIfNotExists('recepies', table => {
        table.increments('id').primary();
        table.string('title', 100).notNullable();
        table.text('ingredients').notNullable();
        table.string('servings', 50).notNullable();
        table.text('instructions').notNullable();
      });
      console.log('Table "recepies" created successfully');
    } catch (err) {
      console.error('Error creating table', err);
    }
};
  
  const createUsersTable = async () => {
    try {
      await db.schema.createTableIfNotExists('users', table => {
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
      console.error('Error creating table', err);
    }
};

getVersion()
createExercisesTable()
createRecepiesTable()
createUsersTable()

module.exports = db
