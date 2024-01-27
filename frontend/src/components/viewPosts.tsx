import { Button } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createSearchParams } from "react-router-dom";

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

const ViewPosts: React.FC = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchPosts() {
			try {
				const response = await fetch("http://localhost:3000/posts");
				if (!response.ok) {
					throw new Error(`Failed to fetch posts. Status: ${response.status}`);
				}
				const data = await response.json();
				setPosts(data);
			} catch (error) {
				console.error(error);
			}
		}

		fetchPosts();
	}, []);

	const moveToCommentPage = useCallback((post: IPost) => {
		navigate({
			pathname: "/comments",
			search: `?${createSearchParams({ postId: post._id })}`,
		});
	}, []);

	return (
		<div>
			<h1>View Posts</h1>
			{posts.map((post) => (
				<div key={post._id}>
					<h2>{post.title}</h2>
					<p>{post.content}</p>
					<p>Category: {post.category}</p>
					<Button onClick={() => moveToCommentPage(post)}>
						to this post comments
					</Button>
				</div>
			))}
		</div>
	);
};

export default ViewPosts;
