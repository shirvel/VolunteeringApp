export type Message = {
    content: string;
    userName: string;
};

export const ChatMessage = ({message} : {message: Message}) => {
    return (<div >{message.content}</div>);
};