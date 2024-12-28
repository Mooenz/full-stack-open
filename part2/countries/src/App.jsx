import { useState, useEffect } from 'react';

// Axios
import axios from 'axios';

//Components
import Search from './components/Search';
import Countries from './components/Countries';

const App = () => {
  //States
  const [countries, setCountries] = useState([]);
  const [newCountrie, setNewCountrie] = useState('');
  const [show, setShow] = useState('');

  // Handles events
  const handleInputCountrie = (event) => setNewCountrie(event.target.value);

  const handleButton = (countrieState) => setShow(countrieState);

  // Filter
  const countruiesToShow =
    newCountrie === ''
      ? countries
      : countries.filter(
          (countrie) =>
            countrie.name.common
              .toLocaleLowerCase()
              .indexOf(newCountrie.toLocaleLowerCase()) > -1
        );



  // Effect
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <Search newCountrie={newCountrie} handle={handleInputCountrie} />
      <Countries
        countries={countruiesToShow}
        handle={handleButton}
        show={show}
      />
    </>
  );
};

export default App;
