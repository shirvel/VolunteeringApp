import { Dialog, DialogTitle, TextField, Button, Grid, InputLabel, NativeSelect, FormControl } from "@mui/material";

import { useState } from "react";
import { CreatePostDetails } from "./Posts";
import React from "react";
import { createPost } from "./PostService";

export interface DialogProps {
	open: boolean;
	onClose: () => void;
}

const sendPostCreateToServer = (postDetails: CreatePostDetails) => {
	console.log(postDetails);
	createPost(postDetails);
};

export const CreatePostModal = (props: DialogProps) => {
	const { onClose, open } = props;

	const handleClose = () => {
		onClose();
    };
    
	const handleCreate = () => {

		// Check for empty fields
		if (!title) {
		setTitleError('Title is required');
		return;
		}
		if (!content) {
		setContentError('Content is required');
		return;
		}
		if (!phoneNumber) {
		setPhoneNumberError('Phone number is required');
		return;
		}
	
		// Clear any previous error messages
		setTitleError(null);
		setContentError(null);
		setPhoneNumberError(null);

		sendPostCreateToServer({ title, content, phoneNumber, image, category });
		onClose();
	};
					 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState('');
	const [category, setCategory] = useState('Community');

	const [titleError, setTitleError] = useState<string | null>(null);
	const [contentError, setContentError] = useState<string | null>(null);
	const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);



	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle className="flex items-center justify-center">
				Create Post
			</DialogTitle>
			<Grid container spacing={3} className="p-4">
				<Grid item xs={12}>
					<TextField
					    required
						label="Title"
						variant="outlined"
						className="w-full"
						value={title}
						error={!!titleError}
                		helperText={titleError}
						onChange={(event) => {
							setTitle(event.target.value)
							setTitleError(null); // Clear error on input change
						}}
					/>
				</Grid>
				<Grid item xs={12}>
				<FormControl sx={{ width: '100%' }}>
					<InputLabel variant="standard" htmlFor="uncontrolled-native">
						Category
					</InputLabel>
					<NativeSelect
						defaultValue={"Community"}
						inputProps={{
						name: 'category',
						id: 'uncontrolled-native',
						}}
						onChange={(event) => setCategory(event.target.value)}
					>
						<option value={"Community"}>Community</option>
						<option value={"Animals"}>Animals</option>
						<option value={"Elderly"}>Elderly</option>
						<option value={"Cooking"}>Cooking</option>
						<option value={"Transportation"}>Transportation</option>
						<option value={"Other"}>Other</option>
					</NativeSelect>
					</FormControl>
				</Grid>

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
							setContent(event.target.value)
							setContentError(null); // Clear error on input change
						}}
					/>
				</Grid>

                <Grid item xs={12}>
					<TextField
                		required
						label="Phone Number"
						variant="outlined"
						className="w-full"
						value={phoneNumber}
						error={!!phoneNumberError}
                		helperText={phoneNumberError}
						onChange={(event) => {
							setPhoneNumber(event.target.value)
							setPhoneNumberError(null); // Clear error on input change
						}}
					/>
				</Grid>

                <Grid item xs={12}>
					<TextField
					    required
						label="Image"
						variant="outlined"
						className="w-full"
						value={image}
						onChange={(event) => setImage(event.target.value)}
					/>
				</Grid>

            
			</Grid>
			<Button onClick={handleCreate}>Create Post</Button>
		</Dialog>
	);
};