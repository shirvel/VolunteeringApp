import { Button } from "@mui/base";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { AddCommentModal } from "../Comments/AddCommentModal";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import { renderWeatherIcon } from "./weather";
import { getAllComments } from "./PostService";

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
}

export const Post = ({
	post,
	weatherData,
}: {
	post: IPost;
	weatherData: any;
}) => {
	const [numberOfComments, setNumberOfComments] = useState(0);
	const [openAddComment, setOpenAddComment] = useState(false);

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
		loadAllComments();
	}, []);

	return (
		<Card
			key={post._id}
			sx={{ display: "flex", flexDirection: "column", marginBottom: 2 }}>
			<CardMedia
				component="img"
				sx={{ width: 200, objectFit: "cover" }}
				image={post.image}
				alt={post.title}
			/>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					{post.title}
				</Typography>
				<Typography variant="body1">{post.content}</Typography>
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
							<div style={{ flex: 1 }}>
								<Typography variant="body2" color="textSecondary">
									Temp: {Math.round(weatherData.main.temp)}°C
								</Typography>
							</div>
							<div
								style={{
									flex: 1,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}>
								{renderWeatherIcon(weatherData.weather[0].main)}
							</div>
						</>
					) : (
						<Typography variant="body2" color="textSecondary">
							Weather data not available
						</Typography>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
