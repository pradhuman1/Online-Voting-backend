const { Client } = require('../../utils/db.js');



exports.createVote = async function (req, res) {
    const voter_id = req.body.voter_id;
    const name = req.body.name;
    const dob = req.body.dob;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const election_id = req.body.election_id;
    const candidate_id = req.body.candidate_id;

    const client = await Client();

    await client
        .query(`INSERT INTO voter VALUES ($1,$2,$3,$4,$5,$6,$7);`,[voter_id,name,dob,address,phone_number,election_id,candidate_id])
        .then(resData => {
            res.status(200).send({ msg: ` '${voter_id}' is added` });
        })
        .catch(err => {
            console.log(`${err}`);
            res.status(400).send({ msg: `${err}` });
        });

    await client
        .query('INSERT INTO votes VALUES($1,$2)',[voter_id,election_id])
        .then(()=>console.log("Vote Saved"))
        .catch((err)=>console.log(`${err}`));

    await client.release();


}