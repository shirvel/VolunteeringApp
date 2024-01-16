import request from "supertest";
import User, { IUser } from '../models/user_model';
import mongoose from 'mongoose';
import initApp from '../app';
import { Express } from "express";
import { IComment } from "../controllers/comment_controller";


let app: Express;
let accessToken: string;
let refreshToken: string;
let newRefreshToken: string

const user: IUser = {
  email: "testUser@test.com",
  password: "1234567890"
}

const comment: IComment = {
    user_name: "comment_test2",
    post_id: "1111",
    content: "Hey"
  };

beforeAll(async () => {
    app = await initApp();
    console.log("BeforeAll");
    await User.deleteMany();
    //TODO: Add it when we will have post implemented
 //   await Post.deleteMany();
})

afterAll(async () => {
     await User.deleteMany();
     //TODO: Add it when we will have post implemented
  //   await Post.deleteMany();
  mongoose.connection.close();
 });

 describe("Auth: Register Tests", ()=> {
     test("Register basic test", async ()=> {
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
 })

 describe("Auth: Login Tests", ()=> {
    test("Login basic test", async ()=> {
        const response = await request(app).post('/auth/login').send(user)
        expect(response.statusCode).toEqual(200);
        accessToken = response.body.accessToken;
        refreshToken = response.body.refreshToken;
        expect(accessToken).toBeDefined();
    });

    test("Test forbidden access without token - Comments", async ()=> {
        const response = await request(app).post('/comments').send(comment);
        expect(response.statusCode).toEqual(401);
    });

    test("Test forbidden access without token - User", async ()=> {
        const response = await request(app).get('/user').send(user);
        expect(response.statusCode).toEqual(401);
    });

    test("Test access with valid token - Commetns", async ()=> {
        const response = await request(app).get('/comments').set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toEqual(200);
    });

    test("Test access with valid token - User", async ()=> {
        const response = await request(app).get('/user').set("Authorization", "JWT " + accessToken);
        expect(response.statusCode).toEqual(200);
    });

    test("Test access with invalid token - User", async ()=> {
        const response = await request(app).get('/user').set("Authorization", "JWT 333" + accessToken);
        expect(response.statusCode).toEqual(401);
    });

    describe("Auth: refresh token + logout Tests", ()=> {
  
      jest.setTimeout(10000);
      test("Test access after timeout of token", async () => {
          await new Promise(resolve => setTimeout(() => resolve("done"), 5000));
          const response = await request(app)
            .get("/comments")
            .set("Authorization", "JWT " + accessToken).send();;
          expect(response.statusCode).not.toBe(200);
        });

        test("Test Refresh token", async () => {
          const response = await request(app).get("/auth/refresh").set("Authorization", "JWT " + refreshToken).send();
          expect(response.statusCode).toBe(200);
          expect(response.body.accessToken).toBeDefined();
          expect(response.body.refreshToken).toBeDefined();
      
          const newAccessToken = response.body.accessToken;
          newRefreshToken = response.body.refreshToken;
      
          const response2 = await request(app)
            .get("/comments")
            .set("Authorization", "JWT " + newAccessToken);
          expect(response2.statusCode).toBe(200);
        });

        test("Test double use of refresh token", async () => {
          const response = await request(app)
            .get('/auth/refresh')
            .set("Authorization", "JWT " + refreshToken)
            .send();
          expect(response.statusCode).not.toBe(200);
      
          // Verify that the new token is not valid as well
          const response1 = await request(app)
            .get("/auth/refresh")
            .set("Authorization", "JWT " + newRefreshToken)
            .send();
          expect(response1.statusCode).not.toBe(200);
        });

        // TODO: How to check the logout?!!!!!!
        test("Test logout", async () => {
          const response = await request(app).post('/auth/logout').send(user);
          expect(response.statusCode).toEqual(200);
          const response2 = await request(app).get('/user').set("Authorization", "JWT " + accessToken);
          expect(response2.statusCode).not.toEqual(200);
          const response3 = await request(app).get('/comments').set("Authorization", "JWT " + accessToken);
          expect(response2.statusCode).not.toEqual(200);
        });
     }
)});