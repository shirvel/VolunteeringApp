/* The events:
    "message" - the client sends to server with the new message and the username.
    "new_message" - from server to client - says to add the new message to their chat so the can see it.
*/

import { Server } from "socket.io";
import { ChatMessage } from "../models/chat_room_model";

const handleNewMessage = (message: ChatMessage, io: Server) => {
    // Add to DB
    

    // Send new event for all the other clients
    console.log("a user send message");
    io.emit("new_message", message);
    console.log(message);
};


export const chatHandler = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("message", (message) => {
            handleNewMessage(message, io);
        });
        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
          });
    })
};