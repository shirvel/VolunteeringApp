const base = "http://localhost:3000/";

export const socketUrl = "http://localhost:3000";
export const endpoints = {
	BASE: "http://localhost:3000/",
	FILE: {
		UPLOAD_FILE: () => base + "file/",
	},
	USER: {
		UPDATE_USER: (id: string) => base + "user/" + id + "/",
		CREATE_USER: () => base + "auth/register/",
		CREATE_USER_GOOGLE: () =>  base + "auth/google/",
		GET_BY_NAME: (name: string) => base + "user/get_by_name/" + name + "/",
		CREATE_NEW_TOKENS: () => base + "auth/refresh/"	
	},
	POST: {
		CREATE_POST: () => base + "posts/",
		EDIT_POST: (postId: string) => base + "posts/" + postId + "/",
		DELETE_POST: (postId: string) => base + "posts/" + postId + "/",
		AddLike: (postId: string) => base + "posts/" + postId + "/like",
		AddDisLike: (postId: string) => base + "posts/" + postId + "/dislike",
		getAllPosts: () => base + "posts/",
		GET_COMMENTS: (postId: string) =>
			base + "comments/get_by_post/" + postId + "/",
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
	WEATHER: {
		GET_WEATHER: (location: string) => "https://api.openweathermap.org/data/2.5/weather?units=metric&q=" + location + `&appid=${process.env.APIWEATHERKEY}`
	}
};
