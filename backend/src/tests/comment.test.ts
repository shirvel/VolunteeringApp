import request from "supertest";
import {initApp} from "../app";
import mongoose from "mongoose";
import Comment from "../models/comment_model";
import { Express } from "express";
import { IComment } from "../controllers/comment_controller";
import User, { IUser } from '../models/user_model';
import { IPost } from "../controllers/post_controller";

let app: Express;
let accessToken: string;

const test_post: IPost = {
  title: "Test Post",
  content: "This is a test post.",
  phoneNumber: "1234567890",
  image: "test.jpg",
  category: "test",
  likes: 0,
  likedBy: [],
  dislikes: 0,
  dislikedBy: [],
  user_id: "1234",
};

const test_comment: IComment = {
  user_name: "comment_test",
  post_id: "",
  content: "hello"
};

const test_user: IUser = {
  email: "testUserEmail@gmail.com",
  password: "a123456!G",
  name: "Shaked"
}

beforeAll(async () => {
  app = await initApp();
  await Comment.deleteMany({});
  await User.deleteMany({ email: test_user.email});
  
  // Create the user to add comment
  await request(app).post("/auth/register").send(test_user);
  const response = await request(app).post("/auth/login").send(test_user);
  accessToken = response.body.accessToken;

  // Create post to add comment to
  const post_response = await request(app).post("/posts").set("Authorization", "JWT " + accessToken).send(test_post);
  test_post._id = post_response.body._id;
  test_comment.post_id = post_response.body._id;
});

afterAll(async () => {
  await Comment.deleteMany({});
  await User.deleteMany({ email: test_user.email});
  await mongoose.connection.close();
});

describe("Comment tests", () => {
  const addComment = async (comment: IComment) => {
    const response = await request(app).post("/comments").set("Authorization", "JWT " + accessToken)
      .send(comment);
    expect(response.statusCode).toBe(201);
    return response.body._id;
  };

  test("Test Get All Comments - empty response", async () => {
    const response = await request(app).get("/comments").set("Authorization", "JWT " + accessToken);
    console.log("ALL THE COMMENTS " + JSON.stringify(response));
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Get All Comments", async () => {
    test_comment._id = await addComment(test_comment);
    const response = await request(app).get("/comments").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const comment = response.body[0];
    expect(comment.user_name).toBe("comment_test");
  });

  test("Test edit comment", async () => {
    const response = await request(app).patch(`/comments/${test_comment._id}`).set("Authorization", "JWT " + accessToken).send({content: "hello2"});
    expect(response.statusCode).toBe(204);
    const getResponse = await request(app).get("/comments").set("Authorization", "JWT " + accessToken);
    expect(getResponse.body.length).toBe(1);
    const comment = getResponse.body[0];
    expect(comment.content).toBe("hello2");
  });

  test("Delete the command", async() => {
    console.log(test_comment._id);
    const delResponse = await request(app).delete(`/comments/${test_comment._id}`).set("Authorization", "JWT " + accessToken);
    expect(delResponse.statusCode).toBe(204);
    const getResponse = await request(app).get("/comments").set("Authorization", "JWT " + accessToken);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.length).toBe(0);

  });
});