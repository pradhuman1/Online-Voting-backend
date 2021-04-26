const { createdb } = require('./createDatabase.js');
const { createUser } = require('./functionalities/user/createUser');
const { removeUser } = require('./functionalities/user/removeUser.js');
const { listUser } = require('./functionalities/user/listUser.js');
const { createElection } = require('./functionalities/election/createElection.js');
const { updateElection } = require('./functionalities/election/permission.js');
const { removeElection } = require('./functionalities/election/removeElection.js');
const { listElection } = require('./functionalities/election/listElection.js');

const { results } = require('./functionalities/election/results.js');
const {createCandidate} = require('./functionalities/candidate/createCandidate.js');
const {removeCandidate} = require('./functionalities/candidate/removeCandidate.js');
const {listCandidate} = require('./functionalities/candidate/listCandidate.js');
const {createVote} = require('./functionalities/voters/saveVote.js')
const {listVoters} = require('./functionalities/poling_agent/listVoters');
const {verifyVoter} = require('./functionalities/poling_agent/verifyVoter.js');

const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.get('/createdb', createdb);
app.post('/user/create', createUser);
app.post('/user/remove', removeUser);
app.post('/user/list', listUser);
app.post('/election/create', createElection);
app.post('/election/remove', removeElection);
app.post('/election/update', updateElection);
app.post('/election/list', listElection);
app.post('/election/results', results);
app.post('/candidate/create', createCandidate);
app.post('/candidate/remove', removeCandidate);
app.post('/candidate/list', listCandidate);
app.post('/savevote', createVote);
app.post('/poling/listvoters', listVoters);
app.post('/poling/verify', verifyVoter);




// app.post('/login', verifyUser);


const PORT = 5440;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})
