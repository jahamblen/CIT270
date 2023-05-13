const express=require("express");
const bodyParser = require('body-parser');
const Redis = require('redis');
const app=express();
const port = 3000
const redisClient = Redis.createClient();

app.use(bodyParser.json()); //allow JSON (Javascript Object Notation) requests

app.listen(port, ()=> {
    redisClient.connect();
    console.log("Listening on port: " + port);
});

app.get('/', (req, res) => {
    res.send("Welcome to your node server");
   
})

app.post('/login',(req,res)=>{
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;
    if (password==="Password1!"){
        //this happens if the password is correct
        res.send("Welome "+userName);
    } else {
        // this happens if the password is incorrect
        res.status(401);//unauthorized 
        res.send("Incorrect password")
    }
    
});

