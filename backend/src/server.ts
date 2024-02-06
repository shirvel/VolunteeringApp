import { initApp } from "./app";
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import { chatHandler } from "./common/chat_handler";
import { Server } from "socket.io";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

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

  
    if (process.env.NODE_ENV !== 'production') {
      console.log('development');
      const server = http.createServer(app);
       /* For the chat - socket */
      const io = new Server(server, {cors: {
        origin: '*',
      }});
      chatHandler(io);
      /* Start listening for both app requests and docket requests */
      const port = process.env.PORT
      server.listen(port, () => {
      console.log(`Listening on port ${port}`);
      })
    }else{
      console.log('PRODUCTION');
      const options2 = {
      key: fs.readFileSync(path.resolve('/home/st111/VolunteeringApp/backend/client-key.pem')),
      cert: fs.readFileSync(path.resolve('/home/st111/VolunteeringApp/backend/client-cert.pem'))
      };
      const server = https.createServer(options2, app);
      const io = new Server(server, {cors: {
        origin: '*',
      }});
      chatHandler(io);
      server.listen(process.env.HTTPS_PORT);
    }

 

    
});


