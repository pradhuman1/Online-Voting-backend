const { Client } = require('../../utils/db.js');



exports.createUser = async function (req, res) {
    const user_id = req.body.user_id;
    const admin_level = req.body.admin_level;
    const password = req.body.password;



    // console.log(log_message)

    // console.log(user_id, name, admin_level)
    // var ret;
    // if (!user_id || !name || admin_level == undefined) {

    //     res.status(400).send({ msg: 'userID,name and Admin level are mandatory' });
    //     return { msg: 'userID,name and Admin level are mandatory' };
    // }

    const client = await Client();
    var data;

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