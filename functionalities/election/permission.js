//For activate/deactivate election
const { Client } = require('../../utils/db.js');



exports.updateElection = async function (req, res) {
    const election_id = req.body.election_id;
    const active = req.body.active;

    const client = await Client();

    await client
        .query(`UPDATE election SET active=$2 WHERE election_id=$1;`,[election_id,active])
        .then(resData => {
            res.status(200).send({ msg: ` '${election_id}' is updated` });
        })
        .catch(err => {
            console.log(`${err}`);
            res.status(400).send({ msg: `${err}` });
        });

    await client.release();


}