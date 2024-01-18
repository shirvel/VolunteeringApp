import { initApp } from "./app";
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"


initApp().then((app) => {
    const options = {
        definition: {
          openapi: "3.0.0",
          info: {
            title: "VolunteeringApp",
            version: "1.0.1",
            description: "App for connecting people who need help to people who want to help!",
          },
          servers: [{ url: "http://localhost:3000", },],
        },
        apis: ["./src/routes/*.ts"],
      };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

    let http = require("http").Server(app);
    let io = require("socket.io")(http, {
        cors: {
          origin: '*',
        }
      });
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("message", (message) => {
            console.log("a user send message");
            io.emit("new_message", message);
            console.log(message);
        });
        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
          });
    })
    const port = process.env.PORT
    http.listen(port, () => {
    console.log(`Listening on port ${port}`);
    })
});


