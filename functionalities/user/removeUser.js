const { Client } = require('../../utils/db.js');




exports.removeUser = async function (req, res) {
    const user_id = req.body.user_id;


    const client = await Client();

    await client
        .query(`DELETE FROM credentials WHERE user_id=$1`, [user_id])
        .then(resData => {
            res.status(200).send(` '${user_id}' Removed`);

        })
        .catch(err => {
            console.error(err);
            res.status(400).send(`User Not found`);

        });
    await client.release();


}