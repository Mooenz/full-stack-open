import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types'

// Services
import getData from '../services/weather'
const Weather = ({ capital }) => {
  // States
  const [dataWeather, setDataWeather] = useState({});

  // Effect
  useEffect(() => {
    getData.getWeatherCountry(capital).then(response => {
      console.log(response);
      // const { temperature, weather_icons, wind_speed, wind_dir } =
      //   response.data.current;
      const temperature = response.main.temp;
      const weather_icons = response.weather[0].icon;
      const wind_speed = response.wind.speed;
      const wind_dir = response.wind.deg;

      setDataWeather({
        temperature,
        weather_icons,
        wind_speed,
        wind_dir,
      });
    })
  }, [capital]);


  return (
    <>
      <h2>Weather in </h2>
      <div>
        <b>Temperature</b> { dataWeather.temperature } Celcius
      </div>
      <img src={ `http://openweathermap.org/img/wn/${dataWeather.weather_icons}.png` } alt="" />
      <div>
        <b>Wind</b> { dataWeather.wind_speed } m/s
      </div>
    </>
  );
};

Weather.propTypes = {
  capital: PropTypes.string.isRequired
}

export default Weather;
