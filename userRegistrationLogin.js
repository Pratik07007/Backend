// const express = require("express");
// const zod = require("zod");
// const app = express();
// const jwt = require("jsonwebtoken");
// const jwtKey = "Access Granted";

// const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://Pratik:AccessGranted@cluster01.2avpg7m.mongodb.net/projectSocial" // /Pratik is the name of database if there is not databse named pratik then mongoose auto creates one for us
// );

// const User = mongoose.model("allusers", {
//   username: String,
//   email: String,
//   password: String,
// }); //defining the schema of our model named "users" ==>model corrospondence to table in SQL this is similar to creating a table in a SQL databse

// app.use(express.json());

// const validiationMiddleware = (req, res, next) => {
//   const payload = req.body;

//   const payloadSchema = zod.object({
//     username: zod.string(),
//     email: zod.string().email(),
//     password: zod
//       .string()
//       .min(8, "Password must be atleast 8 character long")
//       .max(32, "Password must not be more than 32 characters")
//       .regex(/[0-9]/, "Password mus contain at least one number")
//       .regex(/[A-Z]/, "Password must contain one uppercase alphabet")
//       .regex(
//         /[~!@#$%^&*()_+}{|":?><}]/,
//         "Password must contain at least one special characters"
//       ),
//   });

//   const response = payloadSchema.safeParse(payload);
//   if (response.success) {
//     next();
//   } else {
//     res.status(400).json({ messege: response.error.issues[0].message });
//   }
// };

// const addToDatabaseMiddleware = (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;
//     const user = new User({
//       username: username,
//       email: email,
//       password: password,
//     }); //this just creates an instance of class User
//     user.save(); //this adds the created instance jpt to the databse
//     // res.status(200).json({ success: "User Registration completed" });
//     let allUsers = User.find();
//     res.status(200).json();
//   } catch {
//     res.status(400).json({
//       error:
//         "Something went wrong, out team is working to solve this please try again later",
//     });
//   }
// };
// app.post("/register", validiationMiddleware, addToDatabaseMiddleware);

// app.listen(3000);
