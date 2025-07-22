import { PropTypes } from 'prop-types'

const Country = ({ name, capital, area, languages, flag }) => {
  return (
    <>
      <h2>{ name }</h2>
      <div><b>Capital</b> { capital }</div>
      <div><b>Area</b> { area }</div>
      <h3>Languages</h3>
      <ul>
        { Object.values(languages).map((language) => (
          <li key={ language }>{ language }</li>
        )) }
      </ul>
      <img src={ flag } alt={ `${name} svg` } />
    </>
  );
};

Country.propTypes = {
  name: PropTypes.string.isRequired,
  capital: PropTypes.array.isRequired,
  area: PropTypes.number,
  languages: PropTypes.object.isRequired,
  flag: PropTypes.string.isRequired,
};


export default Country;
