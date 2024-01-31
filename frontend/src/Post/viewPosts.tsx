import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";

import { IPost, Post } from "./Post";
import { Category, getAllCategories } from "../chat/chatService";
import { getAllPosts } from "./PostService";
import { getWeather, renderWeatherIcon } from './weather';

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
				const allPostsData = await getAllPosts()
				setPosts(allPostsData);
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
					<div key={index}>
						<Post weatherData={weatherData[index]} post={post} />
					</div>
				))}
		</div>
	);
};

export default ViewPosts;