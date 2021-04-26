const { Client } = require('../../utils/db.js');

exports.listElection = async function (req, res) {
    const voter_id = req.body.voter_id;
    var skipElections=[];
    const client = await Client();
    if(voter_id){
        await client
            .query('SELECT * from votes WHERE voter_id=$1',[voter_id])
            .then((resData)=>{
                skipElections = resData.rows;
                // console.log(skipElections); 
            })
            .catch((err)=>console.log(`${err}`))
    }
    await client
        .query('SELECT * FROM election')
        .then(response => {
            for(var i=0;i<response.rows.length;i++){
                // console.log(response.rows[i])
                for(var j=0;j<skipElections.length;j++){
                    if(response.rows[i].election_id===skipElections[j].election_id){
                        response.rows.splice(i,1);
                        break;
                    }
                }
            }
            // console.log(response.rows.length)
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