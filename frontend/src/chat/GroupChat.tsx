import { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { ChatMessage, Message } from "./ChatMessage";
import Button from "@mui/material/Button";
import { io } from 'socket.io-client';
import { Grid, TextField } from "@mui/material";

const socket = io("http://localhost:3000");
export const GroupChat = () => {
    const [messages, setMessages] = useState<Message[]>([{content: "text", userName: "name"}]);
    const [messageToSend, setMessageToSend] = useState<string>("");
    
    useEffect(() => {
        socket.on("new_message", (message: Message) => {setMessages(messages => [...messages, message]);});
        
        return () => {
            socket.off("new_message");
          };
      }, []);
      
    
    return (
    <div> 
    <Grid container>
        <Grid item xs={10}>
        <TextField 
        className="flex-grow w-full"
        label="Outlined" variant="outlined" value={messageToSend} 
        onChange={(event) => setMessageToSend(event.target.value)}/>
        </Grid>
      <Grid item xs={2}><Button className="p-4 h-full" onClick={() => {
            socket.emit("message", {content: messageToSend, userName: "shir"});
            setMessageToSend("");
            }}><SendIcon/></Button></Grid>
        
        </Grid>
        {messages?.map((message, index) => 
        (<div key={index}>
            <ChatMessage message={message}/>
        </div>))}
    </div>);
};