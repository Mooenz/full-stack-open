import { useState, useEffect } from 'react';

//Components
import Search from './components/Search';
import Countries from './components/Countries';

// Services
import services from './services/countries'

const App = () => {
  //States
  const [countries, setCountries] = useState([]);
  const [newCountry, setNewCountry] = useState('');
  const [show, setShow] = useState('');

  // Handles events
  const handleInputCountry = (event) => setNewCountry(event.target.value);
  const handleButton = (countryState) => setShow(countryState);

  // Filter
  const countriesToShow =
    newCountry === ''
      ? countries
      : countries.filter(
        (country) =>
          country.name.common
            .toLocaleLowerCase()
            .indexOf(newCountry.toLocaleLowerCase()) > -1
      );

  // Effect
  useEffect(() => {
    services.getAll().then(newCountries => {
      setCountries(newCountries)
    })
  }, []);

  return (
    <>
      <Search newCountry={ newCountry } handle={ handleInputCountry } />
      <Countries
        countries={ countriesToShow }
        handle={ handleButton }
        show={ show }
      />
    </>
  );
};

export default App;
