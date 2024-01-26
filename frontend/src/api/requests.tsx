import axios from "axios";

const getRequestConfig = () => {
	const token = localStorage.getItem("accessToken");
	return {
		headers: {
			Authorization: "JWT " + token,
		},
	};
};

//TODO: add token to every request
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

export const post = async (endpoint: string, data: any) => {
	try {
		const response = await axios.post(endpoint, data, getRequestConfig());
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
