import { getAllComments } from "../Post/PostService";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CommentComp } from "./comment";
import { CommentI } from "./CommentService";

export const AllPostComments = () => {
	const [searchParams] = useSearchParams();
	const [comments, setComments] = useState<CommentI[]>([]);

	useEffect(() => {
		const postId = searchParams.get("postId");
		const loadAllComments = async () => {
			if (postId) {
				const response = await getAllComments(postId);
				setComments(response);
				console.log(response);
			}
		};
		loadAllComments();
	}, []);
	return (
		<>
			{comments.length !== 0 ? (
				<div>
					{comments.map((comment, index) => (
						<div key={index}>
							<CommentComp comment={comment} />
						</div>
					))}
				</div>
			) : (
				<div>This post has no comments yet</div>
			)}
		</>
	);
};
