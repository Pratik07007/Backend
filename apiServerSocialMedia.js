// Great Question to Test Your Knowledge of Express Middlewares and  Email/Password Validation:

// Scenario:

// You're building an API for a social media platform. Users can register by providing an email address and password.
//you may use postman to post the request or you may also make a simple ui to send request from the client side
// Challenge:

// Express Middleware: Design a middleware stack that performs the following validations before allowing user registration to proceed:

// Checks if the request body contains an email and password property.
// Validates the email address using Zod to ensure it's in a valid format (e.g., contains "@" and a top-level domain).
// Validates the password using Zod to enforce minimum length (e.g., 8 characters) and at least one uppercase letter, lowercase letter, number, and symbol.
// If any validation fails, the middleware should send an appropriate error response with a clear message to the client.
// Error Handling:  Incorporate error handling in your middleware to catch potential issues like missing data or unexpected data types. How would you structure your error handling to provide informative messages for both the client and server logs?

// Scalability: Briefly discuss how you would approach handling potential scalability challenges as the user base of the social media platform grows. Consider aspects like middleware performance and error handling under high load.

// This question tests your understanding of:

// Express Middleware: Ability to chain multiple middlewares for sequential request processing and validation.
// Zod Validation: Using Zod schemas to define and enforce validation rules for email format and password complexity.
// Error Handling: Implementing proper error handling to catch validation errors and provide informative responses.
// Scalability: Considering potential challenges and approaches for handling increased user traffic on the API.
// By answering this question, you can demonstrate your knowledge of these topics and showcase your ability to apply them in a practical API development scenario.

const express = require("express");
const app = express();
const zod = require("zod");

app.use(express.json());

const payloadValidiation = (req, res, next) => {
  const bodySchema = zod.object({
    email: zod.string().email(),
    password: zod
      .string()
      .min(8)
      .max(32)
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(
        /[!@#$%^&*()_+{=}[\]{};':",./<>?~`]/,
        "Password must contain at least one symbol"
      ),
  });
  const payload = req.body;
  const response = bodySchema.safeParse(payload);
  if (response.success) {
    next(); //passes the command to the function which adds the user credential to the the database
  } else {
    res
      .status(403)
      .json({ status: false, message: response.error.issues[0].message });
  }
};

app.post("/login", payloadValidiation, (req, res) => {
  const { email, password } = req.body;
  //now we can add this email and password to our database
  res.json({
    status: true,
    msg: `data added to database: user register succesfully verification email sent to ${req.body.email}`,
  });
});

app.use((err, req, res, next) => {
  //handels global error
  res.json({ msg: "Something went wrong please try again later" });
});

app.listen(3000);
