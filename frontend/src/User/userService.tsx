import { patch, post } from "../api/requests";
import { UserDetails } from "./EditUserDetails";
import { endpoints } from "../api/endpoints";


export type CreateUserInfo = {
	email: string,
	password: string,
	name: string,
	imageUrl?: string | null
}
export const getConnectedUser = () => {
	return { id: "123245" };
};

export const updateUser = async (user: UserDetails) => {
	const connectedUser = getConnectedUser();
	const response = await patch(
		endpoints.USER.UPDATE_USER(connectedUser.id),
		user
	);
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const createUser = async (user: CreateUserInfo) => {
	const response = await post(
		endpoints.USER.CREATE_USER(),
		user
	);
	const data = await response.data;
	console.log(JSON.stringify(data));
};
