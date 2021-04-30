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
        // await dropTable('election');
        await dropTable('votes');
        // await dropTable('voter');
        





        /* CREATING TABLES */

        //credentials
        await createTable('CREATE TABLE credentials(user_id VARCHAR(100) NOT NULL PRIMARY KEY,password VARCHAR(100) NOT NULL,admin_level INT);', 'credentials');

        //election
        await createTable('CREATE TABLE election(election_id VARCHAR(100) NOT NULL PRIMARY KEY,title VARCHAR(100),address VARCHAR(500),active INT);', 'election');
        
        //candidate
        await createTable('CREATE TABLE candidate(candidate_id VARCHAR(100) NOT NULL PRIMARY KEY,election_id VARCHAR(100) REFERENCES election(election_id),name VARCHAR(200),gender VARCHAR(100),party VARCHAR(500),party_logo VARCHAR(500),votes INT);','candidate')

        //voter
        await createTable('CREATE TABLE voter(user_id VARCHAR(100) REFERENCES credentials(user_id),name VARCHAR(500),dob VARCHAR(100),address VARCHAR(500),phone_number INT,election_id VARCHAR(100) REFERENCES election(election_id));','voter')

        //votes
        await createTable('CREATE TABLE votes(election_id VARCHAR(100) REFERENCES election(election_id),user_id VARCHAR(100) REFERENCES credentials(user_id),voted INT,verified INT);','votes');

        res.status(200).send("DB created");
        await client.release();
    } catch (err) {
        console.log(`${err}`);
        res.status(400).send("Unable to create DB");
    }

}