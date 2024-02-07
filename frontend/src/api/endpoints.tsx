// For dev
// const URL = "http://127.0.0.1:3000/";

//For Prod
const URL = "https://10.10.248.204:443/";

const base = URL;
export const socketUrl = URL;
export const endpoints = {
	BASE: URL,
	FILE: {
		UPLOAD_FILE: () => base + "file/",
	},
	USER: {
		UPDATE_USER: (id: string) => base + "user/" + id + "/",
		CREATE_USER: () => base + "auth/register/",
		CREATE_USER_GOOGLE: () => base + "auth/google/",
		GET_BY_NAME: (name: string) => base + "user/get_by_name/" + name + "/",
		CREATE_NEW_TOKENS: () => base + "auth/refresh/",
		SIGNIN_USER: () => base + "auth/login/",
	},
	POST: {
		CREATE_POST: () => base + "posts/",
		EDIT_POST: (postId: string) => base + "posts/" + postId + "/",
		DELETE_POST: (postId: string) => base + "posts/" + postId + "/",
		GET_ALL_POSTS: () => base + "posts/",
		ADD_LIKE: (postId: string) => base + "posts/" + postId + "/like/",
		ADD_DISLIKE: (postId: string) => base + "posts/" + postId + "/dislike/",
		GET_COMMENTS: (postId: string) =>
			base + "comments/get_by_post/" + postId + "/",
		GET_USER_POSTS: (usrId: string) =>
			base + "posts/get_by_user/" + usrId + "/",
		GET_WEATHER: (postId: string) => base + "posts/getWeather/" + postId + "/",
	},
	CHAT: {
		GET_MESSAGES: (category_name: string) =>
			base + "chat/" + category_name + "/",
	},
	CATEGORIES: {
		BASE: base + "categories/",
	},
	COMMENTS: {
		BASE: base + "comments/",
		DELETE_OR_EDIT: (commentId: string) => base + "comments/" + commentId + "/",
	},
};
