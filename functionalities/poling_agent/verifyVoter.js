const { Client } = require('../../utils/db.js');


exports.verifyVoter = async function (req, res) {
    const user_id = req.body.user_id;
    const election_id = req.body.election_id;
    const verify = req.body.verify;

    const client = await Client();

    if(verify){
        await client
            .query('UPDATE votes SET verified=$3 WHERE user_id=$1 AND election_id=$2',[user_id,election_id,1])
            .then(()=>console.log("Verified"))
            .catch((err)=>console.log(`verification in votes table : ${err}`))
    }else{
        await client
            .query('DELETE FROM votes WHERE user_id=$1 AND election_id=$2',[user_id,election_id])
            .then(()=>console.log("Verified"))
            .catch((err)=>console.log(`verification in votes table : ${err}`))
    }
    await client
        .query('DELETE FROM voter WHERE user_id=$1 AND election_id=$2',[user_id,election_id])
        .then((resData)=>{
            res.status(200).send({msg:"Verification done"})
        })
        .catch((err)=>{
            console.log(`delete voter : ${err}`);
            res.status(400).send({msg:err})
        })

    await client.release();

}