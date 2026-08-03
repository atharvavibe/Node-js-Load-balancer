const express = require("express");
const axios = require("axios");

const servers = require("./serverlist");
const healthChecker = require("./healthchecker");
const roundRobin = require("./algorithms/roundrobin");
const getNextHealthyServer = require("./algorithms/roundrobin");

const app = express();

//let currentServer= 0;


app.get("/", async(req,res) => {
    //Implementation of Round
    let attempts = 0;
    while(attempts < servers.length){
         let server = getNextHealthyServer(servers);

     if(server == null){
                return res.status(503).json({
                    message: "No healthy server available"
                })
            }
    try {
        const response = await axios.get(server.url);
        return res.json(response.data);
    } catch (error) {
        server.healthy = false;
        attempts++;
    }
    }

});

app.listen(3000,()=>{
    console.log("Load balancer running on port 3000");
});