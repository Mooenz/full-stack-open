const Countrie = ({ name, capital, populaton, languages, flag }) => {
  return (
    <>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>population {populaton}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt={`${name} svg`} />
    </>
  );
};

export default Countrie;
