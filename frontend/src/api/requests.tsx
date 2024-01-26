import axios from "axios";

//TODO: add token to every request
export const get = async (endpoint: string) => {
	try {
		const response = await axios.get(endpoint);

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const patch = async (endpoint: string, data: any) => {
	try {
		const response = await axios.patch(endpoint, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const post = async (endpoint: string, data: any) => {
	try {
		const response = await axios.post(endpoint, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
