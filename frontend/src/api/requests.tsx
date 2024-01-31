import axios from "axios";

const getRequestConfig = (headers?: any) => {
	const token = localStorage.getItem("accessToken");
	return {
		headers: {
			...headers,
			Authorization: "JWT " + token,
		},
	};
};

export const get = async (endpoint: string) => {
	try {
		const response = await axios.get(endpoint, getRequestConfig());
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const patch = async (endpoint: string, data: any) => {
	try {
		console.log(getRequestConfig());
		const response = await axios.patch(endpoint, data, getRequestConfig());
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const post = async (endpoint: string, data: any, headers?: any) => {
	try {
		const response = await axios.post(
			endpoint,
			data,
			getRequestConfig(headers)
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteRequest = async (endpoint: string) => {
	try {
		const response = await axios.delete(endpoint, getRequestConfig());
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
