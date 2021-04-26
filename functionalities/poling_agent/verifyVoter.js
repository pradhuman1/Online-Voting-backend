const { Client } = require('../../utils/db.js');

async function giveVote(req) {
    const election_id = req.election_id;
    const candidate_id = req.candidate_id;

    const client = await Client();

    await client
        .query(`SELECT * FROM candidate WHERE candidate_id=$1 AND election_id=$2;`,[candidate_id,election_id])
        .then(async (resData) => {
            let votes = resData.rows[0].votes + 1;
            const client1 = await Client();
            await client1
                .query(`UPDATE candidate SET votes=$3 WHERE candidate_id=$1 AND election_id=$2`,[candidate_id,election_id,votes])
                .then(response =>{
                    return ({msg:'Successfully voted'})
                })
                .catch(err=>{
                    console.log(`giveVote : ${err}`);
                    return ({ msg: `${err}` });                
                });
            await client1.release();
        })
        .catch(err => {
            console.log(`giveVote : ${err}`);
            return ({ msg: `${err}` });
        });

    await client.release();


}

exports.verifyVoter = async function (req, res) {
    const voter_id = req.body.voter_id;
    const election_id = req.body.election_id;
    const candidate_id = req.body.candidate_id;
    const verify = req.body.verify;

    const client = await Client();

    if(!verify){
        await client
            .query('DELETE FROM votes WHERE voter_id=$1 AND election_id=$2',[voter_id,election_id])
            .then(()=>console.log("Not Verified"))
            .catch((err)=>console.log(`delete votes : ${err}`))
    }

    else{
        await giveVote({election_id:election_id,candidate_id:candidate_id});
    }


    await client
        .query('DELETE FROM voter WHERE voter_id=$1 AND election_id=$2',[voter_id,election_id])
        .then((resData)=>{
            res.status(200).send({msg:"Verification done"})
        })
        .catch((err)=>{
            console.log(`delete voter : ${err}`);
            res.status(400).send({msg:err})
        })

    await client.release();

}