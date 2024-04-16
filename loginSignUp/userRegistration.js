const express = require("express");
const zod = require("zod");
const app = express();

app.use(express.json());
let users = [
  {
    username: "pratik",
    email: "pratikdhimal6@gmail.com",
    password: "Admin@12345",
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
      .regex(/[A-Z]/, "Password must contain one uppercase alphabet"),
  });

  const response = payloadSchema.safeParse(payload);
  if (response.success) {
    next();
  } else {
    res.status(400).json({ messege: response.error.issues[0].message });
  }
};

app.post("/register", validiationMiddleware, (req, res) => {
  const payload = req.body;
  users = [...users, payload];
  res.json(users);
});

app.listen(3000);
