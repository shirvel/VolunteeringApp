import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { IPost, Post } from "./Post";
import { Category, getAllCategories } from "../chat/chatService";

interface IViewPostsProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

const ViewPosts: React.FC<IViewPostsProps> = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [weatherData, setWeatherData] = useState<any[]>([]); // Store weather data for each post
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
		const getCategories = async () => {
			const response = await getAllCategories();
			setCategories(response);
		};
		getCategories();
		fetchPosts();
	}, []);

	const filterPostsByCategory = (category: string) => {
		// Implement filtering logic here based on the selected category
		setSelectedCategory(category);
	};
	const filteredPosts = selectedCategory
		? posts.filter((post) => post.category === selectedCategory)
		: posts;

	return (
		<div className="overflow-y-scroll h-screen w-full">
			<Box p={2} bgcolor="lightgray">
				<Box display="flex" justifyContent="space-between" alignItems="center">
					{categories.map((category, index) => (
						<Button
							key={index}
							variant="outlined"
							onClick={() => filterPostsByCategory(category.name)}>
							{category.name}
						</Button>
					))}
				</Box>
				{filteredPosts.map((post, index) => (
					<Post weatherData={weatherData[index]} post={post} />
				))}
			</Box>
		</div>
	);
};

export default ViewPosts;
