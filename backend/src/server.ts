import { Express } from "express";
import { initApp } from "./app";
import http from 'http';
import cors from "cors";


initApp().then((app) => {
    let http = require("http").Server(app);
    let io = require("socket.io")(http, {
        cors: {
          origin: '*',
        }
      });
    io.on("connection", (socket) => {
        console.log("a user connected");
        // console.log(socket);
        socket.on("message", (message) => {
            console.log("a user send message");
            socket.broadcast.emit("new_message", message);
            socket.emit("new_message", message);
            console.log(message);
        })
    })
    const port = process.env.PORT
    http.listen(port, () => {
    console.log(`Listening on port ${port}`);
    })
});


