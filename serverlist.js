const servers = [
    {
        id: 1,
        url: "http://localhost:3001/",
        healthy: true,
        activeconnections: 0,
        weight: 5
    },
    {
        id: 2,
        url: "http://localhost:3002/",
        healthy: true,
        activeconnections: 0,
        weight: 3
    },
    {
        id: 2,
        url: "http://localhost:3003/",
        healthy: true,
        activeconnections: 0,
        weight: 2
    }

]

module.exports = servers;