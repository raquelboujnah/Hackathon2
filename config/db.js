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

module.exports =  db
