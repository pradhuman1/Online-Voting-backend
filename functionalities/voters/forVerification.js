const { Client } = require('../../utils/db.js');



exports.forVerification = async function (req, res) {
    const user_id = req.body.user_id;
    const name = req.body.name;
    const dob = req.body.dob;
    const address = req.body.address;
    const phone_number = req.body.phone_number;
    const election_id = req.body.election_id;

    const client = await Client();

    await client
        .query(`INSERT INTO voter VALUES ($1,$2,$3,$4,$5,$6);`,[user_id,name,dob,address,phone_number,election_id])
        .then(resData => {
            res.status(200).send({ msg: ` '${user_id}' is added for verification` });
        })
        .catch(err => {
            console.log(`forVerification : ${err}`);
            res.status(400).send({ msg: `${err}` });
        });

    await client
        .query('INSERT INTO votes VALUES ($1,$2,0,0)',[election_id,user_id])
        .then(()=>console.log('Added to votes table for verification'))
        .catch((err)=>console.log(`${err}`))
    await client.release();


}