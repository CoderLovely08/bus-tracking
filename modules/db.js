const { Pool } = require('pg');
try {
    const pool = new Pool({
    connectionString: "postgres://cscftxyw:T8nLtgumj5nU4AfoI7LHMIVFYO7yePi6@tiny.db.elephantsql.com/cscftxyw",
        ssl: {
            rejectUnauthorized: false,
            connectionTimeoutMillis: 5000
        }
    });
} catch (error) {
    console.log(error);
} finally {
    const pool = new Pool({
    connectionString: "postgres://cscftxyw:T8nLtgumj5nU4AfoI7LHMIVFYO7yePi6@tiny.db.elephantsql.com/cscftxyw",
        ssl: {
            rejectUnauthorized: false,
            connectionTimeoutMillis: 10000
        }
    });
    module.exports = pool;
}
