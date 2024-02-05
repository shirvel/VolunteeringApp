import { endpoints } from "../api/endpoints";
import { CreatePostDetails } from "./Posts-deprecated";
import { deleteRequest, post, patch, get } from "../api/requests";
import { CommentI } from "Comments/CommentService";
import { IPost, Post } from "./Post";

export const getConnectedUser = () => {
	const usrId = localStorage.getItem("userId");
	return { id: usrId };
};

export const createPost = async (postDetails: CreatePostDetails): Promise<IPost> => {
	const connectedUser = getConnectedUser();
	console.log(connectedUser);
	const user_id = connectedUser.id;

	const updatedPostDetails = { ...postDetails, user_id };
	console.log(endpoints.POST.CREATE_POST());
    try{
        const response = await post(endpoints.POST.CREATE_POST(), updatedPostDetails);
	    const data = await response.data;
	    console.log(JSON.stringify(data));
        const newPost: IPost = data; // Adjust this part based on your API response structure
    return newPost;
    }catch (error) {
    throw error; // Handle any errors appropriately
  }
};

export const editPost = async (content: string, postId: string) => {
	console.log(endpoints.POST.EDIT_POST(postId));
	const response = await patch(endpoints.POST.EDIT_POST(postId), {
		content: content,
	});
	const data = await response.data;
	console.log(JSON.stringify(data));
};
export const getallposts = async (): Promise<IPost[]> => {
    console.log(endpoints.POST.GET_ALL_POSTS());
    const response = await fetch(endpoints.POST.GET_ALL_POSTS());
    const data = await response.json(); // Corrected line
    console.log(JSON.stringify(data));
    return data;
};
export const fetchWeatherForPost = async (location: string): Promise<any> => {
	const apikey = "c4b0c9fa960f9b84cd0964869bca6f3c"
	const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="
    try {
        const weatherResponse = await fetch(apiurl + location + `&appid=${apikey}`);
        if (!weatherResponse.ok) {
            return null;
        }
        return await weatherResponse.json();
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null; 
    }
};
export const deletePost = async (postId: string) => {
	console.log(endpoints.POST.DELETE_POST(postId));
	const response = await deleteRequest(endpoints.POST.DELETE_POST(postId));
    console.log(response);
    console.log(response.data);
	return response.data;
};

export const likePost = async (postId: string, usrId: string) => {
    console.log(endpoints.POST.ADD_LIKE(postId));
    try {
        const response = await post(endpoints.POST.ADD_LIKE(postId), { usrId: usrId });
		console.log(response);
        if (response) {
            if (response.status === 200) {
                if (response.data) {
                    console.log(JSON.stringify(response.data));
                    return response.data;
                } else {
                    console.error("HTTP response does not contain valid data.");
                }
            }
            else if (response.status === 400) {
                const errorData = response.data;
                if (errorData.error === 'User has already liked this post') {
                    console.error("User has already liked this post.");
                } else if (errorData.error === 'User has already disliked this post') {
                    console.error("User has already disliked this post.");
                } else {
                    console.error("Bad Request:", errorData);
                }
            } else {
                console.error("HTTP error! status:", response.status);
            }
        } else {
            //console.error("HTTP request did not return a valid response.");
        }

        return null; 
    } catch (error) {
        console.error("Error adding like:", error);
        return null;
    }
};


export const disLikePost = async (postId: string, usrId: string) => {
    console.log(endpoints.POST.ADD_DISLIKE(postId));
    console.log(usrId);
    try {
        const response = await post(endpoints.POST.ADD_DISLIKE(postId), { usrId: usrId });
		console.log(response);
        if (response) {
            if (response.status === 200) {
                if (response.data) {
                    console.log(JSON.stringify(response.data));
                    return response.data;
                } else {
                    console.error("HTTP response does not contain valid data.");
                }
            } else if (response.status === 400) {
                const errorData = response.data;
                if (errorData.error === 'User has already disliked this post') {
                    console.error("User has already disliked this post.");
                } else {
                    console.error("Bad Request:", errorData);
                }
            } else {
                console.error("HTTP error! status:", response.status);
            }
        } else {
            //console.error("HTTP request did not return a valid response.");
        }

        return null;
    } catch (error) {
        console.error("Error adding like:", error);
        return null;
    }
};

export const getAllComments = async (postId: string) => {
	const response = await get(endpoints.POST.GET_COMMENTS(postId));
	return response as CommentI[];
};

export const gettAllPostsByUser = async (usrId: string) => {
    console.log("UserId in the postservices"+usrId);
    const response = await get(endpoints.POST.GET_USER_POSTS(usrId));
    console.log(response);
	return response as IPost[];
};

export type Category = {
	name: string;
	_id: string;
};

export const getAllCategories = async () => {
	const response = await get(endpoints.CATEGORIES.BASE);
	return response;
};
