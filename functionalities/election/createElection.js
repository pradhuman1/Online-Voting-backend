const { Client } = require('../../utils/db.js');



exports.createElection = async function (req, res) {
    const election_id = req.body.election_id;
    const title = req.body.title;
    const address = req.body.address;

    const client = await Client();

    await client
        .query(`INSERT INTO election VALUES ($1,$2,$3,1);`,[election_id,title,address])
        .then(resData => {
            res.status(200).send({ msg: ` '${election_id}' is added` });
        })
        .catch(err => {
            console.log(`${err}`);
            res.status(400).send({ msg: `${err}` });
        });

    await client.release();


}