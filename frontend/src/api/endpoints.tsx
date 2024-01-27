const base = "http://127.0.0.1:3000/";

export const socketUrl = "http://localhost:3000";
export const endpoints = {
	BASE: "http://127.0.0.1:3000/",
	USER: {
		UPDATE_USER: (id: string) => base + "user/" + id + "/",
	},
	POST: {
		CREATE_POST: () => base + "posts/",
	},
	CHAT: {
		GET_MESSAGES: (category_name: string) =>
			base + "chat/" + category_name + "/",
	},
	CATEGORIES: {
		BASE: base + "categories/",
	},
};
