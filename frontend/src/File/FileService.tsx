import { endpoints } from "../api/endpoints";
import { post } from "../api/requests";

export const uploadFile = async (file: File | null): Promise<string | null> => {
	return new Promise((resolve, reject) => {
		const formData = new FormData();
		if (file) {
			formData.append("file", file);
			post(endpoints.FILE.UPLOAD_FILE(), formData, {
				"Content-Type": "image/jpeg",
			})
				.then((res) => {
					console.log(res);
					resolve(res.data.url);
				})
				.catch((err) => {
					console.log(err);
					reject(err);
				});
		} else {
			resolve(null);
		}
	});
};
