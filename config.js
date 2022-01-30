const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    api: {
        port: process.env.API_PORT || 3001,
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || '',
    },
}