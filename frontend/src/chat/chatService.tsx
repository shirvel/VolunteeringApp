import { endpoints } from "../api/endpoints";
import { get } from "../api/requests";

export const loadFormerMessages = async (category_name: string) => {
	// const response = await get(endpoints.CHAT.GET_MESSAGES(category_name));
	// return response.data;
	return [{ content: "hello its me", userName: "name", userId: "123" }];
};

export const getAllCategories = async () => {
	// const response = await get(endpoints.CATEGORIES.BASE);
	// return response.data;
	//TODO: Replace the mock after the api works
	return ["cooking", "driving"];
};
