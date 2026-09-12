import PropTypes from 'prop-types';

const PersonForm = ({
  addNewName,
  handleNewName,
  handleNewPhone,
  newPerson,
}) => {
  return (
    <form onSubmit={addNewName}>
      <div>
        name: <input value={newPerson.name} onChange={handleNewName} />
      </div>
      <div>
        number: <input value={newPerson.number} onChange={handleNewPhone} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

PersonForm.propTypes = {
  addNewName: PropTypes.func.isRequired,
  handleNewName: PropTypes.func.isRequired,
  handleNewPhone: PropTypes.func.isRequired,
  newPerson: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};

export default PersonForm;
