import { initApp } from "./app";



initApp().then((app) => {
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


