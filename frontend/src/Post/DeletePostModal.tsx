import { Dialog, Button, DialogContent, DialogActions } from "@mui/material";
import React from "react";
import { deletePost } from "./PostService";

interface DeletePostModalProps {
	open: boolean;
	onClose: () => void;
	postId: string;
	onDelete: (deletedPostId: string) => void;
}

const sendPostDeleteToServer = (postId: string) => {
	deletePost(postId);
};

export const DeletePostModal = ({
	open,
	onClose,
	postId,
	onDelete,
}: DeletePostModalProps) => {
	const handleDelete = () => {
		sendPostDeleteToServer(postId);
		onDelete(postId);
		onClose();
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogContent>
				<div>
					<p>Are you sure you want to delete this post?</p>
				</div>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleDelete}
					variant="contained"
					style={{ backgroundColor: "#2196f3", color: "#fff" }}>
					Yes
				</Button>
				<Button
					onClick={onClose}
					variant="outlined"
					style={{ backgroundColor: "#fff", color: "#000" }}>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
};
