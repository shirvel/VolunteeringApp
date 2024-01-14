import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import Category from "../models/category_model";
import { Express } from "express";

let app: Express;
let accessToken: string;

const test_category = {
  name: "TestCategory",
};

beforeAll(async () => {
  app = await initApp();
  await Category.deleteMany({});
  const response = await request(app)
    .post("/categories")
    .set("Authorization", "JWT " + accessToken)
    .send(test_category);
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Category tests", () => {
  test("Test Get All Categories - empty response", async () => {
    const response = await request(app)
      .get("/categories")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual([]);
  });

  test("Test Get All Categories", async () => {
    const response = await request(app)
      .get("/categories")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    const category = response.body[0];
    expect(category.name).toBe("TestCategory");
  });

  test("Test Get Category by Name", async () => {
    const response = await request(app)
      .get(`/categories/${test_category.name}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe("TestCategory");
  });
});
