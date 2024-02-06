import { Dialog, DialogTitle, TextField, Button, Grid } from "@mui/material";

import { useState } from "react";
import React from "react";
import { editPost } from "./PostService";
import { IPost } from "./Post";

export interface DialogProps {
	open: boolean;
	onClose: () => void;
	onEdit: (post: IPost) => void;
	post: IPost;
}

const sendPostEditToServer = (content: string, postId: string) => {
	console.log(content);
	editPost(content, postId);
};

export const EditPostModal = (props: DialogProps) => {
	const { onClose, open, post, onEdit } = props;
	const [contentError, setContentError] = useState<string | null>(null);
	const [editedContent, setEditedContent] = useState<string | null>(
		post.content
	);

	const handleClose = () => {
		onClose();
	};

	const handleUpdate = async () => {
		if (!editedContent) {
			setContentError("Content is required");
			return;
		}

		// Clear any previous error messages
		setContentError(null);
		await sendPostEditToServer(editedContent, post._id);
		onEdit({ ...post, content: editedContent });
		onClose();
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle className="flex items-center justify-center">
				Update Post
			</DialogTitle>
			<Grid container spacing={3} className="p-4">
				{/* ... Other fields */}
				<Grid item xs={12}>
					<TextField
						required
						multiline
						rows={8}
						label="Content"
						variant="outlined"
						className="w-full"
						value={editedContent}
						error={!!contentError}
						helperText={contentError}
						onChange={(event) => {
							setEditedContent(event.target.value);
							setContentError(null); // Clear error on input change
						}}
					/>
				</Grid>
			</Grid>
			<Button onClick={handleUpdate}>Update Post</Button>
		</Dialog>
	);
};
