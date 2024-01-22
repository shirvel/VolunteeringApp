import { initApp } from "./app";
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import { chatHandler } from "./common/chat_handler";
import { Server } from "socket.io";
import http from "http";


initApp().then((app) => {
    /* For Swagger */
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

    /* For the chat - socket */
    const server = http.createServer(app);
    const io = new Server(server, {cors: {
             origin: '*',
         }});
    chatHandler(io);

    /* Start listening for both app requests and docket requests */
    const port = process.env.PORT
    server.listen(port, () => {
    console.log(`Listening on port ${port}`);
    })
});


