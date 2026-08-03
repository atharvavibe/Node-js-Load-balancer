const express = require("express");
const axios = require("axios");

const servers = require("./serverlist");
const healthChecker = require("./healthchecker");
const roundRobin = require("./algorithms/roundrobin");
const getNextHealthyServer = require("./algorithms/roundrobin");
const getLeastConnectionsServer = require("./algorithms/leastconnections");

const app = express();

//let currentServer= 0;


app.get("/", async(req,res) => {
    //Round Robin
    // let attempts = 0;
    // while(attempts < servers.length){
    //      let server = getNextHealthyServer(servers);

    //  if(server == null){
    //             return res.status(503).json({
    //                 message: "No healthy server available"
    //             })
    //         }
    // try {
    //     const response = await axios.get(server.url);
    //     return res.json(response.data);
    // } catch (error) {
    //     server.healthy = false;
    //     attempts++;
    // }
    // }

    //Least Connections
    let attempts = 0;
    while(attempts < servers.length){
        let server = getLeastConnectionsServer(servers);
        
        if(server == null){
            return res.status(503).json({
                message : "No healthy server available"
            })
        }

        server.activeconnections++;
        console.log(
            `Increment -> Server ${server.id}: ${server.activeconnections}`
        );

        try {
            const response = await axios.get(server.url);
            return res.json(response.data);
        } catch (error) {
            server.healthy = false;
            attempts++;
            
        }
        finally{
            if(server != null){
                server.activeconnections--;
                console.log(
                    `Decrement -> Server ${server.id}: ${server.activeconnections}`
                );
            }
            
        }
    }

});

app.listen(3000,()=>{
    console.log("Load balancer running on port 3000");
});