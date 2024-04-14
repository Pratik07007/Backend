const express = require("express");
const app = express();

app.use(express.json());

//this is just a basic try to check my understanding of middleware not the lgic behind validiation, after this I'm willing to learn ZOD

const passworMiddleWare = (req, res, next) => {
  const password = req.body.password;
  if (password.length <= 8) {
    res.status(403).json({
      msg: "Password must be atleast 9 characters long",
    });
  } else if (password.length >= 30) {
    res.status(403).json({
      msg: "we cannot process this long password please make this in the range of 9 to 29 characters",
    });
  } else {
    next();
  }
};

app.post("/login", passworMiddleWare, (req, res) => {
  res.status(200).json({
    msg: "password length validation succesfully",
  });
});

app.listen(3000);
