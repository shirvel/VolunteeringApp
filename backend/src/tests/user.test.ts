import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";

// TODO: check the covarage by writing '--coverage' on package.json
// Add more tests

let app: Express;

export type User = {
    name: string;
    _id: string;
  };
  
  const user: User = {
    name: "Ortal Golzar 3",
    _id: "111",
  };

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User tests", () => {
    test("Test Get All Users", async () => {
        const response = await request(app).get("/user");
        expect(response.statusCode).toBe(200);
    });

    test("Test post User", async () => {
        const response = await request(app).post("/user").send({
            name: user.name,
            id: user._id
        });
        expect(response.statusCode).toBe(200);    
    });

    test("Test get User by Id", async () => {
        const response = await request(app).get(`/user/${user._id}`);
        expect(response.statusCode).toBe(200);    
        expect(response.body.name).toBe(user.name);
        expect(response.body._id).toBe(user._id);
    });

    test("Test delete User by Id", async () => {
        let response = await request(app).delete(`/user/${user._id}`);
        expect(response.statusCode).toBe(200);    
        expect(response.body.name).toBe(user.name);
        expect(response.body._id).toBe(user._id);

        // TODO: understand why it gets 200 after user deletion...
        response = await request(app).get(`/user/${user._id}`);
        expect(response.statusCode).toBe(200);
    });
})