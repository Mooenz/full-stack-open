import axios from 'axios';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = import.meta.env.VITE_APP_API_KEY;

const getWeatherCountry = (capital) => {
	const request = axios.get(`${baseURL}${capital}&appid=${apiKey}&units=metric`);

	return request
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.log(`Error bringing data: ${error}`);
		});
};

export default { getWeatherCountry };
