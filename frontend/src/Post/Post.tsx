import {
	Card,
	CardContent,
	Typography,
	Box,
	Button,
	IconButton,
} from "@mui/material";
import { AddCommentModal } from "../Comments/AddCommentModal";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import { renderWeatherIcon } from "./weather";
import { getAllComments, likePost, disLikePost } from "./PostService";
import { fetchWeatherForPost, getConnectedUser } from "./PostService";
import { DeletePostModal } from "./DeletePostModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditPostModal } from "./EditPostModal";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export interface IPost {
	_id: string;
	title: string;
	content: string;
	phoneNumber: string;
	image: string;
	category: string;
	likes: number;
	likedBy: string[];
	dislikes: number;
	dislikedBy: string[];
	location: string;
	user_id: string;
}

export const Post = ({
	post,
	onDelete,
	onEdit,
}: {
	post: IPost;
	onDelete: (postId: string) => void;
	onEdit: (post: IPost) => void;
}) => {
	const [numberOfComments, setNumberOfComments] = useState(0);
	const [openAddComment, setOpenAddComment] = useState(false);
	const [weatherData, setWeatherData] = useState<any>(null);
	const [likesCount, setLikesCount] = useState(post.likes);
	const [liked, setLiked] = useState(post.likedBy.includes(post.user_id));
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openEditModal, setOpenEditModal] = useState(false);

	const navigate = useNavigate();
	const moveToCommentPage = useCallback((post: IPost) => {
		navigate({
			pathname: "/comments",
			search: `?${createSearchParams({ postId: post._id })}`,
		});
	}, []);

	useEffect(() => {
		const loadAllComments = async () => {
			const response = await getAllComments(post._id);
			setNumberOfComments(response.length);
		};

		const fetchAndSetWeatherData = async () => {
			const data = await fetchWeatherForPost(post.location);
			setWeatherData(data);
		};
		loadAllComments();
		fetchAndSetWeatherData();
	}, [post._id, post.location]);

	const fetchAddLike = async () => {
		const userDetails = await getConnectedUser();
		if (userDetails && userDetails.id) {
			try {
				const data = await likePost(post._id, userDetails.id);
				if (data !== null) {
					setLikesCount((likesCount) => likesCount + 1);
				} else {
					setLikesCount((likesCount) => likesCount + 1);
				}
			} catch (error) {
				console.error("Error liking the post:", error);
			}
		} else {
			console.error("User details not found or user ID is missing");
		}
	};
	const fetchDisLike = async () => {
		const userDetails = await getConnectedUser();
		if (userDetails && userDetails.id) {
			try {
				const data = await disLikePost(post._id, userDetails.id);
				if (data !== null) {
					setLikesCount((likesCount) => likesCount - 1);
				} else {
					setLikesCount((likesCount) => likesCount - 1);
				}
			} catch (error) {
				console.error("Error liking the post:", error);
			}
		} else {
			console.error("User details not found or user ID is missing");
		}
	};

	const toggleLike = async () => {
		try {
			if (liked) {
				// User has already liked the post, remove the like
				await fetchDisLike();
			} else {
				// User hasn't liked the post, add the like
				await fetchAddLike();
			}
			setLiked(!liked); // Toggle the liked state
		} catch (error) {
			console.error("Error toggling like:", error);
		}
	};

	const handleDeletePost = (deletedPostId: string) => {
		console.log("the deleted post" + deletedPostId);
		onDelete(deletedPostId);
		setOpenDeleteModal(false);
	};

	const canEditOrDelete = (post: IPost) => {
		const userDetails = getConnectedUser();
		return userDetails && post.user_id === userDetails.id;
	};

	return (
		<Card
			key={post._id}
			sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
			<CardContent>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					marginBottom="8px">
					<Typography variant="h5" fontWeight="bold" gutterBottom>
						{post.title}
					</Typography>
					{canEditOrDelete(post) && (
						<div className="flex items-center">
							<IconButton
								onClick={() => setOpenEditModal(true)}
								style={{
									backgroundColor: "transparent",
									color: "blue",
									justifyContent: "flex-end",
									alignItems: "center",
								}}>
								<ModeEditIcon style={{ marginRight: "4px" }} />
							</IconButton>
							<IconButton
								color="secondary"
								onClick={() => setOpenDeleteModal(true)}
								style={{
									backgroundColor: "transparent",
									color: "red",
									justifyContent: "flex-end",
									alignItems: "center",
								}}>
								<DeleteIcon style={{ marginRight: "4px" }} />
							</IconButton>
						</div>
					)}
				</Box>
				<DeletePostModal
					open={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
					postId={post._id}
					onDelete={() => handleDeletePost(post._id)}
				/>
				<EditPostModal
					open={openEditModal}
					onClose={() => {
						setOpenEditModal(false);
					}}
					onEdit={onEdit}
					post={post}
				/>
				<Typography variant="body1">{post.category}</Typography>
				<Typography variant="body1">{post.content}</Typography>
				<Typography variant="body2">Location:{post.location}</Typography>
				<Button onClick={() => moveToCommentPage(post)}>
					{numberOfComments} comments
				</Button>
				<Button onClick={() => setOpenAddComment(true)}>
					<MessageIcon />
				</Button>
				<AddCommentModal
					open={openAddComment}
					onClose={() => setOpenAddComment(false)}
					postId={post._id}
					handleAddComment={() => {
						setNumberOfComments((num) => num + 1);
					}}
				/>

				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					{weatherData ? (
						<>
							<div>{renderWeatherIcon(weatherData.weather[0].main)}</div>
							<div style={{ flex: 1 }}>
								<Typography variant="body2" color="textSecondary">
									{Math.round(weatherData.main.temp)}°C
								</Typography>
							</div>
						</>
					) : (
						<Typography variant="body2" color="textSecondary">
							Weather data not available
						</Typography>
					)}
				</div>
				{post.image && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							position: "relative",
							marginTop: "auto", // Pushes the image to the end of the card
							maxHeight: "200px",
						}}>
						<img
							src={post.image}
							alt={post.title}
							style={{ maxWidth: "100%", maxHeight: "200px" }} // Adjust the dimensions as needed
						/>
					</Box>
				)}
				{/* Like and Dislike buttons in the bottom-right corner */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						marginTop: "auto",
						marginLeft: "auto",
					}}>
					<Button onClick={toggleLike}>
						{liked ? (
							<FavoriteIcon color="secondary" />
						) : (
							<FavoriteBorderOutlinedIcon />
						)}
						{likesCount}
					</Button>
				</Box>
			</CardContent>
		</Card>
	);
};
