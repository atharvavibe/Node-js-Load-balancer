const express = require("express");

const app = express();

app.get("/",async (req,res) =>{
    //for leastconnections algorithm testing purpose start
    console.log("Server 1 START");
    await new Promise(resolve => setTimeout(resolve, 100000));
    console.log("Server 1 END");//for leastconnections algorithm testing purpose end

    res.json({
        server: "Server 1",
        message:"Hello from server 1"
    })
    //console.log(req.query.id);
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy"
    });
});

app.listen(3001,() => {
    console.log("Server 1 running on port 3001");
})