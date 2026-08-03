
function getLeastconnectionsServer(servers){
    let minimumConnections = Number.MAX_SAFE_INTEGER;
    let selectedServer;

    for(const server of servers){
         console.log(
        `Server ${server.id} | Active: ${server.activeconnections} | Healthy: ${server.healthy}`
         );
        if(server.activeconnections < minimumConnections && server.healthy){
            minimumConnections = server.activeconnections;
            selectedServer = server;
        }
    }

    if(minimumConnections == Number.MAX_SAFE_INTEGER) return null;

    return selectedServer;

}

module.exports = getLeastconnectionsServer;