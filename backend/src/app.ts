import express from "express";
import mongoose from 'mongoose';
import env from "dotenv";
import bodyParser from 'body-parser';

env.config();

import userRoute from "./routes/user_route";
import commentRoutes from "./routes/comment_routes";


const initApp = async() => {
  await mongoose.connect(process.env.DATABASE_URL);
  const db = mongoose.connection;
  db.on('error', error => {console.error(error)});
  db.once('open', () => console.log('Connected to mongo!'));
  
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  
  app.use(userRoute);
  app.use("/comments", commentRoutes)

  return app;
};


export default initApp;