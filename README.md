# Online-Voting-backend

## How To run
* Download pgadmin version 13.2 from `https://www.enterprisedb.com/downloads/postgres-postgresql-downloads`<br>
* Run It
* Make a new server<br>
### server config
`Name : localhost`<br>
`Host name/addr : 127.0.0.1`<br>
`Port : 5433`<br>
`Password : password`<br>
HIT SAVE

### make database

* make a new database named 'online_voting'<br>
HIT SAVE

### Setup node

* open terminal
* `git clone https://github.com/pradhuman1/Online-Voting-backend.git`
* `cd Online-Voting-backend/`
* `npm init -y`
* `npm i pg`
* `npm i nodemon`
* `npm i cors`
* `nodemon index.js`
* For creating database open the link http://localhost:5440/createdb
* For filling dummy data open the link http://localhost:5440/filldummydata

