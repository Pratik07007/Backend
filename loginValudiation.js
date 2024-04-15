const zod = require("zod");
const express = require("express");
const app = express();

app.use(express.json());

const loginPayloadValidiation = (payload) => {
  const loginSchema = zod.object({
    email: zod.string().email(), //this direclty validiated the email checking varipus factors to fit he email class defined in the core logic
    password: zod
      .string()
      .min(8)
      .max(32)
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).{8,32}$/, {
        message:
          'Password must contain at least one uppercase letter and one special character (!@#$%^&*()_+{}|:"<>?)',
      }),
  });
  const response = loginSchema.safeParse(payload);
  return response.error || response;
};

app.post("/login", (req, res) => {
  const loginPayload = req.body;
  const serverResposne = loginPayloadValidiation(loginPayload);
  res.json(serverResposne);
});

app.listen(3000);

