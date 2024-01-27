import { Dialog, Button, DialogContent, DialogActions } from "@mui/material";

import React from "react";
import { deletePost } from "./PostService";

export interface DialogProps {
	open: boolean;
    onClose: () => void;
    postId: string
}

const sendPostDeleteToServer = (postId: string) => {
	console.log(postId);
	deletePost(postId);
};

export const DeletePostModal = (props: DialogProps) => {
	const { onClose, open, postId } = props;

	const handleClose = () => {
		onClose();
    };
    
	const handleDelete = () => {

		sendPostDeleteToServer(postId);
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
          style={{ backgroundColor: '#2196f3', color: '#fff' }}
        >
          Yes
        </Button>
        <Button
          onClick={handleClose}
          variant="outlined"
          style={{ backgroundColor: '#fff', color: '#000' }}
        >
          No
        </Button>
        </DialogActions>
    </Dialog>
  );
};