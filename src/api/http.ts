import Axios from 'axios';

const http = Axios.create({
	baseURL: '/api',
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json'
	}
});

export const setToken = (token: string) => {
	http.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
	http.defaults.headers.common.Authorization = null;
};

export default http;
