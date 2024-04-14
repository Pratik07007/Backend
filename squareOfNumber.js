const express = require("express");
const app = express();

//using params

const square = (num) => {
  return num * num;
};

app.get("/:num", (req, res) => {
  const num = req.params.num;
  console.log(req.headers);
  const result = square(num);
  res.json({
    result,
  });
});

app.listen(3000, () => {});
