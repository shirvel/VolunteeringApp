import request from "supertest";
import { initApp } from "../app";
import Category from "../models/category_model";
import { Express } from "express";
import { ICategory } from "../controllers/category_controller";
import User, { IUser } from '../models/user_model';
import ChatRoom from '../models/chat_room_model';
import mongoose from "mongoose";

let app: Express;
let accessToken: string;

const test_chat_room = {
    category_name:"Test",
    messages: []
};
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
  // Add the category and chat room to the db
  const category = new Category(test_category);
  const chat = new ChatRoom(test_chat_room);
  await category.save();
  await chat.save();
  await User.deleteMany({ email: test_user.email});
  // Create the user to add comment
  await request(app).post("/auth/register").send(test_user);
  const response = await request(app).post("/auth/login").send(test_user);
  accessToken = response.body.accessToken;
  
});

describe("category tests", () => {
    test("Test Get All old messages - empty list", async () => {
      const response = await request(app).get("/chat/Test").set("Authorization", "JWT " + accessToken);
      expect(response.statusCode).toBe(200);
      expect(response.body).toStrictEqual({"messages": []});
    });
});

afterAll(async () => {
    await mongoose.connection.close();
  });



