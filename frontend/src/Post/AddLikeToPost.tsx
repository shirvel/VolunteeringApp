import { Dialog, DialogTitle, TextField, Button, Grid, InputLabel, NativeSelect, FormControl } from "@mui/material";

import { useState } from "react";
import { CreatePostDetails } from "./Posts";
import React from "react";
import { addLike } from "./PostService";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    handleAddlike: () => void;
    postId: string
    userId: string
}

const sendAddlikeServer = (postId: string, userId: string) => {
	console.log(userId);
	addLike(postId, userId);
};
export const Addikemodel = (props: DialogProps) => {
	const {open, onClose,  postId,userId, handleAddlike } = props;

    
	const handlelike = () => {
		
		sendAddlikeServer(postId, userId);
        handleAddlike();
	};
    //const [likes, setlikes] = useState(postDetails.likes);			 


	return (
        <Dialog open={open} onClose={onClose}>
            {/* ... your dialog content ... */}
            <Button onClick={() => {
                handleAddlike(); // This will be called when the like button inside the modal is clicked
                onClose(); // Close the modal
            }}>Like</Button>
        </Dialog>
);
};

