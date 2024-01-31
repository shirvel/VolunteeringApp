import { endpoints } from "../api/endpoints";
import { CreatePostDetails } from "./Posts-deprecated";
import { deleteRequest, post, patch, get } from "../api/requests";
import { CommentI } from "Comments/CommentService";

export const getConnectedUser = () => {
	const usrId = localStorage.getItem("userId");
	return { id: usrId };
};

export const createPost = async (postDetails: CreatePostDetails) => {
	const connectedUser = getConnectedUser();
	console.log(connectedUser);
	const user_id = connectedUser.id;

	const updatedPostDetails = { ...postDetails, user_id };
	console.log(endpoints.POST.CREATE_POST());
	const response = await post(endpoints.POST.CREATE_POST(), updatedPostDetails);
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const editPost = async (content: string, postId: string) => {
	console.log(endpoints.POST.EDIT_POST(postId));
	const response = await patch(endpoints.POST.EDIT_POST(postId), {
		content: content,
	});
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const addLike  = async (postId: string, userId: string) => {
	console.log(endpoints.POST.AddLike(postId));
	const response = await post(endpoints.POST.AddLike(postId), { user_id: userId });
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const addDislike  = async (postId: string, userId: string) => {
	console.log(endpoints.POST.AddDisLike(postId));
	const response = await post(endpoints.POST.AddLike(postId), { user_id: userId });
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const deletePost = async (postId: string, userId: string) => {
	console.log(endpoints.POST.DELETE_POST(postId));
	const response = await post(endpoints.POST.AddDisLike(postId), { user_id: userId });
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const  getWeather= async (location: string) => {
	console.log(endpoints.WEATHER.GET_WEATHER(location));
	const response = await fetch(endpoints.WEATHER.GET_WEATHER(location));
	const data = await response.json;
	console.log(JSON.stringify(data));
};

export const getAllComments = async (postId: string) => {
	const response = await get(endpoints.POST.GET_COMMENTS(postId));
	return response as CommentI[];
};

