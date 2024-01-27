import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import { ChatMessage, Message } from "./ChatMessage";
import Button from "@mui/material/Button";
import { io } from "socket.io-client";
import { Grid, TextField } from "@mui/material";
import React from "react";
import { socketUrl } from "../api/endpoints";
import { useSearchParams } from "react-router-dom";
import { loadFormerMessages } from "./chatService";

const socket = io(socketUrl);
export const GroupChat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [messageToSend, setMessageToSend] = useState<string>("");
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const category = searchParams.get("category");
		socket.on(`new_message_${category}`, (message: Message) => {
			console.log("message arrived");
			setMessages((messages) => [...messages, message]);
		});

		const loadAllMessages = async () => {
			if (category) {
				const response = await loadFormerMessages(category);
				setMessages(response);
			}
		};
		loadAllMessages();

		return () => {
			socket.off(`new_message_${searchParams.get("category")}`);
		};
	}, [searchParams]);

	return (
		<div className="h-full">
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
							console.log(messageToSend);
							socket.emit("message", {
								message: {
									content: messageToSend,
									userName: localStorage.getItem("userName"),
									userId: localStorage.getItem("userId"),
								},
								category: searchParams.get("category"),
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
