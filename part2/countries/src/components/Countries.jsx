// Components
import Countrie from './Countrie';
import Weather from './Weather';

const Countries = ({ countries, handle, show }) => {
  return (
    <>
      {countries.length > 1 &&
        (countries.length > 10 ? (
          <div>Too Many matches, specify another filter</div>
        ) : (
          countries.map(({ name, capital, population, languages, flags }) => (
            <div key={name.common}>
              {name.common}{' '}
              <button onClick={() => handle(name.common)}>show</button>
              {show === name.common && (
                <Countrie
                  name={name.common}
                  capital={capital}
                  populaton={population}
                  languages={languages}
                  flag={flags.png}
                  handle={handle}
                  show={show}
                />
              )}
              {show === name.common && <Weather capital={capital} />}
            </div>
          ))
        ))}
      {countries.length === 1 && (
        <Countrie
          name={countries['0'].name.common}
          capital={countries['0'].capital}
          populaton={countries['0'].population}
          languages={countries['0'].languages}
          flag={countries['0'].flags.png}
          handle={handle}
          show={show}
        />
      )}
    </>
  );
};

export default Countries;
