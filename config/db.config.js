require('dotenv').config();
module.exports = {
    hostname: process.env.DB_HOST ?? 'localhost',
    user: process.env.DB_USERNAME ?? 'maiken',
    password: process.env.DB_PASSWORD ?? 'maiken',
    database: process.env.DB_DATABASE ?? 'projet2',
    dialect: "postgres",
    port: process.env.DB_PORT ?? 5432,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
};