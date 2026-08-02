const express = require("express");

const app = express();

app.get("/",(req,res) =>{
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