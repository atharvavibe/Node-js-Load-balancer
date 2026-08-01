const express = require("express");

const app = express();

app.get("/", (re,res) => {
    res.json({
        server: "Server 3",
        message: "Hello from server 3"
    })
})

app.listen(3003, ()=>{
    console.log("Server 3 is running")
})