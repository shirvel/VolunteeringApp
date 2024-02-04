import { Button } from "@mui/base";
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { AddCommentModal } from "../Comments/AddCommentModal";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import { renderWeatherIcon } from "./weather";
import { getAllComments, likePost, disLikePost } from "./PostService";
import { fetchWeatherForPost, getConnectedUser } from "./PostService";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { DeletePostModal } from "./DeletePostModal";
import { post } from "api/requests";
import DeleteIcon from '@mui/icons-material/Delete';
import { EditPostModal } from "./EditPostModal";
import ModeEditIcon from '@mui/icons-material/ModeEdit';




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
interface PostProps {
	post: IPost;
}

  export const Post = ({ post, onDelete }: { post: IPost; onDelete: (postId: string) => void }) => {
	const [numberOfComments, setNumberOfComments] = useState(0);
	const [openAddComment, setOpenAddComment] = useState(false);
	const [weatherData, setWeatherData] = useState<any>(null);
	const [likesCount, setLikesCount] = useState(post.likes); 
	const [dislikeCount, setDislikeCount] = useState(post.dislikes);
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [posts, setPosts] = useState<IPost[]>([]);
	const [openEditModal, setOpenEditModal] = useState(false);
	const [editedContent, setEditedContent] = useState<string | null>(null);

	

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
					// Dont change the likecount
					setLikesCount((likesCount) => likesCount);
				}
			} catch (error) {
				console.error('Error liking the post:', error);
				// Dont increase the like count 
				setLikesCount((likesCount) => likesCount);
			}
		} else {
			console.error('User details not found or user ID is missing');
		}
	};
	const fetchDisLike = async () => {
		const userDetails = await getConnectedUser(); 
		if (userDetails && userDetails.id) {
			try {
				const data = await disLikePost(post._id, userDetails.id);
				if (data !== null) {
					setDislikeCount((dislikeCount) => dislikeCount + 1);
				} else {
					// Dont change the likecount
					setLikesCount((dislikeCount) => dislikeCount);
				}
			} catch (error) {
				console.error('Error liking the post:', error);
				// Dont increase the like count 
				setLikesCount((dislikeCount) => dislikeCount);
			}
		} else {
			console.error('User details not found or user ID is missing');
		}
	};
	const handleOpenDeleteModal = () => {
		setOpenDeleteModal(true);
	  };

	const handleDeletePost = (deletedPostId: string) => {
		console.log("the deleted post" +deletedPostId);
 
  setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
};
const handleOpenEditModal = (postToEdit: IPost) => {
	setEditedContent(postToEdit.content);
	setOpenEditModal(true);
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
          		marginBottom="8px" 
        	>
			<Typography variant="h5" fontWeight="bold" gutterBottom>
          		{post.title}
        	</Typography>
		  	{canEditOrDelete(post)  && (
				<Box>
            		<Button
  						variant="outlined"
  						color="primary"
  						onClick={() => handleOpenEditModal(post)}
  						style={{
    						marginBottom: "8px",
    						backgroundColor: "transparent",
    						color: "blue",
    						justifyContent: "flex-end",
    						alignItems: "center",
  						}}
					>
  						<ModeEditIcon style={{ marginRight: "4px" }} />
					</Button>
					<Button
  						variant="outlined"
  						color="secondary"
  						onClick={handleOpenDeleteModal}
  						style={{
    						backgroundColor: "transparent",
    						color: "red",
    						justifyContent: "flex-end",
    						alignItems: "center",
  						}}
					>
  						<DeleteIcon style={{ marginRight: "4px" }} />
					</Button>
				</Box>
        	)}
		</Box> 
        <DeletePostModal
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          postId={post._id}
          onDelete={(deletedPostId: string) => handleDeletePost(deletedPostId)}
        />
        <EditPostModal
          open={openEditModal}
          onClose={() => {
            setOpenEditModal(false);
            setEditedContent(null); // Clear edited content when modal is closed
          }}
          postId={post._id}
          content={editedContent || ""}
          onContentChange={setEditedContent} // Callback to update edited content
        />
				<Typography variant="body1">{post.content}</Typography>
				<Typography variant="body2">
					Location:{post.location}
					</Typography>
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
							<div>
								{renderWeatherIcon(weatherData.weather[0].main)}
							</div>
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
		  }}
		>
            <img
              src={post.image}
              alt={post.title}
              style={{ maxWidth: "100%", maxHeight: "200px" }} // Adjust the dimensions as needed
            />
			{/* Like and Dislike buttons in the bottom-right corner */}
			<Box
        		sx={{
          			display: "flex",
          			alignItems: "center",
					  marginTop: "auto",
					  marginLeft: "auto",
          			
        		}}
      		>
        	<ThumbUpIcon onClick={fetchAddLike} aria-label="like" />
        	<Typography component="span">{likesCount}</Typography>
        	<ThumbDownIcon onClick={fetchDisLike} aria-label="dislike" />
        	<Typography component="span">{dislikeCount}</Typography>
      	</Box>
    </Box>
        )}
			</CardContent>
		</Card>
	);
};
