const express = require("express");
const zod = require("zod");
const app = express();
const jwt = require("jsonwebtoken");
const jwtKey = "Access Granted";

app.use(express.json());

const userExists = (users, email, password) => {
  return users.some(
    (user) => user.email === email && user.password === password
  );
};

let allUsers = [
  {
    username: "Pratik",
    email: "s.dhimal006@gmail.com",
    password: "Admin@1234",
  },
];

const validiationMiddleware = (req, res, next) => {
  const payload = req.body;

  const payloadSchema = zod.object({
    username: zod.string(),
    email: zod.string().email(),
    password: zod
      .string()
      .min(8, "Password must be atleast 8 character long")
      .max(32, "Password must not be more than 32 characters")
      .regex(/[0-9]/, "Password mus contain at least one number")
      .regex(/[A-Z]/, "Password must contain one uppercase alphabet")
      .regex(
        /[~!@#$%^&*()_+}{|":?><}]/,
        "Password must contain at least one special characters"
      ),
  });

  const response = payloadSchema.safeParse(payload);
  if (response.success) {
    next();
  } else {
    res.status(400).json({ messege: response.error.issues[0].message });
  }
};

const addToDatabaseMiddleware = (req, res, next) => {
  const payload = req.body;
  try {
    allUsers = [...allUsers, payload];
    res.status(200).json({ message: "User Registration success" });
  } catch {
    res.status(400).json({ message: "User Registration failed" });
  }
};

app.post("/register", validiationMiddleware, addToDatabaseMiddleware);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const response = userExists(allUsers, email, password);
  if (response) {
    const token = jwt.sign(req.body, jwtKey);
    res.status(200).json({ token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.listen(3000);
