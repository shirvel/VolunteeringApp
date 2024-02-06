import React, { useEffect, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import { getallposts } from "./PostService";
import { IPost, Post } from "./Post";
import { Category, getAllCategories } from "../chat/chatService";
import { CreatePostModal } from "./CreatePostModal"; // Import the CreatePostModal component
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
	notSelectedButtonStyle,
	selectedButtonStyle,
} from "../MuiCommonStyles";

interface IViewPostsProps {
	isSidebarOpen: boolean;
	toggleSidebar: () => void;
}

const ViewPosts: React.FC<IViewPostsProps> = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);

	useEffect(() => {
		const getCategories = async () => {
			const response = await getAllCategories();
			setCategories(response);
		};

		getCategories();
	}, []);

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const fetchedPosts = await getallposts();
				if (fetchedPosts) {
					if (selectedCategory) {
						setPosts(
							fetchedPosts.filter((post) => post.category === selectedCategory)
						);
					} else {
						setPosts(fetchedPosts);
					}
				}
			} catch (error) {
				console.error(error);
			}
		};
		fetchPosts();
	}, [selectedCategory]);

	const handleOpenCreatePostModal = () => {
		setIsCreatePostModalOpen(true);
	};
	const addNewPost = (newPost: IPost) => {
		setPosts((prevPosts) => [...prevPosts, newPost]);
	};

	return (
		<div className="overflow-y-scroll h-screen w-full">
			<div
				style={{
					position: "absolute",
					top: 10,
					right: 32,
				}}>
				<IconButton onClick={handleOpenCreatePostModal}>
					<AddCircleOutlineIcon sx={{ color: "white" }} />
				</IconButton>
			</div>
			<div className="w-full pt-10">
				<CreatePostModal
					open={isCreatePostModalOpen}
					onClose={() => setIsCreatePostModalOpen(false)}
					addNewPost={addNewPost}
				/>
				<Box p={2} bgcolor="none">
					<Box
						display="flex"
						justifyContent="space-between"
						alignItems="center">
						{categories.map((category, index) => (
							<Button
								key={index}
								variant="outlined"
								onClick={() => setSelectedCategory(category.name)}
								sx={
									category.name === selectedCategory
										? selectedButtonStyle
										: notSelectedButtonStyle
								}>
								{category.name}
							</Button>
						))}
					</Box>
					{posts.map((post, index) => (
						<div key={index}>
							<Post
								post={post}
								onDelete={(postId: string) => {
									setPosts((prevPosts) =>
										prevPosts.filter((post) => post._id !== postId)
									);
								}}
								onEdit={(editedPost: IPost) => {
									setPosts((prevPosts) => [
										...prevPosts.filter((post) => post._id !== editedPost._id),
										editedPost,
									]);
								}}
							/>
						</div>
					))}
				</Box>
			</div>
		</div>
	);
};

export default ViewPosts;
