import { Avatar, Grid, Paper } from "@mui/material";
import React from "react";

export type CommentI = { post_id: string; user_name: string; content: string };

export const CommentComp = ({ comment }: { comment: CommentI }) => {
	return (
		<Paper className="p-4 w-50">
			<Grid container wrap="nowrap" spacing={2}>
				<Grid item>
					<Avatar alt={comment.user_name} src={"userImage"} />
				</Grid>
				<Grid item xs zeroMinWidth>
					<p style={{ textAlign: "left" }}>{comment.content}</p>
				</Grid>
			</Grid>
		</Paper>
	);
};
