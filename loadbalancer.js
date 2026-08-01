const express = require("express");
const axios = require("axios");

const servers = require("./serverlist");

const app = express();

let currentServer= 0;

app.get("/", async(req,res) => {
    try{
        const response = await axios.get(servers[currentServer].url);
        currentServer = (currentServer+1) % servers.length; //Round Robin Algorithm implemented for request handling
        console.log(response.data);
        res.json(response.data);
    }
    catch(exception){
        console.error(`Failed to connect to ${servers[currentServer].url}`);
        res.status(500).json({
            message: "Backend server not available"
        })
    }
})

app.listen(3000,()=>{
    console.log("Load balancer running on port 3000");
});