const { Client } = require('../../utils/db.js');



exports.createUser = async function (req, res) {
    const user_id = req.body.user_id;
    const admin_level = req.body.admin_level;
    const password = req.body.password;

    const client = await Client();

    await client
        .query(`INSERT INTO credentials VALUES ($1,$2,$3);`,[user_id,password,admin_level])
        .then(resData => {
            res.status(200).send({ msg: ` '${user_id}' is added` });
        })
        .catch(err => {
            console.log(`${err}`);
            res.status(400).send({ msg: `${err}` });
        });

    await client.release();


}