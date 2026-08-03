const express = require("express");

const app = express();

app.get("/", async (re,res) => {
    //for leastconnections algorithm testing purpose start
    console.log("Server 3 START");
    await new Promise(resolve => setTimeout(resolve, 10000));
    console.log("Server 3 END");//for leastconnections algorithm testing purpose start
    res.json({
        server: "Server 3",
        message: "Hello from server 3"
    })
})

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "healthy"
    });
});

app.listen(3003, ()=>{
    console.log("Server 3 is running")
})