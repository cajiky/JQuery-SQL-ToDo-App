//pool will connect to postgres
const pg = require('pg');

const Pool = pg.Pool;

let config = {};

//setting up if/else for local or heroku database usage
if(process.env.DATABASE_URL){
    const params = url.parse(process.env.DATABASE_URL)
    const auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true,
        max: 10,
        idolTimeoutMills: 30000,
    };
} else {
    config = {
        host: 'localhost',
        port: 5432,
        database: 'FocalPoint',
        max: 10,
        idolTimeoutMills: 30000,
    };
}

//declairing which database will be attached to our pool.

const pool = pg.Pool(config);

pool.on('connect',()=>{
    console.log('connection successful to postgres database');
})

pool.on('error',()=>{
    console.log('Error connecting to postgres database');
})

module.exports = pool;