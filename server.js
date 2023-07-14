const { createHash } = require ('node:crypto');
const https = require('https')
const fs = require('fs')
const express=require("express");
const bodyParser = require('body-parser');
const Redis = require('redis');
const app=express();
const port = 3000;
const redisClient = Redis.createClient({
    socket: {
        host: 'redis-stedi-josh',
        port: '6379'
    }
});


app.use(bodyParser.json()); //allow JSON (Javascript Object Notation) requests



// https.createServer({
//     key: fs.readFileSync('/etc/letsencrypt/archive/joshhamblen.cit270.com/privkey1.pem'), //This is a private key
//     cert: fs.readFileSync('/etc/letsencrypt/archive/joshhamblen.cit270.com/cert1.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/archive/joshhamblen.cit270.com/chain1.pem')//This is a self-signed certification
//   }, app).listen(port, () => {
//     redisClient.connect();
//     console.log('Listening...')
//   })

app.listen(port, ()=> {
    redisClient.connect();
    console.log("Listening on port: " + port);
});

app.get('/', (req, res) => {
    res.send("Welcome to your node server");
   
})

app.post('/login',async (req,res)=>{
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;//we need to hash the password the user gave us
    const hashedPassword = password==null ? null : createHash('sha3-256').update(password).digest('hex');
    console.log("Hashed Password: "+hashedPassword);
    const redisPassword = password==null ? null : await redisClient.hGet('users',userName);
    console.log("Redis Password for "+userName+": "+redisPassword);
    if (password!=null && hashedPassword===redisPassword){
        //this happens if the password is correct
        res.send("Welome "+userName);
    } else {
        // this happens if the password is incorrect
        res.status(401);//unauthorized 
        res.send("Incorrect password")
    }
    
});

