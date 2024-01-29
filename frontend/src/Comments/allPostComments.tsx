import { getAllComments } from "../Post/PostService";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CommentComp } from "./comment";
import { CommentI, deleteComment } from "./CommentService";

export const AllPostComments = () => {
	const [searchParams] = useSearchParams();
	const [comments, setComments] = useState<CommentI[]>([]);

	const deleteCommentFromPostComments = useCallback(
		(commentId: string) => () => {
			deleteComment(commentId);
			setComments((comments) =>
				comments.filter((comment) => comment._id != commentId)
			);
		},
		[comments, setComments]
	);

	useEffect(() => {
		const postId = searchParams.get("postId");
		const loadAllComments = async () => {
			if (postId) {
				const response = await getAllComments(postId);
				setComments(response);
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
							<CommentComp
								comment={comment}
								deleteComment={deleteCommentFromPostComments(comment._id)}
							/>
						</div>
					))}
				</div>
			) : (
				<div>This post has no comments yet</div>
			)}
		</>
	);
};
