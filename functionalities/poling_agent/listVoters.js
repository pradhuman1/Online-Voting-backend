const { Client } = require('../../utils/db.js');

exports.listVoters = async function (req, res) {
    const election_id = req.body.election_id;
    const client = await Client();
    await client
        .query('SELECT * FROM voter WHERE election_id=$1',[election_id])
        .then(response => {
            // console.log(response.rows);
            res
                .status(200)
                .json({
                    voters: response.rows
                })
                .end();

        })
        .catch(err => {
            console.log(`${err}`)
            res
                .status(400)
                .json({
                    msg: 'Cannot Get Voters List'
                })
                .end();

        });
        client.release();


    }