import { endpoints } from "../api/endpoints";
import { deleteRequest, patch } from "../api/requests";

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
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const editComment = async (comment: CommentI, newContent: string) => {
	const response = await patch(endpoints.COMMENTS.DELETE_OR_EDIT(comment._id), {
		content: newContent,
	});
	const data = await response.data;
	console.log(JSON.stringify(data));
};
