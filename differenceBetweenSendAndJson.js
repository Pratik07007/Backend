const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({ hello: "world" });
});

app.get("/json",(req,res)=>{
    res.json({hello:"worldJSON"})
})

app.listen(3001);
