const Persons = ({ personToShow, handleButton }) => {
  return (
    <div>
      {personToShow.map(({ name, number, id }) => (
        <div key={name}>
          {name} {number}{' '}
          <button onClick={() => handleButton(name, id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
