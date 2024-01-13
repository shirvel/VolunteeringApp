import { Avatar, Chip } from "@mui/material";

export type Message = {
    content: string;
    userName: string;
};

export const ChatMessage = ({message} : {message: Message}) => {
    return (
        <div className="right-0">
            <Chip avatar={<Avatar>{message.userName[0]}</Avatar>} label="Avatar" />
        </div>);
};