import { endpoints } from "../api/endpoints";
import { deleteRequest, patch, post } from "../api/requests";

export type CommentI = {
	post_id: string;
	user_name: string;
	content: string;
	_id: string;
};

export const deleteComment = async (commentId: string) => {
	const response = await deleteRequest(
		endpoints.COMMENTS.DELETE_OR_EDIT(commentId)
	);
	return response;
};

export const editComment = async (comment: CommentI, newContent: string) => {
	const response = await patch(endpoints.COMMENTS.DELETE_OR_EDIT(comment._id), {
		content: newContent,
	});
	return response;
};

export const addComment = async (commentToSend: {
	post_id: string;
	user_name: string;
	content: string;
}) => {
	const response = await post(endpoints.COMMENTS.BASE, {
		...commentToSend,
	});
	return response;
};
