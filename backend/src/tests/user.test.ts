import request from "supertest";
import { initApp } from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import User, { IUser } from "../models/user_model";

// TODO: check the covarage by writing '--coverage' on package.json

let app: Express;
let accessToken: string;
let userId: string;

const user: IUser = {
  email: "myUserEmail@gmail.com",
  password: "myPassword123456",
};

const newEmail = "myNewUserEmail@gmail.com"

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany();
  let userResponse = await request(app).post("/auth/register").send(user);
  userId = await extractUserId(userResponse);
  const response = await request(app).post("/auth/login").send(user);
  accessToken = response.body.accessToken;
});

afterAll(async () => {
  console.log("afterAll");
  await User.deleteMany();
  await mongoose.connection.close();
});

describe("User tests", () => {
  test("Test Get All Users", async () => {
    const response = await request(app)
      .get("/user")
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    const userResponse = response.body[0];
    expect(userResponse.email).toBe(user.email);
  });

  test("Test get User by email", async () => {
    const response = await request(app)
      .get(`/user?email=${user.email}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body[0].email).toBe(user.email);
  });

  test("Test get User by Id", async () => {
    const response = await request(app)
      .get(`/user/${userId}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(user.email);
  });


  test("Test update User by Id", async () => {
    let response = await request(app)
      .patch(`/user/${userId}`)
      .set("Authorization", "JWT " + accessToken).send({ email: newEmail});
    expect(response.statusCode).toBe(204);
    let response2 = await request(app).get("/user").set("Authorization", "JWT " + accessToken);
    expect(response2.body.length).toBe(1);
    expect(response2.body[0].email).toBe(newEmail);
  });

  test("Test delete User by Id", async () => {
    let response = await request(app)
      .delete(`/user/${userId}`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(newEmail);
    response = await request(app)
      .get(`/user`)
      .set("Authorization", "JWT " + accessToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
});

export async function extractUserId(text: { text: any }): Promise<string> {
  let text1 = JSON.stringify(text.text);
  let text2 = text1.split("_id");
  let text3 = text2[1].slice(3);
  let text4 = text3.split(",");
  let userId = text4[0].slice(2, -2);
  console.log(`The user Id is ${userId}`);
  return userId;
}
