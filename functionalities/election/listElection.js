const { Client } = require('../../utils/db.js');

exports.listElection = async function (req, res) {
    const client = await Client();
    await client
        .query('SELECT * FROM election')
        .then(response => {
            // console.log(response.rows);
            res
                .status(200)
                .json({
                    elections: response.rows
                })
                .end();

        })
        .catch(err => {
            console.log(`${err}`)
            res
                .status(400)
                .json({
                    msg: 'Cannot Get Election List'
                })
                .end();

        });
        client.release();


    }