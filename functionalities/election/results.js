const { Client } = require('../../utils/db.js');

exports.results = async function (req, res) {
    const election_id = req.body.election_id;
    const client = await Client();
    await client
        .query('SELECT * FROM candidate WHERE election_id=$1 ORDER BY votes DESC',[election_id])
        .then(response => {
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