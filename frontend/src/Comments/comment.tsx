import { Avatar, Grid, Paper } from "@mui/material";
import React from "react";

export const Comment = () => {
	return (
		<Paper className="p-4 w-50">
			<Grid container wrap="nowrap" spacing={2}>
				<Grid item>
					<Avatar alt="user name" src={"userImage"} />
				</Grid>
				<Grid item xs zeroMinWidth>
					<p style={{ textAlign: "left" }}>comment content</p>
				</Grid>
			</Grid>
		</Paper>
	);
};
