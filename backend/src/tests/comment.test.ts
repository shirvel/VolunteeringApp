import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Comment from "../models/comment_model";
import { Express } from "express";
import { IComment } from "../controllers/comment_controller";


let app: Express;

const test_comment: IComment = {
  user_name: "comment_test",
  post_id: "3456",
  content: "hello"
};

const test_user = {
  name: "comment_test",
  id: "123"
}

beforeAll(async () => {
  app = await initApp();
  await Comment.deleteMany({});
  // Create the user to add comment
  await request(app).post("/user")
      .send(test_user);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Comment tests", () => {
  const addComment = async (comment: IComment) => {
    const response = await request(app).post("/comments")
      .send(comment);
    expect(response.statusCode).toBe(201);
    return response.body._id;
  };

  test("Test Get All Comments - empty response", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Get All Comments", async () => {
    test_comment._id = await addComment(test_comment);
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const comment = response.body[0];
    expect(comment.user_name).toBe("comment_test");
  });

  test("Test edit comment", async () => {
    const response = await request(app).patch(`/comments/${test_comment._id}`).send({content: "hello2"});
    expect(response.statusCode).toBe(204);
    const getResponse = await request(app).get("/comments");
    expect(getResponse.body.length).toBe(1);
    const comment = getResponse.body[0];
    expect(comment.content).toBe("hello2");
  });

  test("Delete the command", async() => {
    console.log(test_comment._id);
    const delResponse = await request(app).delete(`/comments/${test_comment._id}`);
    expect(delResponse.statusCode).toBe(204);
    const getResponse = await request(app).get("/comments");
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.length).toBe(0);

  });
});