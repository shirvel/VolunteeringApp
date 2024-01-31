import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { EditUserDetailsModal } from "./EditUserDetailsModal";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { getConnectedUser, updateUser } from "./userService";

export type UserDetails = { name: string; email: string; imageUrl?: string };

const sendUserUpdateToServer = (userDetails: UserDetails) => {
	console.log(userDetails);
	updateUser(userDetails);
};

export const UserDetailsComp = () => {
	const [open, setOpen] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>();

	useEffect(() => {
		const loadUserDetails = async () => {
			const details = await getConnectedUser();
			setUserDetails(details);
		};
		loadUserDetails();
	}, []);

	const handleUpdate = (details: UserDetails) => {
		sendUserUpdateToServer({ name: details.name, email: details.email });
		setUserDetails((oldDetails) => ({
			...oldDetails,
			name: details.name,
			email: details.email,
		}));
		setOpen(false);
	};

	return (
		<div className="p-4">
			<Card
				className="p-4"
				style={{
					width: "300px",
					height: "350px",
				}}>
				<Typography className="flex justify-center" variant="h5">
					{userDetails?.name}
				</Typography>
				<Typography className="flex justify-center">
					{userDetails?.email}
				</Typography>
				{userDetails?.imageUrl && (
					<img
						src={userDetails?.imageUrl}
						alt="Avatar"
						style={{
							width: "200px",
							height: "200px",
							borderRadius: "50%",
							objectFit: "cover",
							marginLeft: "auto",
							marginRight: "auto",
							marginBottom: "20px",
						}}
					/>
				)}
				<div className="flex justify-center">
					<Button variant="contained" onClick={() => setOpen(true)}>
						<EditIcon />
						Update
					</Button>
				</div>
			</Card>
			{userDetails && (
				<EditUserDetailsModal
					open={open}
					handleUpdate={handleUpdate}
					details={userDetails}
					onClose={() => setOpen(false)}
				/>
			)}
		</div>
	);
};
