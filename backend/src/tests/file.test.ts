import request from "supertest";
import { initApp } from "../app";
import { Express } from "express";
import mongoose from "mongoose";

let app: Express;

beforeAll(async () => {
    app = await initApp();
})

afterAll(async () => {
    mongoose.connection.close();
 });

describe("File Tests" , () => {
    test("upload file" , async () => {
     const filePath = `${__dirname }/avatar.jpeg` ;
     try {
     const response = await request(app)
     .post("/file?file=123.jpeg" ).attach('file', filePath)
     expect(response.statusCode ).toEqual(200);
     let url = response.body.url;
     url = url.replace(/^.*\/\/[^/]+/, '')
     console.log(url)
     const res = await request(app).get(url)
     expect(res.statusCode ).toEqual(200);
     } catch (err) {
     console.log(err);
     expect(1).toEqual(2);
     }
     })
    })