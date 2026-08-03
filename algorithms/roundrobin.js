let currentServer = 0;


function getNextHealthyServer(servers){
    let attempts = 0;
    while(attempts<servers.length){
        if(!servers[currentServer].healthy){
            currentServer = (currentServer+1) % servers.length;
            attempts++;
            continue;
        }
        else{
            let selectedServer = currentServer;
            currentServer = (currentServer+1) % servers.length;;
            return servers[selectedServer];
            
        }
    }
    return null;
}

module.exports = getNextHealthyServer;