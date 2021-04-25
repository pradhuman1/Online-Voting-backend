const { Client } = require('../../utils/db.js');




exports.removeElection = async function (req, res) {
    const election_id = req.body.election_id;


    const client = await Client();

    await client
        .query(`DELETE FROM election WHERE election_id=$1`, [election_id])
        .then(resData => {
            res.status(200).send(` '${election_id}' Removed`);

        })
        .catch(err => {
            console.error(err);
            res.status(400).send(`Election Not found`);

        });
    await client.release();


}