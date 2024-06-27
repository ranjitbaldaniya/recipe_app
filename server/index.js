import express from "express";

const app = express();

app.use("/", (req, res) => {
  res.send("server is running");
});

app.listen(3001, () => {
  console.log("server is running on port 3001");
});
