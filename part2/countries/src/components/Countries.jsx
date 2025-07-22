import { PropTypes } from 'prop-types'

// Components
import Country from './Country';
import Weather from './Weather';

const Countries = ({ countries, handle, show }) => {
  return (
    <>
      { countries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      ) }

      { countries.length > 1 && countries.length <= 10 &&
        countries.map(({ name, capital, area, languages, flags }) => {
          const countryName = name.common;
          const isSelected = show === countryName;

          return (
            <div key={ countryName }>
              { countryName }{ ' ' }
              { !isSelected ? (<button onClick={ () => handle(countryName) }>show</button>) : "" }
              { isSelected && (
                <Country
                  name={ countryName }
                  capital={ capital }
                  area={ area || "No area" }
                  languages={ languages }
                  flag={ flags.png }
                  handle={ handle }
                  show={ show }
                />
              ) }
            </div>
          );
        })
      }

      { countries.length === 1 && (
        <>
          <Country
            name={ countries[0].name.common }
            capital={ countries[0].capital }
            area={ countries[0].area }
            languages={ countries[0].languages }
            flag={ countries[0].flags.png }
            handle={ handle }
            show={ show }
          />

          <Weather capital={ countries[0].capital[0] } />
        </>
      ) }
    </>
  );

};

Countries.propTypes = {
  countries: PropTypes.array.isRequired,
  handle: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired
}

export default Countries;
