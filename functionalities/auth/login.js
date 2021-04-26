const { Client } = require('../../utils/db.js');

exports.verifyUser = async function (req, res) {
    const user_id = req.body.user_id;
    const password = req.body.password;
    const admin_level = req.body.admin_level;


    const client = await Client();
    var data;


    await client
        .query(`SELECT * FROM credentials WHERE user_id=$1 AND password=$2 AND admin_level=$3;`, [user_id, password, admin_level])
        .then((resData) => {
            if(resData.rows.length===1) res.status(200).end();
            else res.status(400).end();
        })
        .catch((err)=>{
            console.log(`loginERR : ${err}`)
            res.status(400).end();
        })

    await client.release();

}