
import request from "supertest";
import {initApp} from "../app";
import mongoose from "mongoose";
import Post from "../models/post_model";
import Category from "../models/category_model";
import Comment from "../models/comment_model";
import { IPost } from "../controllers/post_controller"
import User, { IUser } from "../models/user_model";
import { ICategory } from "../controllers/category_controller";
import { Express } from "express";

let app: Express;
let accessToken: string;
const { ObjectId } = require('mongoose').Types;
const test_post: IPost = {
  user_id: "1234",
  title: "Test Post",
  content: "This is a test post.",
  phoneNumber: "1234567890",
  image: "test.jpg",
  category: "test",
  likes: 0,
  likedBy: [],
  dislikes: 0,
};

const test_user: IUser = {
  email: "testUserEmail@gmail.com",
  password: "a123456!G",
};
const test_category: ICategory = {
  name: "TestCategory"
};

beforeAll(async () => {
  app = await initApp();
  await Category.deleteMany({});
  await Comment.deleteMany({});
  await Post.deleteMany({});
  await User.deleteMany({ email: test_user.email });
  
  await request(app).post("/auth/register").send(test_user);
  const response = await request(app).post("/auth/login").send(test_user);
  accessToken = response.body.accessToken;

  const response_category =await request(app)
  .post("/categories")
  .set("Authorization", "JWT " + accessToken)
  .send(test_category);

});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Post tests", () => {
  const addPost = async (post: IPost) => {
    const response = await request(app).post("/posts").set("Authorization", "JWT " + accessToken).send(post);
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
    const response = await request(app).get("/posts").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const post = response.body[0];
    expect(post.title).toBe("Test Post");
  });

  test("Test add like to post", async () => {
    const response = await request(app).post(`/posts/${test_post._id}/like`).set("Authorization", "JWT " + accessToken).send({user_id: "1234"});
    expect(response.statusCode).toBe(200);
    const post = response.body;
    expect(post.likes).toBe(1);
  });

  test("Test add dislike to post", async () => {
    const response = await request(app).post(`/posts/${test_post._id}/dislike`).set("Authorization", "JWT " + accessToken).send({user_id: "1234"});
    expect(response.statusCode).toBe(200);
    const post = response.body;
    expect(post.dislikes).toBe(1);
  });

  test("Test edit post", async () => {
    const response = await request(app).patch(`/posts/${test_post._id}`).set("Authorization", "JWT " + accessToken).send({content: "updated"});
    expect(response.statusCode).toBe(204);
    const getResponse = await request(app).get("/posts").set("Authorization", "JWT " + accessToken);
    expect(getResponse.body.length).toBe(1);
    const post = getResponse.body[0];
    expect(post.content).toBe("updated");
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
/*
  test("Test add dislike to post", async () => {
    const response = await request(app)
      .post(`/posts/${test_post._id}/dislike`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.dislikes).toBe(1);
  });
/*
  test("Test update post", async () => {
    const response = await request(app)
      .patch(`/posts/${test_post._id}`)
      .set("Authorization", "JWT " + accessToken)
      .send({ content: "Updated content" });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Updated content");
  });
*/