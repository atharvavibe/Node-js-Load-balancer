const express = require("express");
const axios = require("axios");

const servers = require("./serverlist");
const healthChecker = require("./healthchecker");

const app = express();

let currentServer= 0;


app.get("/", async(req,res) => {
    try{
            let attempts = 0;
            while(attempts<servers.length){
                if(!servers[currentServer].healthy){
                    currentServer = (currentServer+1) % servers.length;
                    attempts++;
                    continue;
                }
            
                try {
                    const response = await axios.get(servers[currentServer].url);
                    if(response.status == 200){
                        currentServer = (currentServer+1) % servers.length;
                        return res.json(response.data);
                    }
                } catch (error) {
                    servers[currentServer].healthy = false;
                    currentServer = (currentServer+1) % servers.length;
                    attempts++; 
                    console.error(
                        `Server ${servers[currentServer].id} is down: ${error.message}`
                    );
                }
            }
        
    }
    catch(exception){
        //console.error(`Failed to connect to ${servers[currentServer].url}`);
        //console.log(servers[currentServer].healthy);
        //servers[currentServer].healthy = false;
        res.status(500).json({
            message: "No healthy servers available"
        })
    }
})

app.listen(3000,()=>{
    console.log("Load balancer running on port 3000");
});