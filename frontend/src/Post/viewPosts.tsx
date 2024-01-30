import React, { useCallback, useEffect, useState } from "react";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
} from "@mui/material";
import { useNavigate } from "react-router";
import CloudIcon from "@mui/icons-material/Cloud";
import ClearIcon from "@mui/icons-material/WbSunny";
import RainIcon from "@mui/icons-material/CloudQueue";
import DrizzleIcon from "@mui/icons-material/Grain";
import MistIcon from "@mui/icons-material/Opacity";
import { createSearchParams } from "react-router-dom";
import { AddCommentModal } from "../Comments/AddCommentModal";
import MessageIcon from "@mui/icons-material/Message";

interface IViewPostsProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

interface IPost {
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
}

const ViewPosts: React.FC<IViewPostsProps> = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [categories, setCategories] = useState<string[]>([]);
	const [weatherData, setWeatherData] = useState<any[]>([]); // Store weather data for each post
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [openAddComment, setOpenAddComment] = useState(false);
	const [numberOfComments, setNumberOfComments] = useState(0); //TODO: change to real number in only post

	const navigate = useNavigate();
	const moveToCommentPage = useCallback((post: IPost) => {
		navigate({
			pathname: "/comments",
			search: `?${createSearchParams({ postId: post._id })}`,
		});
	}, []);

	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await fetch("http://localhost:3000/posts");
				if (!response.ok) {
					throw new Error(`Failed to fetch posts. Status: ${response.status}`);
				}
				const data = await response.json();
				setPosts(data);
				// Fetch weather data for each post's location
				const weatherPromises = data.map(async (post: IPost) => {
					const apiKey = "c4b0c9fa960f9b84cd0964869bca6f3c";
					const apiUrl =
						"https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
					const weatherResponse = await fetch(
						apiUrl + "Tel Aviv" + `&appid=${apiKey}`
					); //will be post.location
					if (weatherResponse.status === 404) {
						return null;
					}
					const weatherData = await weatherResponse.json();
					return weatherData;
				});

				const weatherResults = await Promise.all(weatherPromises);
				setWeatherData(weatherResults);
			} catch (error) {
				console.error(error);
			}
		}

		async function fetchCategories() {
			try {
				const response = await fetch("http://localhost:3000/categories");
				if (!response.ok) {
					throw new Error(
						`Failed to fetch categories. Status: ${response.status}`
					);
				}
				const data = await response.json();
				setCategories(data);
			} catch (error) {
				console.error(error);
			}
		}
		fetchPosts();
		fetchCategories();
	}, []);

	const filterPostsByCategory = (category: string) => {
		// Implement filtering logic here based on the selected category
		setSelectedCategory(category);
	};
	const filteredPosts = selectedCategory
		? posts.filter((post) => post.category === selectedCategory)
		: posts;

	return (
		<div>
			<Box p={2} bgcolor="lightgray">
				<Typography variant="h4" align="center" gutterBottom>
					View Posts
				</Typography>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					<Button
						variant="outlined"
						onClick={() => filterPostsByCategory("test")}>
						test
					</Button>
					<Button
						variant="outlined"
						onClick={() => filterPostsByCategory("Driving")}>
						Driving
					</Button>
				</Box>
				{filteredPosts.map((post, index) => (
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
								{weatherData[index] ? (
									<>
										<div style={{ flex: 1 }}>
											<Typography variant="body2" color="textSecondary">
												Temp: {Math.round(weatherData[index].main.temp)}°C
											</Typography>
										</div>
										<div
											style={{
												flex: 1,
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
											}}>
											{renderWeatherIcon(weatherData[index].weather[0].main)}
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
				))}
			</Box>
		</div>
	);
};
function renderWeatherIcon(weatherCondition: string) {
	switch (weatherCondition) {
		case "Clouds":
			return <CloudIcon color="primary" />;
		case "Clear":
			return <ClearIcon color="primary" />;
		case "Rain":
			return <RainIcon color="primary" />;
		case "Drizzle":
			return <DrizzleIcon color="primary" />;
		case "Mist":
			return <MistIcon color="primary" />;
		default:
			return null;
	}
}
export default ViewPosts;
