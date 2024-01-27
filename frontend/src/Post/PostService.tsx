import { endpoints } from "../api/endpoints";
import { CreatePostDetails } from "./Posts";
import { post, patch } from "../api/requests";

export const getConnectedUser = () => {
	const usrId = localStorage.getItem("userId");
	return { id: usrId };
};

export const createPost = async (postDetails: CreatePostDetails) => {
	const connectedUser = getConnectedUser();
	console.log(connectedUser);
	const user_id = connectedUser.id;
	
	const updatedPostDetails = {...postDetails, user_id}
	console.log(endpoints.POST.CREATE_POST());
	const response = await post(
		endpoints.POST.CREATE_POST(),
		updatedPostDetails
	);
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const editPost = async (content: string, postId: string) => {
	const connectedUser = getConnectedUser();
	console.log(connectedUser);


	console.log(endpoints.POST.EDIT_POST(postId));
	const response = await patch(
		endpoints.POST.EDIT_POST(postId),
		{"content": content}
	);
	const data = await response.data;
	console.log(JSON.stringify(data));
};
