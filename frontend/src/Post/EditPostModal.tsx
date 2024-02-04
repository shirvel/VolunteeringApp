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
  import React from "react";
  import { editPost } from "./PostService";
  
  export interface DialogProps {
	open: boolean;
	onClose: () => void;
	postId: string;
	content: string;
	onContentChange: (newContent: string) => void; 
  }
  
  const sendPostEditToServer = (content: string, postId: string) => {
	console.log(content);
	editPost(content, postId);
  };
  
  export const EditPostModal = (props: DialogProps) => {
	const { onClose, open, postId, content, onContentChange } = props;
  
	const handleClose = () => {
	  onClose();
	};
  
	const handleUpdate = () => {
	  if (!content) {
		setContentError("Content is required");
		return;
	  }
  
	  // Clear any previous error messages
	  setContentError(null);
  
	  sendPostEditToServer(content, postId);
	  onClose();
	};
  
	const [contentError, setContentError] = useState<string | null>(null);
  
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
			  value={content}
			  error={!!contentError}
			  helperText={contentError}
			  onChange={(event) => {
				onContentChange(event.target.value); // Update the edited content
				setContentError(null); // Clear error on input change
			  }}
			/>
		  </Grid>
		</Grid>
		<Button onClick={handleUpdate}>Update Post</Button>
	  </Dialog>
	);
  };
  