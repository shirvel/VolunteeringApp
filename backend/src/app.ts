import express from "express";
import mongoose from 'mongoose';
import env from "dotenv";
import bodyParser from 'body-parser';

env.config();

import userRoute from "./routes/user_route";

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', error => {console.error(error)});
db.once('open', () => console.log('Connected to mongo!'));

const app = express();

app.use(userRoute);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT

app.get('/', (req, res) => {
  res.send("First api");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})