const express = require("express");

const app = express();

app.get("/", (re,res) => {
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