const express = require("express");
const zod = require("zod");
const app = express();

app.use(express.json());

const payloadValidiationMiddle = (paylaod) => {
  const payloadSchema = zod.object({
    emial: zod.string().email(),
    password: zod.string().min(8).max(32),
  });

  const response = payloadSchema.safeParse(paylaod);
  return response;
};

app.post("/login", (req, res) => {
  const payload = req.body;
  const response = payloadValidiationMiddle(payload);

  res.json(response);
});

app.listen(3001);
