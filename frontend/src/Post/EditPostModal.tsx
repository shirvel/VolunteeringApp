import {
	Dialog,
	DialogTitle,
	TextField,
	Button,
	Grid,
	InputLabel,
	NativeSelect,
	FormControl,
} from "@mui/material";

import { useState } from "react";
import { CreatePostDetails } from "./Posts-deprecated";
import React from "react";
import { editPost } from "./PostService";

export interface DialogProps {
	open: boolean;
	onClose: () => void;
	postDetails: CreatePostDetails;
	postId: string;
}

const sendPostEditToServer = (content: string, postId: string) => {
	console.log(content);
	editPost(content, postId);
};

export const EditPostModal = (props: DialogProps) => {
	const { onClose, open, postDetails, postId } = props;

	const handleClose = () => {
		onClose();
	};

	const handleUpdate = () => {
		// Check for empty field
		if (!content) {
			setContentError("Content is required");
			return;
		}

		// Clear any previous error messages
		setContentError(null);

		sendPostEditToServer(content, postId);
		onClose();
	};

	const [content, setContent] = useState(postDetails.content);

	const [contentError, setContentError] = useState<string | null>(null);

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle className="flex items-center justify-center">
				Update Post
			</DialogTitle>
			<Grid container spacing={3} className="p-4">
				<Grid item xs={12}>
					<TextField
						disabled
						label="Title"
						variant="outlined"
						className="w-full"
						value={postDetails.title}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ width: "100%" }}>
						<InputLabel variant="standard" htmlFor="uncontrolled-native">
							Category
						</InputLabel>
						<NativeSelect
							disabled
							defaultValue={"Community"}
							inputProps={{
								name: "category",
								id: "uncontrolled-native",
							}}>
							<option value={"Community"}>Community</option>
							<option value={"Animals"}>Animals</option>
							<option value={"Elderly"}>Elderly</option>
							<option value={"Cooking"}>Cooking</option>
							<option value={"Transportation"}>Transportation</option>
							<option value={"Other"}>Other</option>
						</NativeSelect>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<TextField
						required
						multiline
						rows={8}
						label="Content"
						variant="outlined"
						className="w-full"
						value={content}
						error={!!contentError}
						helperText={contentError}
						onChange={(event) => {
							setContent(event.target.value);
							setContentError(null); // Clear error on input change
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						disabled
						label="Phone Number"
						variant="outlined"
						className="w-full"
						value={postDetails.phoneNumber}
					/>
				</Grid>

				<Grid item xs={12}>
					<TextField
						disabled
						label="Image"
						variant="outlined"
						className="w-full"
						value={postDetails.image}
					/>
				</Grid>
			</Grid>
			<Button onClick={handleUpdate}>Update Post</Button>
		</Dialog>
	);
};
