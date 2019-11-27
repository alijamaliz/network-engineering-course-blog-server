const Pool = require('pg').Pool;
let pool = null;

class DBHelper {
    constructor() {
        if (!pool) {
            pool = new Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASS,
                port: process.env.DB_PORT
            });
        }
        return pool;
    }
}

module.exports = DBHelper;
