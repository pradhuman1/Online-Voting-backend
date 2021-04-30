const { Client } = require('../../utils/db.js');

exports.listElection = async function (req, res) {
    const user_id = req.body.user_id;
    var listElectionQuery = 'SELECT * FROM election';
    var focusElections=[];
    var votableElections=[];
    var underVerification=[];
    const client = await Client();
    if(user_id){
        await client
            .query('SELECT * from votes WHERE user_id=$1',[user_id])
            .then((resData)=>{
                focusElections = resData.rows;
                // console.log(skipElections); 
            })
            .catch((err)=>console.log(`${err}`))

        listElectionQuery = 'SELECT * FROM election WHERE active=1';
    }
    // console.log(focusElections)
    await client
        .query(listElectionQuery)
        .then(response => {
            for(var i=0;i<response.rows.length;i++){
                // console.log("res : "+response.rows[i].election_id)
                for(var j=0;j<focusElections.length;j++){
                    // console.log(response.rows[i].election_id+"   "+focusElections[j].election_id)
                    // console.log(response.rows[i].election_id===focusElections[j].election_id+" "+focusElections[j].verified)
                    if(response.rows[i].election_id===focusElections[j].election_id&&focusElections[j].voted===1){
                        response.rows.splice(i,1);
                        i--;
                        break;
                    }else if(response.rows[i].election_id===focusElections[j].election_id&&focusElections[j].verified===0){
                        underVerification.push(response.rows[i])
                        // console.log("h")
                        response.rows.splice(i,1);
                        i--;
                        break;
                    }else if(response.rows[i].election_id===focusElections[j].election_id&&focusElections[j].verified===1){
                        votableElections.push(response.rows[i])
                        response.rows.splice(i,1);
                        i--;
                        break;
                    }
                }
            }
            // console.log(response.rows.length)
            res
                .status(200)
                .json({
                    elections: response.rows,
                    votableElections : votableElections,
                    underVerification: underVerification
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