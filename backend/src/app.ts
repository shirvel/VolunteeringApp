import express, { Express } from "express";
import mongoose from 'mongoose';
import env from "dotenv";
import bodyParser from 'body-parser';

env.config();

import userRoute from "./routes/user_route";
import postRoute from "./routes/post_routes";
import commentRoutes from "./routes/comment_routes";
import categoryRoutes from "./routes/category_routes";
import authRoute from "./routes/auth_route";
import chatRoute from "./routes/chat_routes";
import fileRoute from "./routes/file_routes";
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
      app.use((req, res, next) => {
        res.header("Acces-Control-Allow-Origin", "*");
        res.header("Acces-Control-Allow-Methods", "*");
        res.header("Acces-Control-Allow-Headers", "*");
        next();
      })
      app.use("/user", userRoute);
      app.use("/posts", postRoute)
      app.use("/categories", categoryRoutes)
      app.use("/comments", commentRoutes)
      app.use("/auth", authRoute)
      app.use("/chat", chatRoute)
      app.use("/file", fileRoute)
      app.use("/public", express.static("public"))
      resolve(app);
    })
  })
  return promise;
};


