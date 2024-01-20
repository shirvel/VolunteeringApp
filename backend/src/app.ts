import express, { Express } from "express";
import mongoose from 'mongoose';
import env from "dotenv";
import bodyParser from 'body-parser';
import * as socketio from "socket.io";

env.config();

import userRoute from "./routes/user_route";
import postRoute from "./routes/post_routes";
import commentRoutes from "./routes/comment_routes";
import categoryRoutes from "./routes/category_routes";
import authRoute from "./routes/auth_route";
import cors from "cors";

export const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    const db = mongoose.connection;
    db.on('error', error => {console.error(error)});
    db.once('open', () => console.log('Connected to mongo!'));
    const url = process.env.DATABASE_URL;
    mongoose.connect(url!).then(() => {
      const app = express();
      app.use(cors());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use("/user", userRoute);
      app.use("/posts", postRoute)
      app.use("/categories", categoryRoutes)
      app.use("/comments", commentRoutes)
      app.use("/auth", authRoute)
      resolve(app);
    })
  })
  return promise;
};


