import { jwtDecode } from "jwt-decode";
import { endpoints } from "./endpoints";
import axios from "axios";

const duplicateAxiosInstance = axios.create();

axios.interceptors.request.use(async (config) => {
	let accessToken = localStorage.getItem("accessToken");
	const decodedTokenExpiration = jwtDecode(accessToken as string).exp;
    const currentTime = Date.now();
	if (currentTime.valueOf() / 1000 > (decodedTokenExpiration as number)) {
        await getNewTokens();
        const newAccessToken = localStorage.getItem("accessToken");
        config.headers['Authorization'] = `JWT ${newAccessToken}`;
    }
    
    return config;
}, (error) => { 
    return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      await getNewTokens();
      const newAccessToken = localStorage.getItem("accessToken");

      // Set the new token in the header and retry the request
      originalRequest.headers['Authorization'] = `JWT ${newAccessToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  });

export const getNewTokens = async () => {
	const oldRefreshToken = localStorage.getItem("refreshToken");
	const refreshTokenHeader = { Authorization: "JWT " + oldRefreshToken }
	// const response = await get(
	// 	endpoints.USER.CREATE_NEW_TOKENS(),
	// 	refreshTokenHeader
    // );
    const response = await duplicateAxiosInstance.get(endpoints.USER.CREATE_NEW_TOKENS(), {headers: refreshTokenHeader});
	// const data = await response.data;

    const data = response.data;
    localStorage.setItem("accessToken", data.accessToken);
	localStorage.setItem("refreshToken", data.refreshToken);

   // parseLocalStorageData(data);
    
  //  return 
	// 

	console.log(JSON.stringify(data));
};


export default axios;