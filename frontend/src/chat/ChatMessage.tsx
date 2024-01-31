import { Avatar, Box, Chip } from "@mui/material";
import React from "react";

export type Message = {
	content: string;
	userName: string;
	userId: string;
};

const isMessageFromCurrentUser = (message: Message) => {
	console.log();
	return message.userId === localStorage.getItem("userId");
};

export const ChatMessage = ({ message }: { message: Message }) => {
	if (!message.userName) return null;
	return (
		<div>
			{isMessageFromCurrentUser(message) ? (
				<Box sx={{ justifyContent: "flex-end", display: "flex" }}>
					<Chip
						sx={{ backgroundColor: "#ccffcc", height: "10vh" }}
						label={message.content}
					/>
				</Box>
			) : (
				<Chip
					sx={{ backgroundColor: "#e6ffff", height: "10vh" }}
					avatar={
						<Avatar sx={{ backgroundColor: "#00cccc" }}>
							{message.userName[0]}
						</Avatar>
					}
					label={message.content}
				/>
			)}
		</div>
	);
};
