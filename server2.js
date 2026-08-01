const express = require("express");

const app = express();

app.get("/",(req,res) =>{
    res.json({
        Server: "Server 2",
        message: "Hello from server 2"
    });
});

app.listen(3002,()=>{
    console.log("Server 2 is running");
})