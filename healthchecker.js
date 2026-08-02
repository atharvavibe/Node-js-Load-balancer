const axios = require("axios")

const servers = require("./serverlist");
const logger = require("./logger");


setInterval(async () => {
    //console.log("Health checks started.....");

        for(const server of servers){
            try {
                const response = await axios.get(server.url + "health"); 
                //console.log(server.id);
                server.healthy = true;
                console.log(`Server ${server.id} is healthy...`);
                logger.info(`Server ${server.id} is healthy...`);
            }
            catch (error) {
                server.healthy = false;
                console.log(`Server ${server.id} is unhealthy...`);
                logger.info(`Server ${server.id} is unhealthy...`);
            }
  
        }
},5000);