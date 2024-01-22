import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { ChatMessage, Message } from "./ChatMessage";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import { Grid, TextField } from "@mui/material";

const socket = io("http://localhost:3000");
export const GroupChat = () => {
	const [messages, setMessages] = useState<Message[]>([
		{ content: "hello its me", userName: "name" },
	]);
	const [messageToSend, setMessageToSend] = useState<string>("");

	useEffect(() => {
		socket.on("new_message", (message: Message) => {
			setMessages((messages) => [...messages, message]);
		});

		return () => {
			socket.off("new_message");
		};
	}, []);

	return (
		<div>
			<Grid container>
				<Grid item xs={11} className="p-4">
					<TextField
						className="flex-grow w-full"
						label="Type your message"
						variant="outlined"
						value={messageToSend}
						onChange={(event) => setMessageToSend(event.target.value)}
					/>
				</Grid>
				<Grid item xs={1}>
					<Button
						className="p-4 h-full"
						onClick={() => {
							socket.emit("message", {
								message: { content: messageToSend, userName: "shir" },
								category: "cooking",
							});
							setMessageToSend("");
						}}>
						<SendIcon />
					</Button>
				</Grid>
			</Grid>
			{messages?.map((message, index) => (
				<div key={index}>
					<ChatMessage message={message} />
				</div>
			))}
		</div>
	);
};
