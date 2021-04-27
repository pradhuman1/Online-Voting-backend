const { Client } = require('../../utils/db.js');




exports.removeCandidate = async function (req, res) {
    const candidate_id = req.body.candidate_id;

    const client = await Client();

    await client
        .query(`DELETE FROM candidate WHERE candidate_id=$1`, [candidate_id])
        .then(resData => {
            if(resData.rowCount)
            res.status(200).send({msg:`Candidate ${candidate_id} removed`});
            else
            res.status(200).send({msg:`Candidate ${candidate_id} not found`});


        })
        .catch(err => {
            console.error(err);
            res.status(400).send({msg:"Unable to remove candidate"});

        });
    await client.release();


}