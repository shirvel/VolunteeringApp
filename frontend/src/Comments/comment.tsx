import { Avatar, Divider, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { CommentI, editComment } from "./CommentService";
import { EditCommentModal } from "./EditCommentModal";

export const CommentComp = ({
	comment,
	deleteComment,
}: {
	comment: CommentI;
	deleteComment: () => void;
}) => {
	const [openEdit, setOpenEdit] = useState(false);
	const [content, setContent] = useState(comment.content);
	return (
		<Paper className="p-4 w-50">
			<div className="flex items-center justify-between">
				<Avatar alt={comment.user_name} src={"userImage"} />
				<div>
					<IconButton onClick={() => setOpenEdit(true)}>
						<EditIcon />
					</IconButton>
					<IconButton onClick={deleteComment}>
						<DeleteIcon />
					</IconButton>
				</div>
			</div>
			<Divider className="py-2" />
			{content}
			<EditCommentModal
				handleUpdate={(newContent: string) => {
					editComment(comment, newContent);
					setContent(newContent);
					setOpenEdit(false);
				}}
				open={openEdit}
				onClose={() => setOpenEdit(false)}
				comment={comment}
			/>
		</Paper>
	);
};
