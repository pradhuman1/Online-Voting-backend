const { Client } = require('../../utils/db.js');




exports.removeCandidate = async function (req, res) {
    const candidate_id = req.body.candidate_id;


    const client = await Client();

    await client
        .query(`DELETE FROM candidate WHERE candidate_id=$1`, [candidate_id])
        .then(resData => {
            res.status(200).send(` '${candidate_id}' Removed`);

        })
        .catch(err => {
            console.error(err);
            res.status(400).send(`Candidate Not found`);

        });
    await client.release();


}