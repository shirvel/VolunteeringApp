import { getAllComments } from "../Post/PostService";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CommentComp, CommentI } from "./comment";

export const AllPostComments = () => {
	const [searchParams] = useSearchParams();
	const [comments, setComments] = useState<CommentI[]>([
		{
			post_id: searchParams.get("postId") ?? "test",
			user_name: "test",
			content: "content",
		},
	]);

	useEffect(() => {
		const postId = searchParams.get("postId");
		const loadAllComments = async () => {
			if (postId) {
				const response = getAllComments(postId);
				// setComments(response);
				console.log(response);
			}
		};
		loadAllComments();
	}, []);
	return (
		<div>
			comments for post: {searchParams.get("postId")}
			{comments.map((comment, index) => (
				<CommentComp comment={comment} />
			))}
		</div>
	);
};
