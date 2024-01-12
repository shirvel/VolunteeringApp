import { useState } from "react";
import { ChatMessage, Message } from "./ChatMessage";

export const GroupChat = () => {
    const [messages, setMessages] = useState<Message[]>([{content: "text", userName: "name"}]);
    return (<div className="w-full h-full"> 
    dddd {messages?.map((message, index) => 
    (<div key={index}>
        <ChatMessage message={message}/>
        </div>))}</div>);
};