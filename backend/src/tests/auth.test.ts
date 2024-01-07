import request from "supertest";
import User from '../models/user_model';
import mongoose from 'mongoose';
import initApp from '../app';
import { Express } from "express";


let app: Express;

const user = {
  email: "testUser@test.com",
  password: "1234567890"
}

beforeAll(async () => {
    app = await initApp();
    console.log("BeforeAll");
    await User.deleteMany();
    //TODO: Add it when we will have post implemented
 //   await Post.deleteMany();
})

afterAll(async () => {
    // await User.deleteMany();
     //TODO: Add it when we will have post implemented
  //   await Post.deleteMany();
  mongoose.connection.close();
 });

 describe("Auth Tests", ()=> {
     test("Register test", async ()=> {
         const response = await request(app).post('/auth/register').send(user)
         expect(response.statusCode).toEqual(201);
     });

     test("Register test - Email is existing", async ()=> {
        const response = await request(app).post('/auth/register').send(user)
        expect(response.statusCode).toEqual(406);
    });

    test("Register test - Missing email", async ()=> {
        const response = await request(app).post('/auth/register').send({
            password: user.password
          })
        expect(response.statusCode).toEqual(400);
    });

    test("Register test - Missing password", async ()=> {
        const response = await request(app).post('/auth/register').send({
            email: user.email
          })
        expect(response.statusCode).toEqual(400);
    });

     test.skip("Login test", async ()=> {
        const response = await request(app).post('/auth/login').send({
            "email": user.email,
            "password": user.password
        })
        expect(response.statusCode).toEqual(200);
    })
 })

