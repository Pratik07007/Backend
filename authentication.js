const express = require("express");
const jwt = require("jsonwebtoken");
const jwtKey = "helloWorld";
const app = express();

app.use(express.json());

const database = [
  {
    email: "s.dhimal006@gmail.com",
    password: "Admin@123",
  },
  {
    email: "s.dhimal007@gmail.com",
    password: "Admin@1234",
  },
  {
    email: "s.dhimal008@gmail.com",
    password: "Admin@1235",
  },
  {
    email: "s.dhimal009@gmail.com",
    password: "Admin@1236",
  },
  {
    email: "ankitguragain54@gmail.com",
    password: "Password",
  },
];

function userExists(users, email, password) {
  return users.some(
    (user) => user.email === email && user.password === password
  );
}

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const resposne = userExists(database, email, password); //return true if user's emal and password matches else returns false

  if (!resposne) {
    res.json({ messege: "Sorry user doesn't exist, please sign up first" });
  } else {
    const token = jwt.sign({ email: email, password: password }, jwtKey);
    res.status(200).json({ token: token });
  }
});

app.get("/users", (req, res) => {
  try {
    const authorization = req.headers.authorization;

    const response = jwt.verify(authorization, jwtKey);
    res.status(200).json({ response });
  } catch {
    res
      .status(403)
      .json({ messege: "Failed to authenticated user please try again" });
  }
});

app.listen(3000);
