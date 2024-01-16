import { Avatar, Chip } from "@mui/material";

export type Message = {
    content: string;
    userName: string;
};

export const ChatMessage = ({message} : {message: Message}) => {
    return (
        <div className="">
            <Chip avatar={<Avatar>{message.userName[0]}</Avatar>} label={message.content}/>
        </div>);
};