const { pool } = require('./config.js');

exports.Client = async function () {
    try {
        // console.log(pool.idleCount, pool.totalCount, pool.waitingCount);
        client = await pool.connect();
        return client;
    } catch (err) {
        return res.status(503).end("Server Error,Please try again after some time");
    }
}