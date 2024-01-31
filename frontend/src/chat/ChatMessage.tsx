import { Avatar, Box, Chip } from "@mui/material";
import { UserDetails } from "../User/UserDetailsComp";
import { getUserById } from "../User/userService";
import React, { useEffect, useState } from "react";

export type Message = {
	content: string;
	userName: string;
	userId: string;
};

const isMessageFromCurrentUser = (message: Message) => {
	return message.userId === localStorage.getItem("userId");
};

export const ChatMessage = ({ message }: { message: Message }) => {
	const [writerDetails, setWriterDetails] = useState<UserDetails | null>();

	useEffect(() => {
		const loadUserDetails = async () => {
			const details = await getUserById(message.userId);
			setWriterDetails(details);
		};
		loadUserDetails();
	}, []);

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
						<Avatar
							sx={{ backgroundColor: "#00cccc" }}
							src={writerDetails?.imageUrl}>
							{message.userName[0]}
						</Avatar>
					}
					label={message.content}
				/>
			)}
		</div>
	);
};
