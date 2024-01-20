import { Avatar, Box, Chip } from "@mui/material";

export type Message = {
    content: string;
    userName: string;
};

export const ChatMessage = ({message} : {message: Message}) => {
    return (
        <div>
        <Box sx={{justifyContent: "flex-end", display: "flex"}}>
            <Chip sx={{backgroundColor:"#ccffcc", height:"10vh"}} label={message.content}/>
        </Box>
        <Chip sx={{backgroundColor:"#e6ffff", height:"10vh"}} avatar={<Avatar sx={{backgroundColor:"#00cccc"}}>{message.userName[0]}</Avatar>} label={"adsfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf"}/>
    </div>);
};