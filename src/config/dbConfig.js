module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    pool: {
        max: 10,
        min: 1,
        acquire: 20000,
        idle: 10000
    },
    dialectOptions: {
        useUTC: false,
        ssl: false,
        client_encoding: 'utf8',
        keepalives: true
    },
    timezone: '+06:00'
}
