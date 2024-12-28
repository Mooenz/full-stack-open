import { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

const Weather = ({ capital }) => {
  // States
  const [dataWeather, setDataWeather] = useState({});

  // Api key
  const apiKey = process.env.REACT_APP_API_KEY;

  // Effect
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`
      )
      .then((response) => {
        const { temperature, weather_icons, wind_speed, wind_dir } =
          response.data.current;
        setDataWeather({
          temperature,
          weather_icons,
          wind_speed,
          wind_dir,
        });
      });
  }, [apiKey, capital]);

  return (
    <>
      <h3>Weather in </h3>
      <div>
        <b>temperature</b> {dataWeather.temperature} Celcius
      </div>
      <img src={dataWeather.weather_icons} alt="" />
      <div>
        <b>wind</b> {dataWeather.wind_speed} direction {dataWeather.wind_dir}
      </div>
    </>
  );
};

export default Weather;
