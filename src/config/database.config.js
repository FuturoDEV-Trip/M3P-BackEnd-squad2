const { config } = require ('dotenv')
config ()

module.exports = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT_DB,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            require: true
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 // idle timeout in milliseconds
    }
}
