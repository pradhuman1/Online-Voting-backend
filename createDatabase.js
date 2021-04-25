const { Client } = require('./utils/db.js');
var client;

async function createTable(query, table_name) {

    try {
        await client
            .query(query)
            .then(response => console.log(`Table '${table_name}' Created`))
            .catch(err => console.log(`${err}`));
    } catch (err) {
        console.log(`${err}`);
    }

}

async function dropTable(table_name) {
    try {
        await client
            .query(`DROP TABLE IF EXISTS ${table_name}`)
            .then(response => console.log(`Table '${table_name}' Dropped`))
            .catch(err => console.log(`${err}`));
    } catch (err) {
        console.log(`${err}`);
    }
}

exports.createdb = async function (req, res) {
    try {
        client = await Client();
        //Warning : Dropping sequence is imp as foreign key constraints may interfere
        // await dropTable('notification');
        // await dropTable('logs');
        // await dropTable('user_table');
        // await dropTable('ldap');
        // await dropTable('marks');
        // await dropTable('results');
        // await dropTable('fees');
        // await dropTable('disciplinary_actions');
        // await dropTable('student');
        // await dropTable('course');
        // await dropTable('semester');
        // await dropTable('branch');
        // await dropTable('program');




        /* CREATING TABLES */

        //credentials
        await createTable('CREATE TABLE credentials(user_id VARCHAR(100) NOT NULL PRIMARY KEY,password VARCHAR(100) NOT NULL,admin_level INT);', 'credentials');

        //voters
        
        res.status(200).send("DB created");
        await client.release();
    } catch (err) {
        console.log(`${err}`);
        res.status(400).send("Unable to create DB");
    }

}