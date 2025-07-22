import PropTypes from 'prop-types';

const Persons = ({ personToShow, handleButton }) => {
  return (
    <div>
      { personToShow.map(({ name, number, id }) => (
        <div key={ id }>
          { name } { number }
          <button onClick={ () => handleButton(name, id) }>delete</button>
        </div>
      )) }
    </div>
  );
};

Persons.propTypes = {
  personToShow: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default Persons;
