import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { getallposts } from "./PostService";
import { IPost, Post } from "./Post";
import { Category, getAllCategories } from "../chat/chatService";
import { endpoints } from "../api/endpoints";

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
				const fetchedPosts  = await getallposts();
				if (fetchedPosts) {
					setPosts(fetchedPosts); // Update the state with the fetched posts
				}
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
	
	const filteredPosts = selectedCategory
		? posts.filter((post) => post.category === selectedCategory)
		: posts;

	return (
		<div className="overflow-y-scroll h-screen w-full">
			<Box p={2} bgcolor="none">
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
			</Box>
		</div>
	);
};

export default ViewPosts;