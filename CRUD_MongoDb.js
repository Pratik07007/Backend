const express = require("express");
const app = express();
app.use(express.json());

const mg = require("mongoose");

mg.connect(
  "mongodb+srv://Pratik:AccessGranted@cluster01.2avpg7m.mongodb.net/crudInMongo"
);

const userSchema = {
  name: String,
  email: String,
  password: String,
};

const User = mg.model("user", userSchema);

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  User.create({
    name,
    email,
    password,
  });

  res.json({ msg: "User regestered succesfully" });
});

app.listen(3001);
