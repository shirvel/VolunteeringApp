import { Button } from "@mui/base";
import { Dialog, DialogTitle, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { DialogProps } from "../User/EditUserDetailsModal";
import { CommentI } from "./CommentService";

export const EditCommentModal = (
	props: DialogProps & {
		comment: CommentI;
		handleUpdate: (content: string) => void;
	}
) => {
	const { onClose, open, comment, handleUpdate } = props;

	const handleClose = () => {
		onClose();
	};

	const [content, setContent] = useState(comment.content);

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
			<Button onClick={() => handleUpdate(content)}>Update</Button>
		</Dialog>
	);
};
