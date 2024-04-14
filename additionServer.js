const express = require("express");
const app = express();

app.get("/login",(req,res)=>{
    console.log("hello")
    res.send({name:"Pratik"})
})

app.listen(3000,()=>{})