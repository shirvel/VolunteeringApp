import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Comment from "../models/comment_model";
import { Express } from "express";


let app: Express;

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
  await mongoose.connection.close();
});

interface IComment {
  user_id: string;
  post_id: string;
  content: string;
  _id?: string;
};

const comment: IComment = {
  user_id: "123",
  post_id: "3456",
  content: "hello"
};

describe("Comment tests", () => {
  const addComment = async (comment: IComment) => {
    const response = await request(app).post("/comments")
      .send(comment);
    expect(response.statusCode).toBe(201);
  };
  test("Test Get All Comments", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
  });
});