//uses of middleware==> validiation, authentication, rateLimiting, globalCatching

const express = require("express");
const app = express();

app.use(express.json()) //this is also a middle ware which extracts the postBody in a JSON format why use this?==> express doesnot know what will be the format of the postBody(text,json,binary,etc) so to parse it we use a middleware.

// app.use("the middleware") ==>this adds middle ware to every request path
app.get("/", (req, res) => {
  res.json({msg:"Success"}); //if any exception is raised here it redirects to the global catch down
});

//global catch is here(this is also a middleware)
app.use((err, req, res, next) => {
  res.json({ msg: "Something went wrong" });
});

app.listen(3000);
