const { Client } = require('../../utils/db.js');



exports.createCandidate = async function (req, res) {
    const candidate_id = req.body.candidate_id;
    const election_id = req.body.election_id;
    const name = req.body.name;
    const gender = req.body.gender;
    const party = req.body.party;
    const party_logo = req.body.party_logo;
    const votes = req.body.votes;


    const client = await Client();
    var data;

    await client
        .query(`INSERT INTO candidate VALUES ($1,$2,$3,$4,$5,$6,$7);`,[candidate_id,election_id,name,gender,party,party_logo,votes])
        .then(resData => {
            res.status(200).send({ msg: ` '${candidate_id}' is added` });
        })
        .catch(err => {
            console.log(`${err}`);
            res.status(400).send({ msg: `${err}` });
        });

    await client.release();


}