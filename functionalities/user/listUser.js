const { Client } = require('../../utils/db.js');

exports.listUser = async function (req, res) {
    const admin_level = req.body.admin_level;
    const client = await Client();
    await client
        .query('SELECT * FROM credentials WHERE admin_level=$1',[admin_level])
        .then(response => {
            // console.log(response.rows);
            res
                .status(200)
                .json({
                    users: response.rows
                })
                .end();

        })
        .catch(err => {
            console.log(`${err}`)
            res
                .status(400)
                .json({
                    msg: 'Cannot Get Users List'
                })
                .end();

        });
        client.release();


    }