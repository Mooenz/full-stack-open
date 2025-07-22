import axios from 'axios';
const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api';

const getAll = () => {
	const URL = `${baseURL}/all`;
	const request = axios.get(URL);

	return request.then((response) => {
		return response.data;
	});
};

export default { getAll };
