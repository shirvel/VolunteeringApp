import {
	Dialog,
	DialogTitle,
	TextField,
	Button,
	Grid,
	InputLabel,
	NativeSelect,
	FormControl,
	Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, ChangeEvent } from "react";
import { CreatePostDetails } from "./Posts-deprecated";
import React, {useEffect} from "react";
import { createPost, getAllCategories, Category } from "./PostService";
import { uploadFile } from "./../File/FileService";

export interface DialogProps {
	open: boolean;
	onClose: () => void;
}

const sendPostCreateToServer = (postDetails: CreatePostDetails) => {
	console.log(postDetails);
	createPost(postDetails);
};

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

export const CreatePostModal = (props: DialogProps) => {
	const { onClose, open } = props;

	const handleClose = () => {
		onClose();
	};

	const [allCategories, setAllCategories] = useState<Category[]>([])

	useEffect(() => 
	{	
		const getCategories = async () => {
			const categories = await getAllCategories();
			setAllCategories(categories)
			return categories
		}
		getCategories().then((categories) => console.log(categories));
	}, [])

	const pickedImage = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setImageFile(event.target.files[0]);
		}
	};

	const removeImage = () => {
		setImageFile(null);
	};

	const handleCreate = async () => {
		// Check for empty fields
		if (!title) {
			setTitleError("Title is required");
			return;
		}
		if (!content) {
			setContentError("Content is required");
			return;
		}
		if (!phoneNumber) {
			setPhoneNumberError("Phone number is required");
			return;
		}

		// Clear any previous error messages
		setTitleError(null);
		setContentError(null);
		setPhoneNumberError(null);

		const image = await uploadFile(imageFile);
		sendPostCreateToServer({ title, content, phoneNumber, image, category });

		setTitle("");
		setContent("");
		setPhoneNumber("");
		setImageFile(null);
		setCategory(allCategories.length > 0 ? allCategories[0].name : '');

		onClose();
	};

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [category, setCategory] = useState(allCategories.length > 0 ? allCategories[0].name : '');
	const [imageFile, setImageFile] = useState<File | null>(null);

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
							setTitle(event.target.value);
							setTitleError(null); // Clear error on input change
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormControl sx={{ width: "100%" }}>
						<InputLabel variant="standard" htmlFor="uncontrolled-native">
							Category
						</InputLabel>
						<NativeSelect
							defaultValue={allCategories.length > 0 ? allCategories[0].name : ''}
							inputProps={{
								name: "category",
								id: "uncontrolled-native",
							}}
							onChange={(event) => setCategory(event.target.value)}> 
							{
								allCategories.map((cat: Category) => { return (<option key={cat.name} value={cat.name}>{cat.name}</option>)})

							}
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
							setContent(event.target.value);
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
							setPhoneNumber(event.target.value);
							setPhoneNumberError(null); // Clear error on input change
						}}
					/>
				</Grid>

				<Grid item xs={12}>
					<Button
						sx={{
							background: "#2196f3",
						}}
						size="small"
						component="label"
						variant="contained"
						startIcon={<CloudUploadIcon />}>
						Upload photo
						<VisuallyHiddenInput type="file" onChange={pickedImage} />
					</Button>
				</Grid>
				{imageFile ? (
					<Grid item xs={12}>
						<Box position="relative">
							<Button
								sx={{
									color: "white",
									position: "absolute",
									top: 0,
									left: -10,
									zIndex: 1,
								}}
								onClick={removeImage}>
								<ClearIcon />
							</Button>
							<img
								src={URL.createObjectURL(imageFile)}
								alt="Photo"
								style={{
									width: "250px",
									height: "250px",
									borderRadius: "5%",
									objectFit: "cover",
									marginBottom: "20px",
								}}
							/>
						</Box>
					</Grid>
				) : (
					<Grid />
				)}
			</Grid>

			<Button onClick={handleCreate}>Create Post</Button>
		</Dialog>
	);
};
