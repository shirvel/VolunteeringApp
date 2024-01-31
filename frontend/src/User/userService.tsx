import { get, patch, post } from "../api/requests";
import { UserDetails } from "./UserDetailsComp";
import { endpoints } from "../api/endpoints";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export type CreateUserInfo = {
	email: string;
	password?: string;
	name: string;
	imageUrl?: string | null;
	accessToken?: string;
	refreshToken?: string;
};

export const getUserById = async (id: string) => {
	const response = await get(endpoints.USER.UPDATE_USER(id));
	return response as UserDetails;
};

export const getUserByName = async (name: string) => {
	const response = await get(endpoints.USER.GET_BY_NAME(name));
	return response as UserDetails;
};

export const getConnectedUser = async () => {
	const connectedUserId = localStorage.getItem("userId");
	if (connectedUserId) {
		return await getUserById(connectedUserId);
	}
	return null;
};
export const updateUser = async (user: UserDetails) => {
	const connectedUserId = localStorage.getItem("userId");
	if (connectedUserId) {
		const response = await patch(
			endpoints.USER.UPDATE_USER(connectedUserId),
			user
		);
		const data = await response.data;
		console.log(JSON.stringify(data));
	}
};

export const createUser = async (user: CreateUserInfo) => {
	const response = await post(endpoints.USER.CREATE_USER(), user);
	const data = await response.data;
	console.log(JSON.stringify(data));
};

export const googleSignin = async (credentialResponse: CredentialResponse) => {
	console.log("Google Signin");
	const response = await post(
		endpoints.USER.CREATE_USER_GOOGLE(),
		credentialResponse
	);
	console.log(JSON.stringify(response));
	return response;
};

interface tokenDetails {
	accessToken: string;
	refreshToken: string;
}

export const parseLocalStorageData = (data: tokenDetails) => {
	localStorage.setItem("accessToken", data.accessToken);
	localStorage.setItem("refreshToken", data.refreshToken);
	const parsedToken = jwtDecode(data.accessToken);
	localStorage.setItem("userId", parsedToken._id);
	localStorage.setItem("userName", parsedToken.name);
};
