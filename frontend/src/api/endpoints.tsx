const base = "http://127.0.0.1:3000/";

export const endpoints = {
	BASE: "http://127.0.0.1:3000/",
	USER: {
		UPDATE_USER: (id: string) => base + "user/" + id + "/",
	},
};
