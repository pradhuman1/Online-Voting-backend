const { pool } = require('./utils/config.js');
const { Client } = require('./utils/db.js');



exports.fillDummydata = async function (req, res) {

    const client = await Client();
    try {

        await client
        .query("INSERT INTO credentials (user_id,password,admin_level) VALUES ('admin_01','admin_01',2)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));
      
        await client
        .query("INSERT INTO credentials (user_id,password,admin_level) VALUES ('agent_01','agent_01',1)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));

        await client
        .query("INSERT INTO credentials (user_id,password,admin_level) VALUES ('voter_01','voter_01',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));

        await client
        .query("INSERT INTO credentials (user_id,password,admin_level) VALUES ('voter_02','voter_02',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));
        
        await client
        .query("INSERT INTO credentials (user_id,password,admin_level) VALUES ('voter_03','voter_03',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));
        

        await client
        .query("INSERT INTO election (election_id,title,address,active) VALUES ('01','Lok Sabha','Kerela',1)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));
        
        await client
        .query("INSERT INTO election (election_id,title,address,active) VALUES ('02','Panchayat','Uttar Pradesh',1)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));

        await client
        .query("INSERT INTO candidate (candidate_id,election_id,name,gender,party,party_logo,votes) VALUES ('01','01','Ganesh','Male','BJP','KAMAL',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));

        await client
        .query("INSERT INTO candidate (candidate_id,election_id,name,gender,party,party_logo,votes) VALUES ('02','01','Dinesh','Male','AAP','Broom',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));

        await client
        .query("INSERT INTO candidate (candidate_id,election_id,name,gender,party,party_logo,votes) VALUES ('03','01','Shweta','Female','Congress','Hand',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));


        await client
        .query("INSERT INTO candidate (candidate_id,election_id,name,gender,party,party_logo,votes) VALUES ('04','02','Ramesh','Male','BJP','KAMAL',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));

        await client
        .query("INSERT INTO candidate (candidate_id,election_id,name,gender,party,party_logo,votes) VALUES ('05','02','Ghanshyam','Male','AAP','Broom',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));

        await client
        .query("INSERT INTO candidate (candidate_id,election_id,name,gender,party,party_logo,votes) VALUES ('06','02','Manoj','Male','Congress','Hand',0)")
        .then(res => console.log("Data added"))
        .catch(err => console.log(`${err}`));

        res.status(200).send("Data filled");
        await client.release();

    } catch (err) {
        res.status(503).send(`Error : ${err}`);
    }

}
