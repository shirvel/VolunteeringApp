import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Post from "../models/post_model";
import { IPost } from "../controllers/post_controller"
import User, { IUser } from "../models/user_model";
import { Express } from "express";

let app: Express;
let accessToken: string;

const test_post: IPost = {
  title: "Test Post",
  content: "This is a test post.",
  phoneNumber: "1234567890",
  image: "test.jpg",
  category: "TestCategory",
  likes: 0,
  dislikes: 0,
};

const test_user: IUser = {
  email: "testUserEmail@gmail.com",
  password: "a123456!G",
};

beforeAll(async () => {
  app = await initApp();
  await Post.deleteMany({});
  await User.deleteMany({ email: test_user.email });
  // Create the user to add a post
  await request(app).post("/auth/register").send(test_user);
  const response = await request(app).post("/auth/login").send(test_user);
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Post tests", () => {
  const addPost = async (post: IPost) => {
    const response = await request(app)
      .post("/posts")
      .set("Authorization", "JWT " + accessToken)
      .send(post);
    expect(response.statusCode).toBe(201);
    return response.body._id;
  };

  test("Test Get All Posts - empty response", async () => {
    const response = await request(app)
      .get("/posts")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Get All Posts", async () => {
    test_post._id = await addPost(test_post);
    const response = await request(app)
      .get("/posts")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const post = response.body[0];
    expect(post.title).toBe("Test Post");
  });

  test("Test add like to post", async () => {
    const response = await request(app)
      .post(`/posts/like/${test_post._id}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.likes).toBe(1);
  });

  test("Test add dislike to post", async () => {
    const response = await request(app)
      .post(`/posts/dislike/${test_post._id}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.dislikes).toBe(1);
  });

  test("Test update post", async () => {
    const response = await request(app)
      .patch(`/posts/${test_post._id}`)
      .set("Authorization", "JWT " + accessToken)
      .send({ content: "Updated content" });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Updated content");
  });

  test("Test delete post", async () => {
    const delResponse = await request(app)
      .delete(`/posts/${test_post._id}`)
      .set("Authorization", "JWT " + accessToken);
    expect(delResponse.statusCode).toBe(204);
    const getResponse = await request(app)
      .get("/posts")
      .set("Authorization", "JWT " + accessToken);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.length).toBe(0);
  });
});
