import { endpoints } from "../api/endpoints";
import { get } from "../api/requests";

export type Category = {
	name: string;
	_id: string;
};

export const loadFormerMessages = async (category_name: string) => {
	const response = await get(endpoints.CHAT.GET_MESSAGES(category_name));
	return response;
};

export const getAllCategories = async () => {
	const response = await get(endpoints.CATEGORIES.BASE);
	return response;
};
