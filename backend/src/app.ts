import express from "express";
import env from "dotenv";
env.config();

import userRoute from "./routes/user_route";

const app = express();

app.use(userRoute);


const port = process.env.PORT

app.get('/', (req, res) => {
  res.send("First api");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})