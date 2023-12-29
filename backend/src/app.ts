import express from "express";
import env from "dotenv";
env.config();

const app = express();

const port = process.env.PORT

app.get('/', (req, res) => {
  res.send("First api");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})