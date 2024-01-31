import { Button } from "@mui/base";
import { Dialog, DialogTitle, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { DialogProps } from "../User/EditUserDetailsModal";
import { addComment } from "./CommentService";

export const AddCommentModal = (
	props: DialogProps & {
		postId: string;
		handleAddComment: () => void;
	}
) => {
	const { onClose, open, postId, handleAddComment } = props;
	const [content, setContent] = useState("");
	const handleClose = () => {
		onClose();
	};

	const handleAdd = () => {
		addComment({
			post_id: postId,
			user_name: localStorage.getItem("userName") ?? "",
			content: content,
		});
		handleAddComment();
		onClose();
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle className="flex items-center justify-center">
				Edit Comment
			</DialogTitle>
			<Grid container spacing={3} className="p-4">
				<Grid item xs={12}>
					<TextField
						label="content"
						variant="outlined"
						className="w-full"
						value={content}
						onChange={(event) => setContent(event.target.value)}
					/>
				</Grid>
			</Grid>
			<Button onClick={() => handleAdd()}>Add</Button>
		</Dialog>
	);
};
