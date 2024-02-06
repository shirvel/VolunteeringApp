import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { gettAllPostsByUser } from "../Post/PostService";
import { IPost, Post } from "./Post";
import { IconButton } from "@mui/material";

export const AllUserPosts = () => {
	const [searchParams] = useSearchParams();
	const [posts, setPosts] = useState<IPost[]>([]);

	useEffect(() => {
		const userId = searchParams.get("userId");

		const loadAllPosts = async () => {
			if (userId) {
				const response = await gettAllPostsByUser(userId);
				setPosts(response);
			}
		};

		loadAllPosts();
	}, [searchParams]);

	return (
		<div className="overflow-y-scroll h-screen w-full">
			<div className="flex-end">
				<IconButton>
					<Link to="/view-posts">
						<ArrowBackIcon />
					</Link>
				</IconButton>
			</div>
			{posts.length !== 0 ? (
				posts.map((post, index) => {
					return (
						<div key={index} className="w-full p-4">
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
					);
				})
			) : (
				<div>The User has no posts yet</div>
			)}
		</div>
	);
};
