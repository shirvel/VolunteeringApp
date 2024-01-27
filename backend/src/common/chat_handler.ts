/* The events:
    "message" - the client sends to server with the new message and the username.
    "new_message" - from server to client - says to add the new message to their chat so the can see it.
*/

import { Server } from "socket.io";
import ChatRoom from "../models/chat_room_model";
import Category from "../models/category_model";

export type ChatMessage = {content: string, user_id: string};
export interface IChatRoom {
    category_name: string;
    messages: ChatMessage[];
    _id?: string;
  }


const handleNewMessage = async(message: ChatMessage, category: string, io: Server) => {
    // Add to DB
    const room = await ChatRoom.findOne({category_name: category});
    if (!room){
        return null;
    }
    if (room.messages){
        const old_messages = room.messages;
        room.messages = [...old_messages, message]
    } else {
        room.messages = [message];
    }
    await room.save();

    // Send new event for all the other clients
    console.log("a user send message");
    io.emit(`new_message_${category}`, message);
    console.log(message);
};


export const chatHandler = (io: Server) => {
    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("message", (user_message) => {
            handleNewMessage(user_message.message, user_message.category, io);
        });
        socket.on('disconnect', () => {
            console.log('🔥: A user disconnected');
          });
    })
};