import { Dialog, DialogTitle, TextField, Button, Grid } from "@mui/material";

import { useState } from "react";
import { UserDetails } from "./EditUserDetails";
import React from "react";
import { updateUser } from "./userService";

export interface DialogProps {
	open: boolean;
	onClose: () => void;
}

const sendUserUpdateToServer = (userDetails: UserDetails) => {
	console.log(userDetails);
	updateUser(userDetails);
};

export const EditUserDetailsModal = (props: DialogProps) => {
	const { onClose, open } = props;

	const handleClose = () => {
		onClose();
	};

	const handleUpdate = () => {
		sendUserUpdateToServer({ name: username, email });
		onClose();
	};

	// TODO: Remove Mock
	const details = { name: "shir", email: "Shir@gmail.com" };

	const [username, setUsername] = useState(details.name);
	const [email, setEmail] = useState(details.email);

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle className="flex items-center justify-center">
				Edit User
			</DialogTitle>
			<Grid container spacing={3} className="p-4">
				<Grid item xs={12}>
					<TextField
						label="Name"
						variant="outlined"
						className="w-full"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						label="Email"
						variant="outlined"
						className="w-full"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
				</Grid>
			</Grid>
			<Button onClick={handleUpdate}>Update</Button>
		</Dialog>
	);
};
