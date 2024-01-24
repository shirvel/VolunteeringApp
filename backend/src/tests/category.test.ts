import request from "supertest";
import { initApp } from "../app";
import mongoose from "mongoose";
import Category from "../models/category_model";
import { Express } from "express";
import { ICategory } from "../controllers/category_controller";
import User, { IUser } from '../models/user_model';

let app: Express;
let accessToken: string;

const test_category: ICategory = {
  name: "Test"
};

const test_user: IUser = {
  email: "testUserEmail@gmail.com",
  password: "a123456!G",
  name: "Sharon"
}

beforeAll(async () => {
  app = await initApp();
  await Category.deleteMany({});
  await User.deleteMany({ email: test_user.email});
  // Create the user to add comment
  await request(app).post("/auth/register").send(test_user);
  const response = await request(app).post("/auth/login").send(test_user);
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("category tests", () => {
  const addCategory = async (category: ICategory) => {
    const response = await request(app).post("/categories").set("Authorization", "JWT " + accessToken)
      .send(category);
    expect(response.statusCode).toBe(201);
    console.log(response.body._id);
    return response.body._id;
  };

  test("Test Get All Categories - empty response", async () => {
    const response = await request(app).get("/categories").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Get All Categories", async () => {
    test_category._id = await addCategory(test_category);
    console.log(test_category._id);
    const response = await request(app).get("/categories").set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const category = response.body[0];
    expect(category.name).toBe("Test");
  });

  test("Delete the Category", async() => {
    console.log(test_category._id);
    const delResponse = await request(app).delete(`/categories/${test_category._id}`).set("Authorization", "JWT " + accessToken);
    expect(delResponse.statusCode).toBe(204);
    const getResponse = await request(app).get("/categories").set("Authorization", "JWT " + accessToken);
    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.body.length).toBe(0);

  });
});