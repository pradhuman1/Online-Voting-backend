//For activate/deactivate election
const { Client } = require('../../utils/db.js');



exports.giveVote = async function (req, res) {
    const election_id = req.body.election_id;
    const candidate_id = req.body.candidate_id;

    const client = await Client();

    await client
        .query(`SELECT * FROM candidate WHERE candidate_id=$1 AND election_id=$2;`,[candidate_id,election_id])
        .then(async (resData) => {
            // console.log(resData.rows[0])
            let votes = resData.rows[0].votes + 1;
            // console.log(votes)
            const client1 = await Client();
            await client1
                .query(`UPDATE candidate SET votes=$3 WHERE candidate_id=$1 AND election_id=$2`,[candidate_id,election_id,votes])
                .then(response =>{
                    res.status(200).send({msg:'Successfully voted'})
                })
                .catch(err=>{
                    console.log(`${err}`);
                    res.status(400).send({ msg: `${err}` });                
                });
        })
        .catch(err => {
            console.log(`${err}`);
            res.status(400).send({ msg: `${err}` });
        });

    await client.release();


}